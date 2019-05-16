import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

// ------------------------------------ Get Timers ------------------------------------

export const GET_TIMER_START = "GET_TIMER_START";
export const GET_TIMER_SUCCESS = "GET_TIMER_SUCCESS";
export const GET_TIMER_FAILURE = "GET_TIMER_FAILURE";

export const getTimers = () => dispatch => {
  dispatch({ type: GET_TIMER_START });
  axios
    .get(`${URL}/api/timer`)
    .then(res =>
      res.data.currentTimer.length
        ? dispatch({ type: GET_TIMER_SUCCESS, payload: res.data.currentTimer })
        : dispatch({
            type: GET_TIMER_SUCCESS,
            payload: {
              response: res.data.message && res.data.message,
              timersList: [],
              started: false,
              chartData: []
            }
          })
    )
    .catch(error => dispatch({ type: GET_TIMER_FAILURE, payload: error }));
};
