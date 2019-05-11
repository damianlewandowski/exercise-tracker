import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { reduxForm, Field, SubmissionError } from "redux-form";
import axios from "axios";
import PropTypes from "prop-types";
import ReduxFormControl from "./ReduxFormControl";

class Register extends Component {
  state = {
    success: false
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  onSubmit = ({ email, password }) => {
    return axios
      .post("/api/register", { email, password })
      .then(res => {
        this.props.history.push("/login");
      })
      .catch(err => {
        const { email, password } = err.response.data.errors;
        throw new SubmissionError({
          email,
          password
        });
      });
  };

  render() {
    return (
      <div>
        <h1 className="mb-5">Register</h1>
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

export default reduxForm({
  form: "register"
})(Register);
