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
