package handlers

import (
	"bytes"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/Tile124/winTrackr/auth"
	"github.com/Tile124/winTrackr/db"
)

// seedTestUser inserts a test user with a known password for test use.
func seedTestUser(email, password string) {
	_, err := db.InsertUser(email, password)
	if err != nil {
		log.Fatalf("failed to seed test user %s: %v", email, err)
	}
}

// TestMain ensures the DB is initialized and cleaned up.
func TestMain(m *testing.M) {
	// Remove any leftover test DB from a previous run.
	os.Remove("./users.db")
	db.InitDbs()
	code := m.Run()
	os.Remove("./users.db")
	os.Exit(code)
}

// Test validation of a user's credentials
func TestValidateUser(t *testing.T) {
	seedTestUser("testuser", "secret123")
	usr, err := auth.ValidateUser(&auth.UserCredentials{
		Email:    "testuser",
		Password: "secret123",
	})

	if err != nil {
		t.Errorf("error in validating user: %v", err)
	}
	if usr.Email != "testuser" {
		t.Errorf("got wrong user: got %q want %q", usr.Email, "testuser")
	}
}

// Test successful login
func TestLoginSuccess(t *testing.T) {
	seedTestUser("logintest", "mypassword")
	body := []byte(`{"Email": "logintest", "Password": "mypassword"}`)
	req, err := http.NewRequest("POST", "/auth/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(auth.LoginHandler)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

// Test malformed login request
func TestLoginBadRequest(t *testing.T) {
	body := []byte(`{: "admin": "Password"}`)
	req, err := http.NewRequest("POST", "/auth/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(auth.LoginHandler)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
}

// Test incorrect password login
func TestLoginIncorrectPassword(t *testing.T) {
	seedTestUser("wrongpwduser", "correctpwd")
	body := []byte(`{"Email": "wrongpwduser", "Password": "wrongpwd"}`)
	req, err := http.NewRequest("POST", "/auth/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(auth.LoginHandler)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusUnauthorized {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusUnauthorized)
	}
}

// Test login with non-existent user
func TestLoginNonExistentUser(t *testing.T) {
	body := []byte(`{"Email": "nobody", "Password": "anything"}`)
	req, err := http.NewRequest("POST", "/auth/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(auth.LoginHandler)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusUnauthorized {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusUnauthorized)
	}
}

// Test fetching user scratchoffs after login
func TestGetUserScratchoffs(t *testing.T) {
	seedTestUser("scratchuser", "scratchpass")
	body := []byte(`{"Email": "scratchuser", "Password": "scratchpass"}`)
	req, err := http.NewRequest("POST", "/auth/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(auth.LoginHandler)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("login handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	req, err = http.NewRequest("GET", "/api/get-scratchoffs", nil)
	if err != nil {
		t.Fatal(err)
	}
}
