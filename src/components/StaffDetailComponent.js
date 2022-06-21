import React, { Component } from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import dateFormat from "dateformat";

const RenderStaff = function (staff) {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <Card>
        <h4>{staff.name}</h4>
        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
        <CardText>
          Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
        </CardText>
        <CardText>Phòng ban: {staff.department.name}</CardText>
        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
        <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
      </Card>
    </div>
  );
};
const StaffDetail = (props) => {
  return (
    <div>
      <RenderStaff staff={props.staff} />
    </div>
  );
};

export default StaffDetail;
