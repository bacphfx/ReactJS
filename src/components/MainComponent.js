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
  fetDeptDetail,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    deptList: state.deptList,
    deptDetail: state.deptDetail,
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
});

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDeptList();
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
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
        />
      );
    };
    const DepartmentWithId = ({ match }) => {
      return (
        <DepartmentDetail
          department={
            this.props.deptList.deptList.filter(
              (department) => department.id === match.params.departmentId
            )[0]
          }
          deptDetail={this.props.deptDetail}
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
                staffs={this.props.staffs}
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
            component={() => <Departments deptList={this.props.deptList} />}
          />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
