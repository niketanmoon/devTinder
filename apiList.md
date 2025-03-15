# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:toUserId
- POST /request/review/:status/:requestId

## User Router

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platform

- Status: ignore, interested, accepted, rejected
