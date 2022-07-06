import React, { Component } from "react";

import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Departments from "./DepartmentComponent";
import DepartmentDetail from "./DepartmentDetailComponents";
import Salary from "./SalaryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  addStaff,
  fetchStaffs,
  fetchDeptList,
  fetchSalary,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    deptList: state.deptList,
    salary: state.salary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStaff: (
    name,
    doB,
    startDate,
    salaryScale,
    department,
    annualLeave,
    overTime
  ) =>
    dispatch(
      addStaff(
        name,
        doB,
        startDate,
        salaryScale,
        department,
        annualLeave,
        overTime
      )
    ),
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDeptList: () => {
    dispatch(fetchDeptList());
  },

  fetchSalary: () => {
    dispatch(fetchSalary());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDeptList();
    this.props.fetchSalary();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          staffLoading={this.props.staffs.isLoading}
          staffErrMess={this.props.staffs.errMess}
        />
      );
    };
    const DepartmentWithId = ({ match }) => {
      return (
        <DepartmentDetail
          staffOfDept={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.departmentId
          )}
          department={
            this.props.deptList.deptList.filter(
              (department) => department.id === match.params.departmentId
            )[0]
          }
          deptLoading={this.props.deptList.isLoading}
          deptErrMess={this.props.deptList.errMess}
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
            component={() => (
              <StaffList
                staffs={this.props.staffs.staffs}
                staffsLoading={this.props.staffs.isLoading}
                staffsErrMess={this.props.staffs.errMess}
                addStaff={this.props.addStaff}
              />
            )}
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route
            path="/departments/:departmentId"
            component={DepartmentWithId}
          />
          <Route
            path="/departments"
            component={() => (
              <Departments
                deptList={this.props.deptList.deptList}
                deptLoading={this.props.deptList.isLoading}
                deptErrMess={this.props.deptList.errMess}
              />
            )}
          />
          <Route
            path="/salary"
            component={() => (
              <Salary
                salary={this.props.salary.salary}
                salaryLoading={this.props.salary.isLoading}
                salaryErrMess={this.props.salary.errMess}
              />
            )}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
