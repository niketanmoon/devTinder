# devTinder

## Add project configuration

- `npm init`
- choose ESM or mjs
- create `src` folder
- Add file app.js

## Create a server

- install express `npm i express`
- create apis using app.use
- Add nodemon to watch the changes
- update scripts inside package.json

## Routes

- Added get and post test calls
- use of ?, +, \*, () in the routes
- Use of regex in routes
- Reading query params `/user?user="" using req.query
- Reading dynamic parameter in url using req.params
- How to pass the req to another request

```
app.get("/user", (req, res, next)=> {
   next()
}, (req, res)=>{res.send("End")})

```

- Write auth middlewares 2 approaches
- Error handling should be done using try catch
- If you want to do it using middleware then remember that the first parameter is err and you define 4 parameters
- app.use("/", (err, req, res, next) => {
  res.send("Hello There")
  })

## Database, Schema and Models | Mongoose

- Create a config folder
- add file database.js
- install mongoose to connect to the db
- Add model schema and add user to database

## Diving into the apis

- added signup route and added dynamic data to signup and save to db
- Added middleware to parse the body in json
- Getting the feed
- Get user by email api
- Get all the users with /feed api

- API: Delete a user by id
- API: Update a user by id

## Data Sanitization and validation

- Add validation on user schema
- Add new fields to the user schema
- Add custom validation to the schema
- Add required, unique, trim, minLength, min, validate, default
- Add timestamps
- install package `validator`
- Added validator functions for email, password and photoUrl

## Encrypting Passwords and adding extra validations

- Added validations using helper function
- install bcrypt
- Create password hash using bcrypt hash
- API: /login

## JWT and Authentication

- Add package `cookie-parser`
- Add cookie parser middleware
- install package `jsonwebtoken`
- create jwt token using jwt sign
- API: /profile which verify the jwt using token from cookies
- Add user auth middleware
- Add expiry to the jwt token
- Added user auth middleware to connectionRequest API
- Mongoose Schema methods
- Added user schema methods for creating jwt token and validating password

## Routing

- Use Express router to group routing
- authRouter
- profileRouter
- connectionRequestRouter
- userRouter

- Create All the APIs
- Create API: POST /logout, PATCH /profile/edit, PATCH /profile/password

- Added API: connectionRequest
- Handled dynamic status and toUserId
- Added data sanitization and validation
- Added compound index to make the query faster
- Learnt about `$or` and `$and` query in mongoose
- Add schema.pre method so that it runs before every save method

- Create another api to accept or reject a request
- Create GET APIs for user

  - to get connections of a user
  - to get requests
  - to get feed of the user

- Added ref and populate to get the data of fromUserId instead of looping
- Added feed api with logic to show connections where the feed will not show already interested, ignored, accepted or rejected for fromUserId and toUserId
- Add pagination to feed so that it only shows first 10 elements
- Pagination:

  - /feed?page=1&limit=10 => 1-10 .skip(0) & .limit(10)
  - /feed?page=2&limit=10 => 11-20 .skip(10) & .limit(10)
  - /feed?page=3&limit=10 => 21-30 .skip(20) & .limit(10)
  - skip = (page-1) \* limit

- Two main functions to use for pagination `skip()` and `limit()` in mongodb
- install cors middleware to allow cross origin apis `npm i cors`
- Add whitelist apis
