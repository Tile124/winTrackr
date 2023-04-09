package main

import (
	"fmt"
	"net/http"

	"github.com/Tile124/winTrackr/auth"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	mainRouter := mux.NewRouter()

	//testRouter := mainRouter.PathPrefix("/test").Subrouter()
	//testRouter.HandleFunc("/helloworld", HelloworldHandler)

	authRouter := mainRouter.PathPrefix("/auth").Subrouter()
	authRouter.HandleFunc("/register", auth.RegisterHandler)

	// The Login will send the JWT back as we are making microservices.
	// The JWT token will make sure that other services are protected.
	// So, ultimately, we would need a middleware
	authRouter.HandleFunc("/login", auth.LoginHandler)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4200"},
		AllowedHeaders: []string{"Username", "Passwordhash"},
		Debug:          true, // TEMP: for debugging
	})
	handler := c.Handler(mainRouter)

	// Add the middleware to different subrouter
	// HTTP server
	// Add time outs
	server := &http.Server{
		Addr:    ":3000", //"127.0.0.1:9090",
		Handler: handler,
	}
	err := server.ListenAndServe()
	if err != nil {
		fmt.Println("Error Booting the Server")
	}
}

/*
func HelloworldHandler(w http.ResponseWriter, r *http.Request) {
	var data = struct {
		Message string `json:"message"`
	}{
		Message: "Golang + Angular Starter Kit",
	}

	jsonBytes, err := util.StructToJSON(data)
	if err != nil {
		fmt.Print(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)
	return
}
*/
