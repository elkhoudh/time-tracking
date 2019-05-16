import {
  GET_TIMER_START,
  GET_TIMER_SUCCESS,
  GET_TIMER_FAILURE
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
        timersList: action.payload
      };
    case GET_TIMER_FAILURE:
      return {
        ...state,
        isLoading: false,
        response: action.payload
      };

    default:
      return state;
  }
}
