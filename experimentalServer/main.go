package main

import (
	"log"
	"net/http"

	"github.com/Tile124/winTrackr/experimentalServer/handler"

	"github.com/gorilla/mux"
	//"your_project_name/middleware"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/scratchoff", handler.HandleScratchoff).Methods("POST")
	router.HandleFunc("/api/statistics", handler.HandleStatistics).Methods("GET")

	router.Use(middleware.TokenAuthMiddleware)

	log.Fatal(http.ListenAndServe(":8080", router))
}
