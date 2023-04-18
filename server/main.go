package main

/*
* This file will contain the main function to start the server,
* set up routing, and configure the connection to Firebase.
*
 */
import (
	//"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	//"github.com/Tile124/winTrackr/auth"
	"github.com/Tile124/winTrackr/handlers"
	"github.com/Tile124/winTrackr/middleware"

	//"github.com/Tile124/winTrackr/models"
	"github.com/Tile124/winTrackr/utils"
	//"github.com/rs/cors"
)

func main() {
	// Initialize Firebase connection
	err := utils.InitFirebase()
	if err != nil {
		log.Fatalf("Error initializing Firebase: %v", err)
	}

	router := mux.NewRouter()

	// Public routes
	router.HandleFunc("/api/login", handlers.Login).Methods("POST")
	router.HandleFunc("/api/register", handlers.Register).Methods("POST")
	router.HandleFunc("/api/profile/{username}", handlers.UserProfile).Methods("GET")

	// Protected routes (use JWT middleware)
	router.HandleFunc("/api/privacy-settings", middleware.JWTAuth(handlers.GetPrivacySettings)).Methods("GET")
	router.HandleFunc("/api/privacy-settings", middleware.JWTAuth(handlers.UpdatePrivacySettings)).Methods("PUT")
	router.HandleFunc("/api/scratch-off", middleware.JWTAuth(handlers.AddScratchOff)).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", router))
}

/* Temporarily commenting this, im testing a firebase type implementation
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

	authRouter.HandleFunc("/home", auth.UserHomeHandler)

	c := cors.New(cors.Options{
		AllowOriginRequestFunc: func(r *http.Request, origin string) bool {
			return origin == "http://localhost:4200"
		},
		/*
			AllowedOrigins: []string{"http://localhost:4200"},
			AllowedHeaders: []string{"Username", "Passwordhash"},

		Debug: false, //true, // TEMP: for debugging
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
*/
