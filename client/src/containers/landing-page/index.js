import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
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
        <Button variant="contained" color="primary" onClick={this.login}>
          Login/Register
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
