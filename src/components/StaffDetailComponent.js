import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponents";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.RenderStaffDetail = this.RenderStaffDetail.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    console.log(this.state.isModalOpen);
  }

  RenderStaffDetail({ staff }) {
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
      <div className="container">
        <div className="row" key={staff.id}>
          <div className="col-12 col-sm-4 col-md-3">
            <img src={staff.image} alt={staff.name} width="100%" />
          </div>
          <div className="col-12 col-sm-8 col-md-9">
            <h3>Họ và tên: {staff.name}</h3>
            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
            <p>Phòng ban: {staff.department}</p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số ngày làm thêm: {staff.overTime}</p>
            <Button onClick={this.toggleModal}>
              <span className="fa fa-pencil"></span> Edit
            </Button>
            <Button className="ml-2">
              <span className="fa fa-trash"></span> Delete
            </Button>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Sửa thông tin nhân viên
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="name" sm={4}>
                  Tên
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tên"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="doB" sm={4}>
                  Ngày sinh
                </Label>
                <Col sm={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    placeholder="Ngày sinh"
                    value={this.state.doB}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="startDate" sm={4}>
                  Ngày vào công ty
                </Label>
                <Col sm={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    placeholder="startDate"
                    value={this.state.startDate}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="departmentId" sm={4}>
                  Phòng ban
                </Label>
                <Col sm={8}>
                  <Input
                    type="select"
                    id="departmentId"
                    name="departmentId"
                    value={this.state.departmentId}
                    onChange={this.handleInputChange}
                  >
                    <option value="Dept01">Sale</option>
                    <option value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="salaryScale" sm={4}>
                  Hệ số lương
                </Label>
                <Col sm={8}>
                  <Input
                    type="number"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="1.0 -> 3.0"
                    value={this.state.salaryScale}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="annualLeave" sm={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col sm={8}>
                  <Input
                    type="number"
                    id="annualLeave"
                    name="annualLeave"
                    placeholder="Số ngày nghỉ còn lại"
                    value={this.state.annualLeave}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="overTime" sm={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col sm={8}>
                  <Input
                    type="number"
                    id="overTime"
                    name="overTime"
                    placeholder="Số ngày đã làm thêm"
                    value={this.state.overTime}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button type="submit" color="primary">
                    Thêm
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  render() {
    if (this.props.staffLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffErrMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.staffErrMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.staff != null) {
      return (
        <div className="container mb-3">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staffs">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div>
            <this.RenderStaffDetail staff={this.props.staff} />
          </div>
        </div>
      );
    }
  }
}

export default StaffDetail;
