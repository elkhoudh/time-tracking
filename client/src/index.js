import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, withRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import history from "./containers/auth-zero/history";
import store from "./store/store";

const AppWithRouter = withRouter(App);

const app = (
  <Provider store={store}>
    <Router history={history}>
      <AppWithRouter />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
