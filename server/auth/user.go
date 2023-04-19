package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/Tile124/winTrackr/db"
	"github.com/google/uuid"
)

type scratchoff struct {
	gameName  string
	gameId    string
	date      string
	winAmount int
}

type user struct {
	email    string
	password string
}

type userCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type session struct {
	email  string
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

func GetUserObject(email string) (user, bool) {
	var u user
	password, err := db.GetUserCredentials(email)

	if err != nil {
		return u, false
	}
	u.email = email
	u.password = password
	return u, true
}

func (u *user) ValidatePasswordHash(hash string) bool {
	return u.password == hash
}

func AddUserObject(credentials *userCredentials) bool {
	_, err := db.InsertUser(credentials.Email, credentials.Password)
	if err != nil {
		return false
	}
	return true
}

// search user in database based on credentials
func validateUser(credentials *userCredentials) (bool, error) {
	// find user by email
	usr, exists := GetUserObject(credentials.Email)
	if !exists {
		return false, errors.New("user does not exist")
	}
	// validate password
	passwordCheck := usr.ValidatePasswordHash(credentials.Password)
	return passwordCheck, nil
}

// register user handler
func RegisterHandler(rw http.ResponseWriter, r *http.Request) {
	// decode request body
	credentials := &userCredentials{}
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
		rw.Write([]byte("Account with the given email already exists")) // TODO
		return
	}

	rw.WriteHeader(http.StatusOK)
	rw.Write([]byte("User Created")) // TODO
}

// login user handler
func LoginHandler(rw http.ResponseWriter, r *http.Request) {
	// decode request body
	credentials := &userCredentials{}
	err := json.NewDecoder(r.Body).Decode(credentials)
	if err != nil {
		log.Printf("verbose error info: %#v", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// validate user
	valid, err := validateUser(credentials)
	// if user does not exist
	if err != nil {
		rw.WriteHeader(http.StatusUnauthorized)
		rw.Write([]byte("User Does not Exist")) // TODO
		return
	}
	// if password is incorrect
	if !valid {
		rw.WriteHeader(http.StatusUnauthorized)
		rw.Write([]byte("Incorrect Password")) // TODO
		return
	}

	sessionToken := uuid.NewString()
	expiresAt := time.Now().Add(120 * time.Second) // TODO: set time as const

	sessions[sessionToken] = session{
		email:  credentials.Email,
		expiry: expiresAt,
	}

	http.SetCookie(rw, &http.Cookie{
		Name:     "sessionToken",
		Value:    sessionToken,
		Expires:  expiresAt,
		HttpOnly: false,
		Path:     "/",
	})

	rw.WriteHeader(http.StatusOK)
}

func UserHomeHandler(rw http.ResponseWriter, r *http.Request) {
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

	// If the session is valid, return the welcome message to the user
	rw.WriteHeader(http.StatusOK)
	rw.Write([]byte(fmt.Sprintf("Welcome %s!", userSession.email)))
}
