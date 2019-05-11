import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { reduxForm, Field, SubmissionError, reset } from "redux-form";
import axios from "axios";
import ReduxFormControl from "./ReduxFormControl";
import ReduxDatePicker from "./ReduxDatePicker";

const ALERT_TOP_STYLES = {
  position: "fixed",
  top: "60px",
  left: "2%",
  width: "96%"
};

class AddExercise extends Component {
  state = {
    success: false
  };

  onSubmit = ({ exerciseName, sets, reps, duration, date, description }) => {
    return axios
      .post("/api/exercises", {
        exerciseName,
        sets,
        reps,
        duration,
        date,
        description
      })
      .then(res => {
        if (res.status === 200) {
          this.props.dispatch(reset("addExercise"));
          this.setState({ success: true });
        } else {
          throw new Error(res.error);
        }
      })
      .catch(err => {
        console.dir(err);
        throw new SubmissionError({
          ...err.response.data.errors
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div style={ALERT_TOP_STYLES}>
          <Alert
            variant="success"
            show={this.state.success}
            dismissible
            onClose={() => this.setState({ success: false })}
          >
            Exercise has been succesfully added.
          </Alert>
        </div>
        <h1>Add Exercise</h1>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            component={ReduxFormControl}
            type="text"
            placeholder="E.g. deadlift"
            name="exerciseName"
            label="Exercise Name"
          />
          <Field
            component={ReduxFormControl}
            type="number"
            placeholder="3"
            name="sets"
            label="Sets"
          />
          <Field
            component={ReduxFormControl}
            type="number"
            placeholder="8"
            name="reps"
            label="Reps"
          />
          <Field
            component={ReduxFormControl}
            type="number"
            placeholder="10"
            name="duration"
            label="Duration (whole exercise)"
          />
          <Field
            component={ReduxDatePicker}
            type="date"
            placeholder="10"
            name="date"
            label="Date"
          />
          <Field
            component={ReduxFormControl}
            as="textarea"
            placeholder="This is optional"
            name="description"
            label="Description"
          />

          <Button variant="primary" type="submit" size="lg">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: "addExercise"
})(AddExercise);
