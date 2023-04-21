# Sprint 4

Videos:

Presentation: https://youtu.be/eLDklLnyJKc
Frontend tests: https://youtu.be/QHdFGh64qi0
Sprint 4: https://youtu.be/tdOi--WdzSQ

Sprint 4 was the most productive sprint.
+ Restructured the entire project into public, private, shared, and auth modules
+ Created Homepage, Login, Registration, Toolbar, and dashboard components
+ Wrote the css,html,and ts code of each new component.
+ Setup app routing and fixed bugs related to how components were being displaued
+ Created an authentication guard and several services to help the website (e.x. alert service)
+ Wrote the backend golang server and implemented an authentication system and cookies
+ Implemented functionality in all of the components (buttons, displays, etc)
+ Used gorilla mux to create communication between the server and frontend
+ Created and implemented an sqlite database that stores userdata and scratchoff entries.
+ Made persistent account systems and implemented actual login/registration functionality
+ Created a dashboard module that was protected by authentication and only visible to logged in users
+ Made dashboard display only data that belonged to the user.
+ Created front-page readme that says how to run application
+ Created frontend and backend documentation
+ 22 new github issues
+ 13 closed github issues
+ 9 major bugs fixed

## Unit Tests

**Front-End Tests (6 new end-to-end Cypress tests):**
 - dashboard test
 - homepage test
 - login test
 - registration test
 - toolbar tests
 - and a test that simulated a user going through the website

**Back-End Unit Tests:**
 - User validation test
 - Admin user login request test
 - Malformed login request test
 - Incorrect password test
 - Fetching admin user scratch-off tests

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

