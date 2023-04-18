package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Tile124/winTrackr/middleware"
	"github.com/Tile124/winTrackr/models"
)

// TODO: Update to utilize Firestore functions to save and retrieve data.

type ScratchOffRequest struct {
	Name        string `json:"name"`
	ID          string `json:"id"`
	Date        string `json:"date"`
	PrizeAmount string `json:"prizeAmount"`
	SerialNum   string `json:"serialNum"`
	Location    string `json:"location"`
	Metadata    struct {
		UserID   string `json:"userId"`
		DateTime string `json:"dateTime"`
	} `json:"metadata"`
}

func AddScratchOff(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r)

	var req ScratchOffRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	scratchOff := models.NewScratchOff(req.Name, req.ID, req.Date, req.PrizeAmount, req.SerialNum, req.Location, userID)
	err = scratchOff.Save()
	if err != nil {
		http.Error(w, "Error saving scratch-off data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(scratchOff)
}
