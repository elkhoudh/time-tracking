import axios from "axios";

axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = `Bearer ${localStorage.getItem(
      "id_token"
    )}`;
    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const URL = process.env.REACT_APP_BACKEND_URL;

// ------------------------------------ Get Timers ------------------------------------

export const GET_TIMER_START = "GET_TIMER_START";
export const GET_TIMER_SUCCESS = "GET_TIMER_SUCCESS";
export const GET_TIMER_FAILURE = "GET_TIMER_FAILURE";

export const getTimers = () => dispatch => {
  dispatch({ type: GET_TIMER_START });
  axios
    .get(`${URL}/api/timer`)
    .then(res => {
      res.data.currentTimer.length
        ? dispatch({ type: GET_TIMER_SUCCESS, payload: res.data })
        : dispatch({
            type: GET_TIMER_SUCCESS,
            payload: {
              response: res.data.message && res.data.message,
              timersList: [],
              started: false,
              chartData: []
            }
          });
    })
    .catch(error => dispatch({ type: GET_TIMER_FAILURE, payload: error }));
};

// ------------------------------------ Start Timers ------------------------------------

export const START_TIMER_START = "START_TIMER_START";
export const START_TIMER_SUCCESS = "START_TIMER_SUCCESS";
export const START_TIMER_FAILURE = "START_TIMER_FAILURE";

export const startTimer = description => dispatch => {
  dispatch({ type: START_TIMER_START });
  axios
    .post(`${URL}/api/timer/start`, { description })
    .then(res => {
      dispatch({ type: START_TIMER_SUCCESS, payload: res.data });
    })
    .then(() => dispatch(getTimers()))
    .catch(error => dispatch({ type: START_TIMER_FAILURE, payload: error }));
};

// ------------------------------------ stop Timers ------------------------------------

export const STOP_TIMER_START = "STOP_TIMER_START";
export const STOP_TIMER_SUCCESS = "STOP_TIMER_SUCCESS";
export const STOP_TIMER_FAILURE = "STOP_TIMER_FAILURE";

export const stopTimer = () => dispatch => {
  dispatch({ type: STOP_TIMER_START });
  axios
    .post(`${URL}/api/timer/stop`)
    .then(res => {
      dispatch({ type: STOP_TIMER_SUCCESS, payload: res.data });
    })
    .then(() => dispatch(getTimers()))
    .catch(error => dispatch({ type: STOP_TIMER_FAILURE, payload: error }));
};

// ------------------------------------ delete Timers ------------------------------------

export const DELETE_TIMER_START = "DELETE_TIMER_START";
export const DELETE_TIMER_SUCCESS = "DELETE_TIMER_SUCCESS";
export const DELETE_TIMER_FAILURE = "DELETE_TIMER_FAILURE";

export const deleteTimer = id => dispatch => {
  dispatch({ type: DELETE_TIMER_START });
  axios
    .delete(`${URL}/api/timer/${id}`)
    .then(res => {
      dispatch({ type: DELETE_TIMER_SUCCESS, payload: res.data });
    })
    .then(() => dispatch(getTimers()))
    .catch(error => dispatch({ type: DELETE_TIMER_FAILURE, payload: error }));
};

// ------------------------------------ search Timers ------------------------------------

export const SEARCH_TIMER_START = "SEARCH_TIMER_START";
export const SEARCH_TIMER_SUCCESS = "SEARCH_TIMER_SUCCESS";
export const SEARCH_TIMER_FAILURE = "SEARCH_TIMER_FAILURE";

export const handleSearch = search => dispatch => {
  if (search === "") {
    dispatch(getTimers());
  } else {
    dispatch({ type: SEARCH_TIMER_SUCCESS, payload: search });
  }
};
