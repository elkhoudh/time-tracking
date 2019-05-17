import React from "react";
import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Callback from "./containers/auth-zero/Callback/Callback.js";
import Auth from "./containers/auth-zero/Auth/Auth.js";
import LandingPage from "./containers/landing-page";
import Dashboard from "./containers/dashboard";
import "./App.css";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const theme = createMuiTheme({
  palette: {
    primary: { main: "#892785" },
    secondary: { main: "#f1f1f1" },
    error: { main: "#ff1744" }
  },
  typography: { useNextVariants: true }
});

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={props => <LandingPage auth={auth} {...props} />}
            />

            <Route
              path="/callback"
              render={props => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />

            <Route
              path="/dashboard"
              render={props => <Dashboard {...props} auth={auth} />}
            />
          </Switch>
        </div>
      </MuiThemeProvider>
    </>
  );
}

export default App;
