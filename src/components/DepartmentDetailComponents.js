import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  CardText,
} from "reactstrap";

function RenderStaffOfDept({ staff }) {
  return (
    <Card>
      <Link to={`/staffs/${staff.id}`}>
        <CardImg src={staff.image} />
        <CardText className="text-center">{staff.name}</CardText>
      </Link>
    </Card>
  );
}

class DepartmentDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDeptDetail(this.props.department.id);
  }
  render() {
    if (this.props.deptDetail != null) {
      const staffOfDept = this.props.deptDetail.deptDetail.map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-sm-4 col-md-2 mt-3">
            <RenderStaffOfDept staff={staff} />
          </div>
        );
      });
      return (
        <div className="container mb-3">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/departments">Phòng ban</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {this.props.department.name}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row mb-5">{staffOfDept}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DepartmentDetail;
