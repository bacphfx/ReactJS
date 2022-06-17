import { Navbar, NavbarBrand, Form, Label } from "reactstrap";
import "./App.css";
import { STAFFS } from "./shared/staffs";
import { Component } from "react";
import StaffList from "./components/StaffListComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
    };
  }

  render() {
    return (
      <div className="container">
        <Navbar dark color="success">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>

        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
