# Backend API Documentation

**Note:** The client and server are currently set up to run on http://localhost:4200.

## Authentication

**Login Request:** For logging in a user given an email and a password.
*Usage:* Post request to __/auth/login__ with a JSON user struct consisting of an **Email** string and a **Password** string in order to set login cookies. Credentials
must be set on the request. A *BadRequest* error is returned if the user struct JSON is malformed. An *Unauthorized* error is returned if the user does not exist or if
the password is incorrect and details of the error are returned in the response as plain text.

**Register Request:** For registering a user given an email and a password.
*Usage:* Post request to __/auth/register__ with a JSON user struct consisting of an **Email** string and a **Password** string in order to register user into the
backend database. Credentials must be set on the request. A *BadRequest* error is returned if the user struct JSON is malformed. A *Conflict* error is returned if the
user does not exist.

**User Home Request:** For checking with server if user is logged in.
*Usage:* Post request to __/auth/home__. A *BadRequest* error is returned if the user session cookie exists but is malformed. An *Unauthorized* error is returned if the
user session cookie does not exist or is expired.


## Data

**User Home Request:** For receiving a user's scratch-offs
*Usage:* Post request to __/api/get-scratchoffs__. A *BadRequest* error is returned if the user session cookie exists but is malformed. An *Unauthorized* error is
returned if the user session cookie does not exist or is expired. An *InternalServerError* error is returned if there is an error with the database. A JSON is returned
with a list of the user's scratch-offs in the following form.
```
Scratchoff: {
  Id: string
  Name: string
  UserId: string
  GameID: string
  Prize: int64
  Date: string
}
```

**User Home Request:** For a user inserting a scratch-off to database.
*Usage:* Post request to __/api/insert-scratchoff__ with the following form.
```
Scratchoff: {
  Name: string
  GameID: string
  Prize: int64
  Date: string
}
```
A *BadRequest* error is returned if the user session cookie exists but is malformed. An *Unauthorized* error is
returned if the user session cookie does not exist or is expired. An *InternalServerError* error is returned if there is an error with the database.
