package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Tile124/winTrackr/auth"
	"github.com/Tile124/winTrackr/db"
)

// Test validation of admin user credentials
func TestValidateUser(t *testing.T) {
	db.InitDbs()
	usr, err := auth.ValidateUser(&auth.UserCredentials{
		Email:    "admin",
		Password: "password",
	})

	if err != nil {
		t.Errorf("error in validating admin user")
	}
	if usr.Email != "admin" {
		t.Errorf("got wrong user")
	}
}

// Test login of admin user
func TestAdminLogin(t *testing.T) {
	db.InitDbs()
	body := []byte(`{"Email": "admin", "Password": "password"}`)
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
	db.InitDbs()
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
	db.InitDbs()
	body := []byte(`{"Email": "admin", "Password": "passwor"}`)
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

// Test fetching admin user scratchoffs
func TestGetAdminScratchoffs(t *testing.T) {
	db.InitDbs()
	body := []byte(`{"Email": "admin", "Password": "password"}`)
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

	req, err = http.NewRequest("GET", "/api/get-scratchoffs", nil)
	if err != nil {
		t.Fatal(err)
	}
}
