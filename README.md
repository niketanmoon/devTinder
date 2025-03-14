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

-
