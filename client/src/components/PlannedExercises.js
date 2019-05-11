import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { fetchExercises } from "../actions/exercises";
import { reduxForm, Field } from "redux-form";
import ReduxDatePicker from "./ReduxDatePicker";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReduxFormControl from "./ReduxFormControl";
import { formValueSelector } from "redux-form";
import moment from "moment";

class PlannedExercises extends Component {
  state = {
    exercises: []
  };

  componentDidMount() {
    this.props.fetchExercises({});
  }

  onChange = name => value => {
    const { from, to, limit } = this.props;
    console.log(from, to, limit);

    this.props.fetchExercises({ from, to, limit, [name]: value });
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }

    return (
      <div>
        <Form autoComplete="off">
          <Row>
            <Col>
              <Field
                component={ReduxDatePicker}
                name="from"
                label="From"
                onChange={this.onChange("from")}
              />
            </Col>
            <Col>
              <Field
                component={ReduxDatePicker}
                name="to"
                label="To"
                onChange={this.onChange("to")}
              />
            </Col>
            <Col>
              <Field
                component={ReduxFormControl}
                name="limit"
                label="Limit"
                as="select"
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
              </Field>
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Exercise Name</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          {this.props.exercises && (
            <tbody>
              {this.props.exercises.map((e, i) => {
                const date = moment(new Date(e.date));
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.exerciseName}</td>
                    <td>{e.sets}</td>
                    <td>{e.reps}</td>
                    <td>{e.duration} min</td>
                    <td>{date.format("Do MMMM, YYYY")}</td>
                    <td>{e.description}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  exercises: state.exercises.exercises,
  isLoading: state.exercises.isLoading,
  from: state.exercises.filters.from,
  to: state.exercises.filters.to,
  limit: state.exercises.filters.limit
});

PlannedExercises = connect(
  mapStateToProps,
  { fetchExercises }
)(PlannedExercises);

export default reduxForm({ form: "plannedExercises" })(PlannedExercises);
