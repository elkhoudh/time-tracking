import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import TimeChart from "../../components/TimeChart";
import TimeCard from "../../components/TimeCard";
import NavBar from "../../components/NavBar";

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
    timer: "",
    started: false,
    timersList: [],
    chartData: [],
    response: "",
    description: ""
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:4000/api/timer")
      .then(res =>
        this.setState({
          response: res.data.message && res.data.message,
          timersList: res.data.currentTimer,
          started: res.data.currentTimer[0].started,
          chartData: res.data.groupedCategories
        })
      )
      .catch(error => console.log(error));
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
    axios
      .post("http://localhost:4000/api/timer/start", {
        description: this.state.description
      })
      .then(res =>
        this.setState({
          response: res.data.message && res.data.message,
          timersList: res.data.currentTimer,
          started: res.data.currentTimer[0].started,
          chartData: res.data.groupedCategories,
          description: ""
        })
      )
      .catch(error => console.log(error));
  };

  stopTimer = () => {
    axios
      .post("http://localhost:4000/api/timer/stop")
      .then(res =>
        this.setState({
          response: res.data.message && res.data.message,
          timersList: res.data.currentTimer,
          started: res.data.currentTimer[0].started,
          chartData: res.data.groupedCategories
        })
      )
      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <NavBar auth={this.props.auth} />
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
            disabled={this.state.started}
            onClick={this.startTimer}
          >
            Start a task
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={!this.state.started}
            onClick={this.stopTimer}
          >
            End task
          </Button>
        </Paper>
        <TimeChart data={this.state.chartData} />
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
              {this.state.timersList.map(timer => (
                <TimeCard
                  key={timer.id}
                  timer={timer}
                  calculateDifference={this.calculateDifference}
                />
                // <h1 key={timer.id}>
                //   {timer.description}{" "}
                //   {this.calculateDifference(timer.started_at, timer.ended_at)}
                // </h1>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Dashboard);
