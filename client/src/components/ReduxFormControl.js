import React from "react";
import Form from "react-bootstrap/Form";

const ReduxFormControl = ({ input, meta, label, ...props }) => {
  const { error = {} } = meta;

  return (
    <Form.Group controlId={`formBasic${label}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} {...input} isInvalid={!!error.message} />
      <Form.Control.Feedback type="invalid">
        {error.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ReduxFormControl;
