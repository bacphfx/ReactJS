import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar dark>
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;
