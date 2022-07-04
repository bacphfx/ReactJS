import * as ActionTypes from "./ActionTypes";
import { STAFFS } from "../shared/staffs";

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

  setTimeout(() => {
    dispatch(addStaffs(STAFFS));
  }, 2000);
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
