import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponents";

// tạo function hiển thị thông tin bảng lương của nhân nhiên
function RenderSalary({ staff }) {
  const salaryCalc = (
    staff.salaryScale * 3000000 +
    staff.overTime * 200000
  ).toFixed(0);
  staff.salaryCalc = salaryCalc;
  return (
    <Card>
      <h3>{staff.name}</h3>
      <CardHeader>
        <p>Mã nhân viên: {staff.id}</p>
        <p>Hệ số lương: {staff.salaryScale}</p>
        <p>Số ngày làm thêm: {staff.overTime}</p>
      </CardHeader>
      <CardText className="ml-4">Lương: {staff.salaryCalc}</CardText>
    </Card>
  );
}

// Khai báo component Salary
class Salary extends Component {
  constructor(props) {
    super(props);
    this.state = { sort: "id uppering" };
    this.renderBreedcrum = this.renderBreedcrum.bind(this);
  }
  onSortSelect = function (sort) {
    this.setState({ sort: sort });
  };

  // function hiển thị Breadcrumb, dùng nhiều lần
  renderBreedcrum() {
    return (
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
        <div className="container">
          <Form className="pull-right">
            <Button
              className="btn btn-primary pull-right mr-1"
              onClick={() => this.onSortSelect("salary lowering")}
            >
              Lương ↓
            </Button>
            <Button
              className="btn btn-primary pull-righ mr-1"
              onClick={() => this.onSortSelect("salary uppering")}
            >
              Lương ↑
            </Button>
            <Button
              className="btn btn-primary pull-right mr-1"
              onClick={() => this.onSortSelect("id lowering")}
            >
              ID ↓
            </Button>
            <Button
              className="btn btn-primary pull-right mr-1"
              onClick={() => this.onSortSelect("id uppering")}
            >
              ID ↑
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.salaryLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.salaryErrMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.salaryErrMess}</h4>
          </div>
        </div>
      );
    } else {
      // Nếu state là id tăng dần
      if (this.state.sort === "id uppering") {
        // Tạo mảng mới theo id tăng dần
        const sortByIDUperring = this.props.salary.sort(function (a, b) {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        // render mảng mới có id tăng dần
        const salaryList = sortByIDUperring.map((staff) => {
          return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4 mt-3">
              <RenderSalary staff={staff} />
            </div>
          );
        });
        return (
          <div className="container">
            <this.renderBreedcrum />
            <div className="row mb-5">{salaryList}</div>
          </div>
        );
      }
      // Nếu state là id giảm dần
      else if (this.state.sort === "id lowering") {
        // tạo mảng mới theo id giảm dần
        const sortByIDLowering = this.props.salary.sort(function (a, b) {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        });
        // render mảng mới có id giảm dần
        const salary = sortByIDLowering.map((staff) => {
          return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4 mt-3">
              <RenderSalary staff={staff} />
            </div>
          );
        });
        return (
          <div className="container">
            <this.renderBreedcrum />
            <div className="row mb-5">{salary}</div>
          </div>
        );
      }
      // Nếu state là lương tăng dần
      else if (this.state.sort === "salary uppering") {
        // Tạo mảng mới theo lương tăng dần
        const sortBySalaryUppering = this.props.salary.sort(function (a, b) {
          if (a.salaryCalc < b.salaryCalc) {
            return -1;
          }
          if (a.salaryCalc > b.salaryCalc) {
            return 1;
          }
          return 0;
        });
        // render mảng mới có lương tăng dần
        const salary = sortBySalaryUppering.map((staff) => {
          return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4 mt-3">
              <RenderSalary staff={staff} />
            </div>
          );
        });
        return (
          <div className="container">
            <this.renderBreedcrum />
            <div className="row mb-5">{salary}</div>
          </div>
        );
      }
      // Nếu state là lương giảm dần
      else if (this.state.sort === "salary lowering") {
        // Tạo mảng mới có lương giảm dần
        const sortBySalaryLowering = this.props.salary.sort(function (a, b) {
          if (a.salaryCalc > b.salaryCalc) {
            return -1;
          }
          if (a.salaryCalc < b.salaryCalc) {
            return 1;
          }
          return 0;
        });
        // render mảng mới có lương giảm dần
        const salary = sortBySalaryLowering.map((staff) => {
          return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4 mt-3">
              <RenderSalary staff={staff} />
            </div>
          );
        });
        return (
          <div className="container">
            <this.renderBreedcrum />
            <div className="row mb-5">{salary}</div>
          </div>
        );
      }
    }
  }
}

export default Salary;
