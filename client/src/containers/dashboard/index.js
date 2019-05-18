import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import {
  getTimers,
  startTimer,
  stopTimer,
  deleteTimer,
  handleSearch
} from "../../store/actions/timerActions";
import TimeChart from "../../components/TimeChart";
import TimeCard from "../../components/TimeCard";
import NavBar from "../../components/NavBar";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 4,
    flexGrow: 1,
    overflowX: "hidden"
  },
  button: {
    backgroundColor: "#f44336"
  },
  buttonContainer: {
    margin: 20
  },
  timer: {
    padding: 20
  }
});

class Dashboard extends React.Component {
  state = {
    description: "",
    timer: "",
    search: "",
    timersList: []
  };

  componentDidMount = () => {
    this.props.getTimers();
    this.interval = setInterval(() => {
      this.props.timersList.length &&
        this.setState({
          timer: this.calculateDifference(
            this.props.timersList[0].started_at,
            Date.now()
          )
        });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  /* Calculate the difference between 2 time stamps*/
  calculateDifference = (started_at, ended_at) => {
    if (!ended_at) {
      return;
    } else {
      const diff = ended_at - started_at;

      let milliseconds = parseInt((diff % 1000) / 100),
        seconds = parseInt((diff / 1000) % 60),
        minutes = parseInt((diff / (1000 * 60)) % 60),
        hours = parseInt((diff / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
  };

  /* Handle Input change */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* Start a new timer */
  startTimer = () => {
    if (!this.state.description) {
      toast.error("Description is required!");
    } else {
      this.setState({ search: "" });
      this.props.startTimer(this.state.description);
    }
    this.setState({ description: "" });
  };

  /* Stop already started timers */
  stopTimer = () => {
    this.props.stopTimer();
  };

  /* Delete timers */
  deleteTimer = id => {
    this.props.deleteTimer(id);
    this.setState({ search: "" });
  };

  /* Filter matching strings and update the state */
  descriptionSearch = e => {
    e.preventDefault();
    this.setState({ search: e.target.value }, () =>
      this.props.handleSearch(this.state.search)
    );
  };

  render() {
    const {
      classes,
      started,
      chartData,
      timersList,
      auth,
      isLoading
    } = this.props;

    return (
      <>
        {/* ------------------------------ Navigation Bar ------------------------------ */}
        <NavBar auth={auth} />
        {/* ------------------------------ Loader ------------------------------ */}
        {isLoading && <Loading />}
        {/* ------------------------------ Timer ------------------------------ */}
        {timersList.length && started ? (
          <Typography
            className={classes.timer}
            variant="h2"
            component="h2"
            color="primary"
          >
            {this.calculateDifference(timersList[0].started_at, Date.now())}
          </Typography>
        ) : null}
        {/* ------------------------------ Timer controls ------------------------------ */}
        <Typography variant="h5" component="h3">
          {!this.props.started && (
            <TextField
              id="standard-name"
              label="Enter task description.."
              name="description"
              className={classes.textField}
              value={this.state.description}
              onChange={this.handleChange}
              margin="normal"
            />
          )}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            disabled={started}
            onClick={this.startTimer}
          >
            Start a task
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!started}
            onClick={this.stopTimer}
          >
            End task
          </Button>
        </div>
        <hr />
        {/* ------------------------------ Search form ------------------------------ */}
        <form onSubmit={this.descriptionSearch}>
          <TextField
            id="standard-name"
            label="Search for task cards..."
            name="search"
            className={classes.textField}
            value={this.state.search}
            onChange={this.descriptionSearch}
            margin="normal"
          />
        </form>
        {/* ------------------------------ Timer Cards ------------------------------ */}
        <Grid
          container
          className={classes.root}
          spacing={16}
          style={{
            margin: 0,
            width: "100%"
          }}
        >
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={16}
            >
              {timersList.length ? (
                timersList.map(timer => (
                  <TimeCard
                    deleteTimer={this.deleteTimer}
                    key={timer.id}
                    timer={timer}
                    calculateDifference={this.calculateDifference}
                  />
                ))
              ) : (
                <Typography variant="h2" component="h2" color="primary">
                  NO TIMERS FOUND
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* ------------------------------ Charts ------------------------------ */}
        <TimeChart data={chartData} timersList={timersList} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  timersList: state.timerReducer.timersList,
  started: state.timerReducer.started,
  chartData: state.timerReducer.chartData,
  isLoading: state.timerReducer.isLoading
});

export default connect(
  mapStateToProps,
  { getTimers, startTimer, stopTimer, deleteTimer, handleSearch }
)(withStyles(styles)(Dashboard));
