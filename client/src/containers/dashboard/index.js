import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import {
  getTimers,
  startTimer,
  stopTimer,
  deleteTimer
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
  }
});

class Dashboard extends React.Component {
  state = {
    description: ""
  };

  componentDidMount = () => {
    this.props.getTimers();
  };

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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  startTimer = () => {
    if (!this.state.description) {
      toast.error("Description is required!");
    } else {
      this.props.startTimer(this.state.description);
    }
    this.setState({ description: "" });
  };

  stopTimer = () => {
    this.props.stopTimer();
  };

  deleteTimer = id => {
    this.props.deleteTimer(id);
  };

  render() {
    const { classes, started, chartData, timersList, auth } = this.props;
    return (
      <>
        <NavBar auth={auth} />
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            {!this.state.started && (
              <TextField
                id="standard-name"
                label="Task Description"
                name="description"
                className={classes.textField}
                value={this.state.description}
                onChange={this.handleChange}
                margin="normal"
              />
            )}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={started}
            onClick={this.startTimer}
          >
            Start a task
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={!started}
            onClick={this.stopTimer}
          >
            End task
          </Button>
        </Paper>
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
              {timersList.length &&
                timersList.map(timer => (
                  <TimeCard
                    deleteTimer={this.deleteTimer}
                    key={timer.id}
                    timer={timer}
                    calculateDifference={this.calculateDifference}
                  />
                ))}
            </Grid>
          </Grid>
        </Grid>
        <TimeChart data={chartData} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  timersList: state.timerReducer.timersList,
  started: state.timerReducer.started,
  chartData: state.timerReducer.chartData
});

export default connect(
  mapStateToProps,
  { getTimers, startTimer, stopTimer, deleteTimer }
)(withStyles(styles)(Dashboard));
