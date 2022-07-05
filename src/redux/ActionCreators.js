import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addStaff = (
  name,
  doB,
  startDate,
  salaryScale,
  department,
  annualLeave,
  overTime
) => ({
  type: ActionTypes.ADD_STAFF,
  payload: {
    name: name,
    doB: doB,
    startDate: startDate,
    salaryScale: salaryScale,
    department: department,
    annualLeave: annualLeave,
    overTime: overTime,
  },
});

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const fetchDeptList = () => (dispatch) => {
  return fetch(baseUrl + "departments")
    .then((response) => response.json())
    .then((departments) => dispatch(addDeptList(departments)));
};

export const departmentFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDeptList = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const fetDeptDetail = (id) => (dispatch) => {
  return fetch(baseUrl + "departments/" + id)
    .then((response) => response.json())
    .then((deptDetail) => dispatch(addDeptDetail(deptDetail)));
};

export const addDeptDetail = (deptDetail) => ({
  type: ActionTypes.ADD_DEPTDETAIL,
  payload: deptDetail,
});
