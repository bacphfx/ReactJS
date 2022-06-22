import React, { Component } from "react";
import { Card, CardHeader, CardText } from "reactstrap";
import { DEPARTMENTS } from "../shared/staffs";

class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: DEPARTMENTS,
    };
  }
  render() {
    const departmentsDetail = this.state.departments.map((department) => {
      return (
        <Card key={department.id} className="col-12 col-sm-6 col-md-4 mt-3">
          <CardHeader>
            <b>{department.name}</b>
          </CardHeader>
          <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
        </Card>
      );
    });
    return (
      <div className="container mb-5">
        <div className="row">{departmentsDetail}</div>
      </div>
    );
  }
}

export default Departments;
