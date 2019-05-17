import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh"
  },
  title: {
    padding: "50px 0",
    fontSize: "2.5rem"
  }
});

class LandingPage extends React.Component {
  login = () => {
    this.props.auth.login();
  };
  logout = () => {
    this.props.auth.logout();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography
          variant="headline"
          className={classes.title}
          component="h1"
          color="primary"
        >
          A simple time tracker to help you keep track of tasks you have done
          through out the day
        </Typography>
        <Button variant="contained" color="primary" onClick={this.login}>
          Login/Register
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
