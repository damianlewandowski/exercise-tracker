import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/user";

class Logout extends Component {
  componentDidMount() {
    document.cookie =
      "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    this.props.logout();
    this.props.history.push("/login");
  }
  render() {
    return <div />;
  }
}

export default connect(
  null,
  { logout }
)(Logout);
