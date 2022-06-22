import React from "react";
import {
  Card,
  CardHeader,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderSalary({ staff }) {
  return (
    <Card>
      <h3>{staff.name}</h3>
      <CardHeader>
        <p>Mã nhân viên: {staff.id}</p>
        <p>Hệ số lương: {staff.salaryScale}</p>
        <p>Số ngày làm thêm: {staff.overTime}</p>
      </CardHeader>
      <CardText className="ml-4">
        Lương: {staff.salaryScale * 3000000 + staff.overTime * 200000}
      </CardText>
    </Card>
  );
}

const Salary = (props) => {
  //   const salary = props.staffs.map((staff) => {
  //     <div key={staff.id} className="col-6 col-sm-6 col-md-4 mt-3">
  //       <RenderSalary staff={staff} />
  //     </div>;
  //   });
  const salary = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-sm-6 col-md-4 mt-3">
        <RenderSalary staff={staff} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row mb-5">{salary}</div>
    </div>
  );
};

export default Salary;
