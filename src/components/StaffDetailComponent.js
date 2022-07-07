import React from "react";
import {
  Media,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  Row,
} from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponents";

function RenderStaffDetail({ staff }) {
  switch (staff.departmentId) {
    case "Dept01":
      staff.department = "Sale";
      break;
    case "Dept02":
      staff.department = "HR";
      break;
    case "Dept03":
      staff.department = "Marketing";
      break;
    case "Dept04":
      staff.department = "IT";
      break;
    case "Dept05":
      staff.department = "Finance";
      break;
  }
  return (
    <div key={staff.id}>
      <Media className="container" tag="li">
        <div className="col-12 col-sm-4 col-md-3">
          <img src={staff.image} alt={staff.name} width="100%" />
          <div className="row m-3">
            <Button>
              <span className="fa fa-pencil fa-sm"></span> Sửa
            </Button>

            <Button className="ml-4">
              <span className="fa fa-trash fa-md"></span> Xóa
            </Button>
          </div>
        </div>

        <Media body className="col-12 col-sm-8 col-md-9 ml-1">
          <Media heading>Họ và tên: {staff.name}</Media>
          <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
          <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
          <p>Phòng ban: {staff.department}</p>
          <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
          <p>Số ngày làm thêm: {staff.overTime}</p>
        </Media>
      </Media>
    </div>
  );
}

const StaffDetail = (props) => {
  if (props.staffLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.staffErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.staffErrMess}</h4>
        </div>
      </div>
    );
  } else if (props.staff != null) {
    return (
      <div className="container mb-3">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>
          <RenderStaffDetail staff={props.staff} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
