package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var (
	userDb *sql.DB
)

func InitDbs() {
	database, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		log.Fatal(err)
	}
	if database == nil {
		log.Fatal("users.db nil")
	}

	userDb = database

	createDbTables()
	InsertUser("admin", "password")
}

func createDbTables() {
	createUsersTableSQL := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);
	`

	_, err := userDb.Exec(createUsersTableSQL)
	if err != nil {
		log.Fatalf("Failed to create user table: %v\n", err)
	}
}

func InsertUser(email string, password string) (int64, error) {
	statement := `
	INSERT INTO users (email, password)
	VALUES (?, ?)
	`
	stmt, err := userDb.Prepare(statement)
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	res, err := stmt.Exec(email, password)
	if err != nil {
		return 0, err
	}

	return res.LastInsertId()
}

func GetUserCredentials(userEmail string) (string, error) {
	statement := `
	SELECT * FROM users
	WHERE email=?
	`

	var (
		id       int64
		email    string
		password string
	)

	row := userDb.QueryRow(statement, userEmail)
	err := row.Scan(&id, &email, &password)
	if err != nil {
		return "", err
	}
	return password, err
}
