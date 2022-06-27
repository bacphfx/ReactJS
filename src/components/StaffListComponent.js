import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  Input,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

// tạo function hiển thị nhân viên
function RenderStaffList({ staff }) {
  return (
    <Card>
      <Link to={`/staffs/${staff.id}`}>
        <CardImg src={staff.image} />
        <CardText className="text-center">{staff.name}</CardText>
      </Link>
    </Card>
  );
}

// Khai báo component StaffList
class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffSearched: null,
      isModalOpen: false,
      name: "",
      doB: "",
      startDate: "",
      department: "Sale",
      salaryScale: "1",
      annualLeave: "0",
      overTime: "0",
      validStaff: true,
      touched: {
        name: false,
        doB: false,
        startDate: false,
      },
    };
    this.renderBreedcrum = this.renderBreedcrum.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddStaff = this.handleAddStaff.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  // Hàm thêm thông tin nhân viên vào state
  handleAddStaff(event) {
    event.preventDefault;
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  // Hàm tạo nhân viên mới
  handleSubmit(event) {
    event.preventDefault();
    if ((this.state.validStaff = true)) {
      const newStaff = {
        id: this.props.staffs.length,
        name: this.state.name,
        doB: this.state.doB,
        salaryScale: this.state.salaryScale,
        startDate: this.state.startDate,
        department: { name: this.state.department },
        annualLeave: this.state.annualLeave,
        overTime: this.state.overTime,
        salary: this.state.salaryScale * 3000000 + this.state.overTime * 200000,
        image: "/assets/images/alberto.png",
      };

      this.props.staffs.push(newStaff);
      this.toggleModal();
    }
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(name, doB, startDate) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
    };

    if (this.state.touched.name && name.length === 0)
      errors.name = "Yêu cầu nhập";
    else if (this.state.touched.name && name.length <= 2)
      errors.name = "Yêu cầu nhiều hơn 2 ký tự";
    else if (this.state.touched.name && name.length >= 30)
      errors.name = "Yêu cầu nhập ít hơn 30 ký tự";

    if (this.state.touched.doB && doB === new Date())
      errors.name = "Yêu cầu nhập";

    if (this.state.touched.startDate && startDate.length === 0)
      errors.name = "Yêu cầu nhập";

    return errors;
  }

  // function hiển thị Breadcrumb, dùng nhiều lần
  renderBreedcrum() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate
    );
    return (
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs"></Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
        </Breadcrumb>
        <div></div>
        <div className="container">
          <Form className="pull-right" onSubmit={this.handleSearch}>
            <Button
              type="submit"
              value="submit"
              className="btn btn-primary pull-right"
            >
              Seacrh
            </Button>
            <FormGroup className="d-inline pull-right">
              <Input
                type="text"
                id="search"
                name="search"
                placeholder="Nhập từ khóa để tìm kiếm"
                innerRef={(input) => (this.search = input)}
              />
            </FormGroup>
          </Form>
          <Form className="pull-right mr-5">
            <Button onClick={this.toggleModal}>
              <span className="fa fa-solid fa-plus"></span>
            </Button>
          </Form>
        </div>
        <div className="col-12">
          <h3>Nhân viên</h3>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleAddStaff}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleAddStaff}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleAddStaff}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type="select"
                    id="department"
                    name="department"
                    value={this.state.department}
                    onChange={this.handleAddStaff}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    value={this.state.salaryScale}
                    placeholder="1.0 → 3.0"
                    onChange={this.handleAddStaff}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    value={this.state.annualLeave}
                    placeholder="1"
                    onChange={this.handleAddStaff}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="overTime"
                    name="overTime"
                    value={this.state.overTime}
                    onChange={this.handleAddStaff}
                  />
                </Col>
              </FormGroup>
              <Button type="submit" value="submit">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  // Hàm thực hiện tìm kiếm
  handleSearch(event, searchResult) {
    event.preventDefault();
    searchResult = this.props.staffs.filter((staff) =>
      staff.name.toLowerCase().includes(this.search.value.toLowerCase())
    );
    this.setState({ staffSearched: searchResult });
  }

  render() {
    // Nếu chưa thực hiện tìm kiếm
    if (this.state.staffSearched == null) {
      const staffList = this.props.staffs.map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-sm-4 col-md-2 mt-3">
            <RenderStaffList staff={staff} />
          </div>
        );
      });

      return (
        <div className="container">
          <this.renderBreedcrum />
          <div className="row mb-5">{staffList}</div>
        </div>
      );
    }
    // Nếu thực hiện tìm kiếm
    else {
      // Tạo mảng nhân viên từ state staffListSearched
      const staffListSearched = this.state.staffSearched.map(
        (staffSearched) => {
          return (
            <div
              key={staffSearched.id}
              className="col-6 col-sm-4 col-md-2 mt-3"
            >
              <RenderStaffList staff={staffSearched} />
            </div>
          );
        }
      );
      return (
        <div className="container">
          <this.renderBreedcrum />
          <div className="row mb-5">{staffListSearched}</div>
        </div>
      );
    }
  }
}

export default StaffList;
