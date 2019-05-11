import React, { Component } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/user";

const MARGIN_BOTTOM = {
  marginBottom: "70px"
};

class Dashboard extends Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    axios
      .get("/api/checkToken")
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isLoggedIn: true
          });
        }
      })
      .catch(err => {
        this.props.logout();
        this.setState({
          isLoggedIn: false
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.setState({ isLoggedIn: !this.state.isLoggedIn });
    }
  }

  renderLeftLinks = () => {
    const { isLoggedIn } = this.state;

    const leftLinks = [
      {
        to: "/add-exercise",
        name: "Add Exercise",
        isExact: false,
        protected: true
      },
      {
        to: "/planned-exercises",
        name: "Planned Exercises",
        isExact: false,
        protected: true
      }
    ];

    return leftLinks
      .filter(l => (isLoggedIn ? l.protected : !l.protected))
      .map((l, i) => (
        <LinkContainer key={i} to={l.to} exact={l.isExact}>
          <Nav.Link>{l.name}</Nav.Link>
        </LinkContainer>
      ));
  };

  renderRightLinks = links => {};

  renderRightLinks = () => {
    const { isLoggedIn } = this.state;

    const rightLinks = [
      {
        to: "/register",
        name: "Register",
        isExact: false,
        protected: false
      },
      {
        to: "/login",
        name: "Login",
        isExact: false,
        protected: false
      },
      {
        to: "/logout",
        name: "Logout",
        isExact: false,
        protected: true
      }
    ];

    return rightLinks
      .filter(l => (isLoggedIn ? l.protected : !l.protected))
      .map((l, i) => (
        <LinkContainer key={i} to={l.to} exact={l.isExact}>
          <Nav.Link>{l.name}</Nav.Link>
        </LinkContainer>
      ));
  };

  renderUsername = () => {
    const { username } = this.props;
    if (!username) {
      return null;
    }
    return (
      <Navbar.Text className="ml-4">
        Signed in as: <a href="#login">{username}</a>
      </Navbar.Text>
    );
  };

  render() {
    return (
      <div style={MARGIN_BOTTOM}>
        <Navbar bg="dark" variant="dark">
          <LinkContainer exact to="/">
            <Navbar.Brand>Exercise Tracker</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">{this.renderLeftLinks()}</Nav>
          <Navbar.Toggle />
          <Nav>
            {this.renderRightLinks()}

            {this.renderUsername()}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form,
  username: state.user.username
});

export default connect(
  mapStateToProps,
  { logout }
)(Dashboard);
