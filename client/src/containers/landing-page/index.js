import React from "react";

class LandingPage extends React.Component {
  login = () => {
    this.props.auth.login();
  };
  logout = () => {
    this.props.auth.logout();
  };

  render() {
    return <button onClick={this.login}>Login/Register</button>;
  }
}

export default LandingPage;
