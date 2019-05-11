import React from "react";
import DatePicker from "react-datepicker";
import "./ReduxDatePicker.css";

const ReduxDatePicker = ({ input, label, meta: { touched, error } }) => {
  const { value, ...funcs } = input;
  return (
    <div className="ReduxDatePicker form-group">
      <label htmlFor="datepicker">{label}</label>
      <div className="redux-date-picker">
        <DatePicker
          id="datepicker"
          className="form-control"
          {...funcs}
          selected={value ? new Date(value) : null}
          dateFormat="d MMMM yyyy"
        />
      </div>
      <div className="invalid-feedback">{error && error.message}</div>
    </div>
  );
};

export default ReduxDatePicker;
