package main

import (
	"fmt"
	"net/http"

	"github.com/Tile124/winTrackr/auth"
	"github.com/Tile124/winTrackr/db"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/cors"
)

func main() {

	db.InitDbs()

	mainRouter := mux.NewRouter()

	// auth router setup
	authRouter := mainRouter.PathPrefix("/auth").Subrouter()
	authRouter.HandleFunc("/register", auth.RegisterHandler)
	authRouter.HandleFunc("/login", auth.LoginHandler)
	authRouter.HandleFunc("/home", auth.UserHomeHandler)

	// api router setup
	apiRouter := mainRouter.PathPrefix("/api").Subrouter()
	apiRouter.HandleFunc("/get-scratchoffs", auth.GetScratchoffsHandler)
	apiRouter.HandleFunc("/add-scratchoff", auth.AddScratchoffHandler)

	// cors config
	c := cors.New(cors.Options{
		AllowOriginRequestFunc: func(r *http.Request, origin string) bool {
			return origin == "http://localhost:4200"
		},
		AllowCredentials: true,

		//AllowedOrigins: []string{"http://localhost:4200"},
		//AllowedHeaders: []string{"Username", "Passwordhash"},

		Debug: false, //true, // TEMP: for debugging
	})
	handler := c.Handler(mainRouter)

	server := &http.Server{
		Addr:    ":3000", //"127.0.0.1:9090",
		Handler: handler,
	}

	err := server.ListenAndServe()
	if err != nil {
		fmt.Println("Error Booting the Server")
	}

}
