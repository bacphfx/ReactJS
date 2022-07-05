import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class DepartmentDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.department);
    if (this.props.department != null) {
      return (
        <div className="container mb-3">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staffs">Phòng ban</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {this.props.department.name}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div></div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DepartmentDetail;
