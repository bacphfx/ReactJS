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
      keyword: "",
      staffSearched: null,
    };
    this.renderBreedcrum = this.renderBreedcrum.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // function hiển thị Breadcrumb, dùng nhiều lần
  renderBreedcrum() {
    return (
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs"></Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
        </Breadcrumb>
        <div className="container">
          <Form className="pull-right" onSubmit={this.handleSubmit}>
            <Button className="btn btn-primary pull-right">Seacrh</Button>
            <FormGroup className="d-inline pull-right">
              <Input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Nhập từ khóa để tìm kiếm"
              />
            </FormGroup>
          </Form>
        </div>
        <div className="col-12">
          <h3>Nhân viên</h3>
        </div>
      </div>
    );
  }

  // Hàm lấy keyword người dùng nhập vào
  handleChange(event) {
    this.setState({ keyword: event.target.value });
  }

  // Hàm tìm nhân viên thỏa mãn keyword
  handleSubmit(event, searchResult) {
    event.preventDefault();
    searchResult = this.props.staffs.filter((staff) =>
      staff.name.toLowerCase().includes(this.state.keyword.toLowerCase())
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
