package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/Tile124/winTrackr/db"
	"github.com/google/uuid"
)

type UserCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type session struct {
	user   db.User
	expiry time.Time
}

var (
	sessions map[string]session
	once     sync.Once
)

func init() {
	once.Do(initData)
}

func initData() {
	sessions = make(map[string]session)
}

func (s session) isExpired() bool {
	return s.expiry.Before(time.Now())
}

func GetUserObject(email string) (db.User, bool) {
	u, err := db.GetUserCredentials(email)
	if err != nil {
		return u, false
	}
	return u, true
}

func AddUserObject(credentials *UserCredentials) bool {
	_, err := db.InsertUser(credentials.Email, credentials.Password)
	if err != nil {
		return false
	}
	return true
}

// search user in database based on credentials
func ValidateUser(credentials *UserCredentials) (db.User, error) {
	// find user by email
	usr, exists := GetUserObject(credentials.Email)
	if !exists {
		return usr, errors.New("User with given email does not exist")
	}
	// validate password
	if !usr.ValidatePasswordHash(credentials.Password) {
		return usr, errors.New("Incorrect password")
	}
	return usr, nil
}

// register user handler
func RegisterHandler(rw http.ResponseWriter, r *http.Request) {
	// decode request body
	credentials := &UserCredentials{}
	err := json.NewDecoder(r.Body).Decode(credentials)
	if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// validate and add user
	check := AddUserObject(credentials)
	// if email already exists
	if !check {
		rw.WriteHeader(http.StatusConflict)
		rw.Write([]byte("User with the given email already exists"))
		return
	}

	rw.WriteHeader(http.StatusOK)
	rw.Write([]byte("User created"))
}

// login user handler
func LoginHandler(rw http.ResponseWriter, r *http.Request) {
	log.Printf("Login request received")
	// decode request body
	credentials := &UserCredentials{}
	err := json.NewDecoder(r.Body).Decode(credentials)
	if err != nil {
		log.Printf("verbose error info: %#v", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// validate user
	usr, err := ValidateUser(credentials)
	if err != nil {
		log.Printf("Error occured when validating user: %s", err.Error())
		rw.WriteHeader(http.StatusUnauthorized)
		rw.Write([]byte(err.Error()))
		return
	}

	sessionToken := uuid.NewString()
	expiresAt := time.Now().Add(500 * time.Second) // TODO: set time as const

	sessions[sessionToken] = session{
		user:   usr,
		expiry: expiresAt,
	}
	log.Printf("Setting cookie")
	cookie := &http.Cookie{
		Name:     "sessionToken",
		Value:    sessionToken,
		Expires:  expiresAt,
		HttpOnly: true,
		Path:     "/",
		Secure:   false,
		SameSite: http.SameSiteNoneMode,
	}

	rw.Header().Set("Access-Control-Allow-Credentials", "true")
	rw.Header().Set("Access-Control-Allow-Origin", "http://winTrackr.com")
	rw.Header().Set("Access-Control-Expose-Headers", "Set-Cookie")
	http.SetCookie(rw, cookie)
	rw.WriteHeader(http.StatusOK)
}

func UserHomeHandler(rw http.ResponseWriter, r *http.Request) {
	// We can obtain the session token from the requests cookies, which come with every request
	log.Printf("UserHomeHandler called")
	c, err := r.Cookie("sessionToken")
	if err != nil {
		if err == http.ErrNoCookie {
			log.Printf("Cookie not set")
			// If the cookie is not set, return an unauthorized status
			rw.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		log.Printf("Something went wrong")
		rw.WriteHeader(http.StatusBadRequest)
		return
	}
	sessionToken := c.Value

	// We then get the session from our session map
	userSession, exists := sessions[sessionToken]
	if !exists {
		// If the session token is not present in session map, return an unauthorized error
		rw.WriteHeader(http.StatusUnauthorized)
		return
	}
	// If the session is present, bgitut has expired, we can delete the session, and return
	// an unauthorized status
	if userSession.isExpired() {
		log.Printf("Cookie expired")
		delete(sessions, sessionToken)
		rw.WriteHeader(http.StatusUnauthorized)
		return
	}

	// If the session is valid, return the welcome message to the user
	rw.WriteHeader(http.StatusOK)
	rw.Write([]byte(fmt.Sprintf("Welcome %s!", userSession.user.Email)))
}

// get scratchoffs handler
func GetScratchoffsHandler(rw http.ResponseWriter, r *http.Request) {
	// We can obtain the session token from the requests cookies, which come with every request
	c, err := r.Cookie("sessionToken")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			rw.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		rw.WriteHeader(http.StatusBadRequest)
		return
	}
	sessionToken := c.Value

	// We then get the session from our session map
	userSession, exists := sessions[sessionToken]
	if !exists {
		// If the session token is not present in session map, return an unauthorized error
		rw.WriteHeader(http.StatusUnauthorized)
		return
	}
	// If the session is present, bgitut has expired, we can delete the session, and return
	// an unauthorized status
	if userSession.isExpired() {
		delete(sessions, sessionToken)
		rw.WriteHeader(http.StatusUnauthorized)
		return
	}

	scratchoffs, err := db.GetScratchoffsByUser(userSession.user.UserID)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// If the session is valid, return scratchoffs
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(scratchoffs)
}

func AddScratchoffHandler(rw http.ResponseWriter, r *http.Request) {
	// decode request body
	scratchoffData := &db.ScratchoffData{}
	err := json.NewDecoder(r.Body).Decode(scratchoffData)
	if err != nil {
		log.Printf("verbose error info: %#v", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}
	prize, err := strconv.ParseInt(scratchoffData.Prize, 10, 64)
	if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// We can obtain the session token from the requests cookies, which come with every request
	c, err := r.Cookie("sessionToken")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			rw.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		rw.WriteHeader(http.StatusBadRequest)
		return
	}
	sessionToken := c.Value

	// We then get the session from our session map
	userSession, exists := sessions[sessionToken]
	if !exists {
		// If the session token is not present in session map, return an unauthorized error
		rw.WriteHeader(http.StatusUnauthorized)
		return
	}
	// If the session is present, bgitut has expired, we can delete the session, and return
	// an unauthorized status
	if userSession.isExpired() {
		delete(sessions, sessionToken)
		rw.WriteHeader(http.StatusUnauthorized)
		return
	}

	_, err = db.InsertScratchoff(
		userSession.user.UserID,
		scratchoffData.Name,
		scratchoffData.GameID,
		prize,
		scratchoffData.Date)
	if err != nil {
		log.Fatal(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// If the session is valid, return the welcome message to the user
	rw.WriteHeader(http.StatusOK)
}
