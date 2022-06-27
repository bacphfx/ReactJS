import React, { Component } from "react";

import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Departments from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
        />
      );
    };
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route
            exact
            path="/staffs"
            component={() => <StaffList staffs={this.props.staffs} />}
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route path="/departments" component={Departments} />
          <Route
            path="/salary"
            component={() => <Salary staffs={this.props.staffs} />}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
