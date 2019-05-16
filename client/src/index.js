import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, withRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import history from "./containers/auth-zero/history";
import store from "./store/store";
import Toasts from "./components/Toasts.js";

const AppWithRouter = withRouter(App);

const app = (
  <Provider store={store}>
    <Router history={history}>
      <AppWithRouter />
    </Router>
    <Toasts />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
