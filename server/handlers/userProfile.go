package handlers

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/Tile124/winTrackr/models"
)

func UserProfile(w http.ResponseWriter, r *http.Request) {
	username := mux.Vars(r)["username"]

	// Fetch user profile from Firebase
	profile, err := models.GetPublicUserProfile(username)
	if err != nil {
		http.Error(w, "Error fetching user profile", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}
