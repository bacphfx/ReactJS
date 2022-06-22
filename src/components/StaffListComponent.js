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

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      staffSearched: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ keyword: event.target.value });
  }

  handleSubmit(event, searchResult) {
    event.preventDefault();
    searchResult = this.props.staffs.filter((staff) =>
      staff.name.toLowerCase().includes(this.state.keyword.toLowerCase())
    );
    this.setState({ staffSearched: searchResult });

    return (
      <div key={searchResult.id} className="col-6 col-sm-4 col-md-2 mt-3">
        <RenderStaffList staff={searchResult} />
      </div>
    );
  }
  render() {
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

          <div className="row mb-5">{staffList}</div>
        </div>
      );
    } else {
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
          <div className="row mb-5">{staffListSearched}</div>
        </div>
      );
    }
  }
}

export default StaffList;
