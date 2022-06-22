import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  Input,
  FormGroup,
  Label,
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

const StaffList = (props) => {
  const staffList = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-sm-4 col-md-2 mt-3">
        <RenderStaffList staff={staff} />
      </div>
    );
  });
  const [keyword] = useState("");
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
          <Form className="pull-right">
            <Button className="btn btn-primary pull-right">Seacrh</Button>
            <FormGroup className="d-inline pull-right">
              <Input
                type="text"
                name="keyword"
                // onChange={(e) => setkeyword(e.target.value)}
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
};

export default StaffList;
