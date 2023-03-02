package main

import (
  "github.com/gorilla/mux"
  "net/http"
  "os"
  "log"
  "test-app/src/server/utils"
)

func main() {
  r := mux.NewRouter()

  r.HandleFunc("/hello-world", helloWorld)

  http.Handle("/", r)

  srv := &http.Server{
    Handler: r,
    Addr:    ":" + os.Getenv("PORT"),
  }

  log.Fatal(srv.ListenAndServe())
}

func helloWorld(w http.ResponseWriter, r *http.Request) {
  var data = struct {
    Title string `json:"title"`
  }{
    Title: "Golang + Angular Starter Kit",
  }

  jsonBytes, err := utils.StructToJSON(data); if err != nil {
    fmt.Print(err)
  }

  w.Header().Set("Content-Type", "application/json")
  w.Write(jsonBytes)
  return
}