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
import { FadeTransform } from "react-animation-components";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    const department = this.props.department.filter(
      (dept) => dept.id === this.props.staff.departmentId
    )[0].name;
    this.state = {
      id: this.props.staff.id,
      name: this.props.staff.name,
      doB: dateFormat(this.props.staff.doB, "mm/dd/yyyy"),
      startDate: dateFormat(this.props.staff.startDate, "mm/dd/yyyy"),
      salaryScale: this.props.staff.salaryScale,
      departmentId: this.props.staff.departmentId,
      department: department,
      annualLeave: this.props.staff.annualLeave,
      overTime: this.props.staff.overTime,
      isModalOpen: false,
    };
    this.RenderStaffDetail = this.RenderStaffDetail.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const editedStaff = {
      id: this.state.id,
      name: this.state.name,
      doB: dateFormat(this.state.doB, "mm/dd/yyyy"),
      startDate: dateFormat(this.state.startDate, "mm/dd/yyyy"),
      salaryScale: this.state.salaryScale,
      departmentId: this.state.departmentId,
      department: this.state.department,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
    };

    console.log(editedStaff);
    this.props.patchStaff(editedStaff);
    this.toggleModal();
  }

  RenderStaffDetail({ staff }) {
    return (
      <div className="container">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <div className="row" key={staff.id}>
            <div className="col-12 col-sm-4 col-md-3">
              <img src={staff.image} alt={staff.name} width="100%" />
            </div>
            <div className="col-12 col-sm-8 col-md-9">
              <h3>Họ và tên: {staff.name}</h3>
              <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
              <p>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </p>
              <p>Phòng ban: {this.state.department}</p>
              <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
              <p>Số ngày làm thêm: {staff.overTime}</p>
              <Button onClick={this.toggleModal}>
                <span className="fa fa-pencil"></span> Edit
              </Button>
            </div>
          </div>
        </FadeTransform>
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
