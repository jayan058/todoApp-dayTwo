
# Docker backend

```bash
docker pull jayanghimire/todo-backend-day2:latest
docker run -p 8000:8000 jayanghimire/todo-backend-day2:latest
```


## API Routes

- POST :http://localhost:8000/user for creating a new user. Send name email and password.
- POST :http://localhost:8000/login for logging in. Send email and password and you will receive accessToken and refreshToken 
- GET :http://localhost:8000/user/:id for getting user by id. Send the id of the user you want to obtain and also the access token you received while logging in.
- POST :http://localhost:8000/login/token to obtain a new access token. Send the  refresh token you received while logging in.
