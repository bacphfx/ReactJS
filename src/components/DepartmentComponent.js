import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

import { Link } from "react-router-dom";

class Departments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const departmentsDetail = this.props.departments.departments.map(
      (department) => {
        return (
          <Card key={department.id} className="col-12 col-sm-6 col-md-4 mt-3">
            <CardHeader>
              <b>{department.name}</b>
            </CardHeader>
            <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
          </Card>
        );
      }
    );
    return (
      <div className="container mb-5">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/departments"></Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Phòng ban</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Phòng ban</h3>
          </div>
        </div>
        <div className="row">{departmentsDetail}</div>
      </div>
    );
  }
}

export default Departments;
