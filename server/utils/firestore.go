package utils

import (
	"cloud.google.com/go/firestore"
)

func GetFirestoreClient() (*firestore.Client, error) {
	return App.Firestore(Ctx)
}

func CloseFirestoreClient(client *firestore.Client) {
	_ = client.Close()
}
