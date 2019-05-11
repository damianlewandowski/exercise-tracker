import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import ReduxFormControl from "./ReduxFormControl";
import { loginUser } from "../actions/user";

class Login extends Component {
  state = {
    error: null,
    isAlertVisible: false
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  componentDidUpdate = prevProps => {
    if (this.props.form.submitSucceeded !== prevProps.form.submitSucceeded) {
      this.setState({ isAlertVisible: true });
    }
  };

  onSubmit = ({ email, password }) => {
    return axios
      .post("/api/authenticate", { email, password })
      .then(res => {
        if (res.status === 200) {
          const re = /\w+(?=@)/;
          const username = email.match(re)[0];
          this.props.loginUser(username);
          this.props.history.push("/planned-exercises");
        } else {
          throw new Error(res.error);
        }
      })
      .catch(err => {
        const { error } = err.response.data;
        console.log(error);
        throw new SubmissionError({
          email: { message: error },
          password: { message: error }
        });
      });
  };

  toggleAlert = () =>
    this.setState({ isAlertVisible: !this.state.isAlertVisible });

  render() {
    const { form } = this.props;

    return (
      <div>
        <Alert
          variant="success"
          show={this.state.isAlertVisible}
          dismissible
          onClick={this.toggleAlert}
        >
          Registration has been succesful.You may login now.
        </Alert>
        <h1 className="mb-5">Login</h1>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            component={ReduxFormControl}
            type="email"
            placeholder="Enter email"
            name="email"
            label="Email"
          />
          <Field
            component={ReduxFormControl}
            type="password"
            placeholder="Password"
            name="password"
            label="Password"
            autoComplete="on"
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

Login = connect(
  null,
  { loginUser }
)(Login);

export default reduxForm({
  form: "login"
})(Login);
