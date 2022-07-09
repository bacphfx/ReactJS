import React, { Component } from "react";
import { Loading } from "./LoadingComponents";
import {
  Card,
  CardImg,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Form,
  Input,
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
    };
    this.renderBreedcrum = this.renderBreedcrum.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
            <Row className="form-group mr-2">
              <Input
                type="text"
                id="search"
                name="search"
                placeholder="Nhập từ khóa để tìm kiếm"
                innerRef={(input) => (this.search = input)}
              />
            </Row>
          </Form>
        </div>
        <div className="col-12">
          <h3>Nhân viên</h3>
        </div>
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
    if (this.props.staffsLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffsErrMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.staffsErrMess}</h4>
          </div>
        </div>
      );
    } else if (this.state.staffSearched == null) {
      const staffList = this.props.staffs.map((staff) => {
        if (this.props.staffs.isLoading) {
          return (
            <div className="container">
              <div className="row">
                <Loading />
              </div>
            </div>
          );
        } else if (this.props.staffs.errMess) {
          return (
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h4>{this.props.staffs.errMess}</h4>
                </div>
              </div>
            </div>
          );
        } else
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
