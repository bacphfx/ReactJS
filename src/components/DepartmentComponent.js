import React from "react";
import {
  Card,
  CardHeader,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponents";

const Departments = (props) => {
  const deptList = props.deptList.map((department) => {
    return (
      <Card key={department.id} className="col-12 col-sm-6 col-md-4 mt-3">
        <Link to={`/departments/${department.id}`}>
          <CardHeader>
            <b>{department.name}</b>
          </CardHeader>
          <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
        </Link>
      </Card>
    );
  });
  if (props.deptLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.deptErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.deptErrMess}</h4>
        </div>
      </div>
    );
  } else
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
        <div className="row">{deptList}</div>
      </div>
    );
};

export default Departments;
