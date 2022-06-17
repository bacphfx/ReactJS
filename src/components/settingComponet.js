import React, { Component } from "react";
import { Form, Label } from "reactstrap";

class Setting extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Form className="col-6 col-sm-4 col-md-3">
        <Label>Select number collum/sheet</Label>
        <select className="form-select" id="num-input">
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>6</option>
        </select>
      </Form>
    );
  }
}

export default Setting;
