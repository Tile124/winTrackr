package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
)

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
	userList []user
	sessions map[string]session
	once     sync.Once
)

func init() {
	once.Do(initUsers) // temp impersistent database
}

func initUsers() {
	userList = make([]user, 0)
	userList = append(userList, user{
		email:    "admin",
		password: "password",
	})
}

func (s session) isExpired() bool {
	return s.expiry.Before(time.Now())
}

func GetUserObject(email string) (user, bool) {
	for _, user := range userList {
		if user.email == email {
			return user, true
		}
	}
	return user{}, false
}

func (u *user) ValidatePasswordHash(hash string) bool {
	return u.password == hash
}

func AddUserObject(credentials *userCredentials) bool {
	u := user{
		email:    credentials.Email,
		password: credentials.Password,
	}
	for _, t := range userList {
		if t.email == credentials.Email {
			return false
		}
	}
	userList = append(userList, u)
	return true
}

func GenerateToken(header string, payload map[string]string, secret string) (string, error) {
	// create a new hash of type sha256. We pass the secret key to it
	h := hmac.New(sha256.New, []byte(secret))
	header64 := base64.StdEncoding.EncodeToString([]byte(header))
	// We then Marshal the payload which is a map. This converts it to a string of JSON.
	payloadstr, err := json.Marshal(payload)
	if err != nil {
		fmt.Println("Error generating Token")
		return string(payloadstr), err
	}
	payload64 := base64.StdEncoding.EncodeToString(payloadstr)

	// Now add the encoded string.
	message := header64 + "." + payload64

	// We have the unsigned message ready.
	unsignedStr := header + string(payloadstr)

	// We write this to the SHA256 to hash it.
	h.Write([]byte(unsignedStr))
	signature := base64.StdEncoding.EncodeToString(h.Sum(nil))

	//Finally we have the token
	tokenStr := message + "." + signature
	return tokenStr, nil
}

func ValidateToken(token string, secret string) (bool, error) {
	// JWT has 3 parts separated by '.'
	splitToken := strings.Split(token, ".")
	// if length is not 3, we know that the token is corrupt
	if len(splitToken) != 3 {
		return false, nil
	}

	// decode the header and payload back to strings
	header, err := base64.StdEncoding.DecodeString(splitToken[0])
	if err != nil {
		return false, err
	}
	payload, err := base64.StdEncoding.DecodeString(splitToken[1])
	if err != nil {
		return false, err
	}
	//again create the signature
	unsignedStr := string(header) + string(payload)
	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(unsignedStr))

	signature := base64.StdEncoding.EncodeToString(h.Sum(nil))
	fmt.Println(signature)

	// if both the signature don’t match, this means token is wrong
	if signature != splitToken[2] {
		return false, nil
	}
	// This means the token matches
	return true, nil
}

// we need this function to be private
func getSignedToken() (string, error) {
	// we make a JWT Token here with signing method of ES256 and claims.
	// claims are attributes.
	// aud - audience
	// iss - issuer
	// exp - expiration of the Token
	claimsMap := map[string]string{
		"aud": "frontend.knowsearch.ml",
		"iss": "knowsearch.ml",
		"exp": fmt.Sprint(time.Now().Add(time.Minute * 1).Unix()),
	}
	// here we provide the shared secret. It should be very complex.
	// Also, it should be passed as a System Environment variable

	secret := "Secure_Random_String"
	header := "HS256"
	tokenString, err := GenerateToken(header, claimsMap, secret)
	if err != nil {
		return tokenString, err
	}
	return tokenString, nil
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

	/*
		// extra error handling should be done at server side to prevent malicious attacks
		if _, ok := r.Header["Username"]; !ok {
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write([]byte("Username Missing"))
			return
		}
		if _, ok := r.Header["Passwordhash"]; !ok {
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write([]byte("Passwordhash Missing"))
			return
		}

		// validate and then add the user
		check := AddUserObject(r.Header["Username"][0], r.Header["Passwordhash"][0])
		// if false means username already exists
		if !check {
			rw.WriteHeader(http.StatusConflict)
			rw.Write([]byte("Username already exists"))
			return
		}
		rw.WriteHeader(http.StatusOK)
		rw.Write([]byte("User Created"))
	*/
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

	/*
		sessionToken := uuid.NewString()
		expiresAt := time.Now().Add(120 * time.Second) // TODO: set time as const

		sessions[sessionToken] = session{
			email:  credentials.Email,
			expiry: expiresAt,
		}

		http.SetCookie(rw, &http.Cookie{
			Name:    "session_token",
			Value:   sessionToken,
			Expires: expiresAt,
		})
	*/

	rw.WriteHeader(http.StatusOK)
	//rw.Write([]byte(tokenString)) // TODO

	/*
		// validate the request first.
		if _, ok := r.Header["Username"]; !ok {
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write([]byte("Username Missing"))
			return
		}
		if _, ok := r.Header["Passwordhash"]; !ok {
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write([]byte("Passwordhash Missing"))
			return
		}
		// let’s see if the user exists
		valid, err := validateUser(r.Header["Username"][0], r.Header["Passwordhash"][0])
		if err != nil {
			// this means either the user does not exist
			rw.WriteHeader(http.StatusUnauthorized)
			rw.Write([]byte("User Does not Exist"))
			return
		}

		if !valid {
			// this means the password is wrong
			rw.WriteHeader(http.StatusUnauthorized)
			rw.Write([]byte("Incorrect Password"))
			return
		}
		tokenString, err := getSignedToken()
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			rw.Write([]byte("Internal Server Error"))
			return
		}

		rw.WriteHeader(http.StatusOK)
		rw.Write([]byte(tokenString))
	*/
}

// We want all our routes for REST to be authenticated. So, we validate the token
func tokenValidationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		// check if token is present
		if _, ok := r.Header["Token"]; !ok {
			rw.WriteHeader(http.StatusUnauthorized)
			rw.Write([]byte("Token Missing"))
			return
		}
		token := r.Header["Token"][0]
		check, err := ValidateToken(token, "Secure_Random_String")

		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			rw.Write([]byte("Token Validation Failed"))
			return
		}
		if !check {
			rw.WriteHeader(http.StatusUnauthorized)
			rw.Write([]byte("Token Invalid"))
			return
		}
		rw.WriteHeader(http.StatusOK)
		rw.Write([]byte("Authorized Token"))

	})
}
