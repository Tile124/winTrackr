// Add imports at the top of the file
package models
import (
	"cloud.google.com/go/firestore"
	"github.com/Tile124/winTrackr/utils"
	"github.com/google/uuid"
	
)


type User struct {
	ID        string `firestore:"id"`
	Email     string `firestore:"email"`
	Password  string `firestore:"password"`
	ProfilePic string `firestore:"profilePic"`
	Birthday  string `firestore:"birthday"`
	Location  string `firestore:"location"`
}

func NewUser(email, password string) *User {
	return &User{
		ID:       uuid.New().String(),
		Email:    email,
		Password: password,
	}
}

// Save function stores the User struct in the Firestore database
func (u *User) Save() error {
	client, err := utils.GetFirestoreClient()
	if err != nil {
		return err
	}
	defer utils.CloseFirestoreClient(client)

	// Save the user data under the "users" collection with the user's ID as the document ID
	_, err = client.Collection("users").Doc(u.ID).Set(utils.Ctx, u)
	return err
}

func (u *User) Save() error {
	client, err := utils.GetFirestoreClient()
	if err != nil {
		return err
	}
	defer utils.CloseFirestoreClient(client)

	_, err = client.Collection("users").Doc(u.ID).Set(utils.Ctx, u)
	return err
}

// Add this new function to retrieve public statistics
func GetPublicStatistics(client *firestore.Client) ([]map[string]interface{}, error) {
	stats := []map[string]interface{}{}

	iter := client.Collection("users").Select("id", "totalProfit", "numGames").Documents(utils.Ctx)
	docs, err := iter.GetAll()
	if err != nil {
		return nil, err
	}

	for _, doc := range docs {
		stats = append(stats, doc.Data())
	}

	return stats, nil
}
