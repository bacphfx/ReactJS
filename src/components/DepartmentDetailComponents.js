import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  CardText,
} from "reactstrap";
import { Loading } from "./LoadingComponents";

function RenderStaffOfDept({ staff }) {
  return (
    <Card>
      <Link to={`/staffs/${staff.id}`}>
        <CardImg src={staff.image} />
        <CardText className="text-center">{staff.name}</CardText>
      </Link>
    </Card>
  );
}

const DepartmentDetail = (props) => {
  const staffOfDept = props.staffOfDept.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-sm-4 col-md-2 mt-3">
        <RenderStaffOfDept staff={staff} />
      </div>
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
  } else {
    return (
      <div className="container mb-3">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/departments">Phòng ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row mb-5">{staffOfDept}</div>
      </div>
    );
  }
};

export default DepartmentDetail;
