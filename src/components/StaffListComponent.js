import React, { Component } from "react";
import { Card, CardTitle, CardText, Form } from "reactstrap";
import dateFormat from "dateformat";
import "../";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedStaff: null };
  }

  onStaffSelect = function (staff) {
    this.setState({ selectedStaff: staff });
    document.getElementById(`${staff.id}`).classList.add("active");
  };

  renderStaffDetail = function (staff) {
    if (staff != null) {
      document.getElementById("note").innerHTML = "";
      return (
        <div className="col-12 col-sm-6 col-md-4">
          <Card>
            <h4>{staff.name}</h4>
            <CardText>
              Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
            </CardText>
            <CardText>
              Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
            </CardText>
            <CardText>Phòng ban: {staff.department.name}</CardText>
            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
            <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  setting = function () {
    return (
      <Form className="col-6 col-sm-4 col-md-3" id="form">
        <hr></hr>
        <select className="form-select" id="num-input">
          <option>Select number collum/sheet</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>6</option>
        </select>
      </Form>
    );
  };

  render() {
    const staffList = this.props.staffs.map((staff) => {
      // const numSetting = document.getElementById("num-input").value || 1;
      return (
        <div
          key={staff.id}
          id={staff.id}
          className="col-12 col-sm-6 col-md-4 mt-3"
        >
          <Card onClick={() => this.onStaffSelect(staff)}>
            <CardTitle>{staff.name}</CardTitle>
          </Card>
        </div>
      );
    });

    return (
      <div>
        <div className="row">{staffList}</div>
        <h5 id="note">Bấm vào tên nhân viên để xem thông tin chi tiết</h5>
        <div className="row">
          {this.renderStaffDetail(this.state.selectedStaff)}
        </div>
        <div className="row">{this.setting()}</div>
      </div>
    );
  }
}

export default StaffList;
