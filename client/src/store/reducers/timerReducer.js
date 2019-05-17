import { toast } from "react-toastify";

import {
  GET_TIMER_START,
  GET_TIMER_SUCCESS,
  GET_TIMER_FAILURE,
  START_TIMER_START,
  START_TIMER_SUCCESS,
  START_TIMER_FAILURE,
  STOP_TIMER_START,
  STOP_TIMER_SUCCESS,
  STOP_TIMER_FAILURE,
  DELETE_TIMER_START,
  DELETE_TIMER_SUCCESS,
  DELETE_TIMER_FAILURE
} from "../actions/timerActions";

const initialState = {
  timer: "",
  started: false,
  timersList: [],
  chartData: [],
  response: "",
  description: "",
  isLoading: false
};

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TIMER_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        timersList: action.payload.currentTimer,
        started: action.payload.currentTimer[0].started,
        chartData: action.payload.groupedCategories
      };
    case GET_TIMER_FAILURE:
      return {
        ...state,
        isLoading: false,
        response: action.payload
      };

    case START_TIMER_START:
      return {
        ...state,
        isLoading: true
      };
    case START_TIMER_SUCCESS:
      toast.success("Timer has started");
      return {
        ...state,
        isLoading: false,
        timersList: action.payload.currentTimer,
        started: action.payload.currentTimer[0].started,
        chartData: action.payload.groupedCategories
      };
    case START_TIMER_FAILURE:
      toast.error("Timer Already started");
      return {
        ...state,
        isLoading: false,
        response: action.payload
      };

    case STOP_TIMER_START:
      return {
        ...state,
        isLoading: true
      };
    case STOP_TIMER_SUCCESS:
      toast.success("Timer is stopped");
      return {
        ...state,
        isLoading: false,
        timersList: action.payload.currentTimer,
        started: action.payload.currentTimer[0].started,
        chartData: action.payload.groupedCategories
      };
    case STOP_TIMER_FAILURE:
      return {
        ...state,
        isLoading: false,
        response: action.payload
      };

    case DELETE_TIMER_START:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TIMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        timersList: action.payload.currentTimer,
        chartData: action.payload.groupedCategories
      };
    case DELETE_TIMER_FAILURE:
      return {
        ...state,
        isLoading: false,
        response: action.payload
      };

    default:
      return state;
  }
}
