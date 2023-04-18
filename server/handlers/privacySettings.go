package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Tile124/winTrackr/middleware"
	"github.com/Tile124/winTrackr/models"
)

// TODO: Update to utilize Firestore functions to save and retrieve data.


func GetPrivacySettings(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r)

	// Retrieve privacy settings from Firebase
	settings, err := models.GetPrivacySettings(userID)
	if err != nil {
		http.Error(w, "Error fetching privacy settings", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(settings)
}

func UpdatePrivacySettings(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r)

	var settings models.PrivacySettings
	err := json.NewDecoder(r.Body).Decode(&settings)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Update privacy settings in Firebase
	err = models.UpdatePrivacySettings(userID, &settings)
	if err != nil {
		http.Error(w, "Error updating privacy settings", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Privacy settings updated successfully"})
}
