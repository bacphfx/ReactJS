import React, { Component } from "react";
import { Card, CardTitle, CardText, Form, Label, Button } from "reactstrap";
import dateFormat from "dateformat";
import "../";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      collumDefault: "col-12 col-sm-6 col-md-4 mt-3",
    };
  }

  onStaffSelect = function (staff) {
    this.setState({ selectedStaff: staff });
  };

  onCollumSelect = function (col) {
    this.setState({ collumDefault: col });
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

  render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div key={staff.id} className={this.state.collumDefault}>
          <Card id={staff.id} onClick={() => this.onStaffSelect(staff)}>
            <CardTitle>{staff.name}</CardTitle>
          </Card>
        </div>
      );
    });

    return (
      <div>
        <div className="row mb-5">{staffList}</div>

        <h5 id="note">Bấm vào tên nhân viên để xem thông tin chi tiết</h5>

        <div className="row">
          {this.renderStaffDetail(this.state.selectedStaff)}
        </div>

        <div className="mt-3">
          <Form className="col-6 col-sm-4 col-md-3">
            <hr></hr>
            <Label>Select collums/sheet</Label>
          </Form>

          <div className="btn-group">
            <button
              onClick={() =>
                this.onCollumSelect("col-12 col-sm-6 col-md-12 mt-3")
              }
              type="button"
              className="btn btn-secondary mr-3"
            >
              1 Cột
            </button>
            <button
              onClick={() =>
                this.onCollumSelect("col-12 col-sm-6 col-md-6 mt-3")
              }
              type="button"
              className="btn btn-secondary mr-3"
            >
              2 Cột
            </button>
            <button
              onClick={() =>
                this.onCollumSelect("col-12 col-sm-6 col-md-4 mt-3")
              }
              type="button"
              className="btn btn-secondary mr-3"
            >
              3 Cột
            </button>
            <button
              onClick={() =>
                this.onCollumSelect("col-12 col-sm-6 col-md-3 mt-3")
              }
              type="button"
              className="btn btn-secondary mr-3"
            >
              4 Cột
            </button>
            <button
              onClick={() =>
                this.onCollumSelect("col-12 col-sm-6 col-md-2 mt-3")
              }
              type="button"
              className="btn btn-secondary mr-3"
            >
              6 Cột
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StaffList;
