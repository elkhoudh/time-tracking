# 🔥 Time Tracking App 🔥

### Live Frontend 🌐 https://sharkdreams.netlify.com/

### Live Backend 🌐 https://shrkdreams.herokuapp.com/

#### A simple app to help you manage your time by tracking your tasks throughout the day.

### Features

- Login using Auth0
- Start and stop timers for each task
- Delete unwanted tasks
- View an aggregation of your time on a chart.
- 100% responsive.

## Getting Started

- Install [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/) to handle all your dependencies
- Clone the project down to your local machine and navigate to your local clone where your package.json file is located
- Type _yarn_ or _npm install_ to begin bringing down all necessary packages to replicate the server locally
- cd into the client/ folder, Type _yarn_ or _npm install_ to begin bringing down all necessary packages to replicate the client locally
- Upon successful completion of dependency introduction, you can type _yarn start_ or _npm start_ to spin up a local instance of the time tracker front end

  ### Client Environmental Variables

  ```
  REACT_APP_AUTH0_DOMAIN=<auth0 domain>
  REACT_APP_AUTH0_CLIENT_ID=<auth0 client id>
  REACT_APP_AUTH0_CALLBACK_URL=<auth0 callback URL>
  REACT_APP_BACKEND_URL=<server URL>
  ```

  ### Server Environmental Variables

  ```
  DATABASE_URL=<postgresql database URI>
  ```

### Built With :heart: using:

- [auth0-js](https://www.npmjs.com/package/auth0-js)
- [axios](https://www.npmjs.com/package/axios)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [moment](https://www.npmjs.com/package/moment)
- [react](https://www.npmjs.com/package/react)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- [recharts](https://www.npmjs.com/package/recharts)
- [redux](https://www.npmjs.com/package/redux)
- [redux-thunk](https://www.npmjs.com/package/redux-thunk)

### Summary Table of API Endpoints

| Type   | Endpoints          | Description                                          |
| ------ | ------------------ | ---------------------------------------------------- |
| POST   | /api/auth/register | Register User using Auth0                            |
| POST   | /api/timer/start   | Takes a description of the timer in body (Private)   |
| POST   | /api/timer/start   | Takes nothing, stops current running timer (Private) |
| GET    | /api/timer/        | Gets all timers for logged in user (Private)         |
| DELETE | /api/timer/:id     | Delete a timer (Private)                             |

### Author

- [Hamza Elkhoudiri](https://github.com/elkhoudh)
