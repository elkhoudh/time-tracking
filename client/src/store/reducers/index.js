import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import timerReducer from "./timerReducer";

export default combineReducers({
  authReducer,
  timerReducer
});
