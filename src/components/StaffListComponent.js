import React, { Component } from "react";
import { Card, CardTitle, CardText } from "reactstrap";

function RenderStaff({ staff, onClick }) {
  return (
    <Card onClick={() => onClick(staff.id)}>
      <CardTitle>{staff.name}</CardTitle>
    </Card>
  );
}
const StaffList = (props) => {
  const staffList = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-sm-6 col-md-4 mt-3">
        <RenderStaff staff={staff} onClick={props.onClick} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row mb-5">{staffList}</div>

      <h5 id="note">Bấm vào tên nhân viên để xem thông tin chi tiết</h5>
    </div>
  );
};

export default StaffList;
