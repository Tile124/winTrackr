package utils

import (
	"context"
	"os"

	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
)

var App *firebase.App
var Ctx context.Context

func InitFirebase() error {
	Ctx = context.Background()
	credPath := os.Getenv("FIREBASE_CREDENTIALS")

	opt := option.WithCredentialsFile(credPath)
	app, err := firebase.NewApp(Ctx, nil, opt)
	if err != nil {
		return err
	}

	App = app
	return nil
}
