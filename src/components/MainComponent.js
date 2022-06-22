import React, { Component } from "react";
import { STAFFS } from "../shared/staffs";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      selectedStaff: null,
    };
  }
  onStaffSelect(staffId) {
    this.setState({ selectedStaff: staffId });
  }
  render() {
    return (
      <div className="container">
        <Header />
        <StaffList
          staffs={this.state.staffs}
          onClick={(staffId) => this.onStaffSelect(staffId)}
        />
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === this.state.selectedStaff
            )[0]
          }
        />
        <Footer />
      </div>
    );
  }
}

export default Main;
