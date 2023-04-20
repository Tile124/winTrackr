package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

type ScratchoffData struct {
	Name   string `json:"Name"`
	GameID string `json:"GameId"`
	Prize  string `json:"Prize"`
	Date   string `json:"Date"`
}

type Scratchoff struct {
	Id     int64  `json:"Id"`
	Name   string `json:"Name"`
	GameID string `json:"GameId"`
	Prize  int64  `json:"Prize"`
	Date   string `json:"Date"`
	UserID string `json:"UserId"`
}

type User struct {
	UserID   int64
	Email    string
	Password string
}

func (u *User) ValidatePasswordHash(hash string) bool {
	return u.Password == hash
}

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

	createScratchoffTableSQL := `
	CREATE TABLE IF NOT EXISTS scratchoffs (
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		game_id TEXT NOT NULL,
		prize INTEGER NOT NULL,
		date TEXT NOT NULL,
		user_id TEXT NOT NULL
	);
	`

	_, err = userDb.Exec(createScratchoffTableSQL)
	if err != nil {
		log.Fatalf("Failed to create scratchoff table: %v\n", err)
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

func InsertScratchoff(userID int64, name string, gameID string, prize int64, date string) (int64, error) {
	statement := `
	INSERT INTO scratchoffs (name, game_id, prize, date, user_id)
	VALUES (?, ?, ?, ?, ?)
	`

	stmt, err := userDb.Prepare(statement)
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	res, err := stmt.Exec(name, gameID, prize, date, userID)
	if err != nil {
		return 0, err
	}

	return res.LastInsertId()
}

func GetScratchoffsByUser(userID int64) ([]Scratchoff, error) {
	rows, err := userDb.Query("SELECT id, name, user_id, game_id, prize, date FROM scratchoffs WHERE user_id = ?", userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var scratchoffs []Scratchoff
	for rows.Next() {
		var s Scratchoff
		err = rows.Scan(&s.Id, &s.Name, &s.UserID, &s.GameID, &s.Prize, &s.Date)
		if err != nil {
			return nil, err
		}
		scratchoffs = append(scratchoffs, s)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return scratchoffs, nil
}

func GetUserCredentials(userEmail string) (User, error) {
	statement := `
	SELECT * FROM users
	WHERE email=?
	`

	var u User
	row := userDb.QueryRow(statement, userEmail)
	err := row.Scan(&u.UserID, &u.Email, &u.Password)
	if err != nil {
		return User{}, err
	}
	return u, err
}
