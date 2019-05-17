import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import background from "../../assets/background.png";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url('${background}')`,
    backgroundSize: "cover"
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
        <Button variant="contained" color="secondary" onClick={this.login}>
          Login/Register
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
