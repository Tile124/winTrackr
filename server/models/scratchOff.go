package models

import (
	"time"
	"utils"
)

type ScratchOff struct {
	ID          string `firestore:"id"`
	Name        string `firestore:"name"`
	Date        string `firestore:"date"`
	PrizeAmount string `firestore:"prizeAmount"`
	SerialNum   string `firestore:"serialNum"`
	Location    string `firestore:"location"`
	UserID      string `firestore:"userId"`
	DateTime    string `firestore:"dateTime"`
	Metadata    struct {
		UserID   string `json:"userId"`
		DateTime string `json:"dateTime"`
	} `json:"metadata"`
}

// NewScratchOff creates a new scratch-off instance with the provided data
func NewScratchOff(name, id, date, prizeAmount, serialNum, location, userId string) *ScratchOff {
	return &ScratchOff{
		ID:          id,
		Name:        name,
		Date:        date,
		PrizeAmount: prizeAmount,
		SerialNum:   serialNum,
		Location:    location,
		UserID:      userId,
		DateTime:    time.Now().Format(time.RFC3339),
		//Metadata: struct {uuid , // TODO: Fix metadata entry
	}
}

// Save function stores the ScratchOff struct in the Firestore database
func (s *ScratchOff) Save() error {
	client, err := utils.GetFirestoreClient()
	if err != nil {
		return err
	}
	defer utils.CloseFirestoreClient(client)

	// Save the scratch-off data under the "scratchoffs" collection with the scratch-off's ID as the document ID
	_, err = client.Collection("scratchoffs").Doc(s.ID).Set(utils.Ctx, s)
	return err
}
