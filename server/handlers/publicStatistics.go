/*
* This file contains the handler for the public statistics endpoint.
* @Tile124
* Ryan Rodriguez
* Last modified: 04/17/2023
 */
package handlers

import (
	"encoding/json"
	"net/http"

	"models"
	"utils"
)

func GetPublicStatistics(w http.ResponseWriter, r *http.Request) {
	client, err := utils.GetFirestoreClient()
	if err != nil {
		http.Error(w, "Error initializing Firestore client", http.StatusInternalServerError)
		return
	}
	defer utils.CloseFirestoreClient(client)

	// Retrieve public statistics data from the Firestore database
	stats, err := models.GetPublicStatistics(client)
	if err != nil {
		http.Error(w, "Error retrieving public statistics", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}
