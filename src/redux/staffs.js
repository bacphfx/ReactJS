import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = { isLoading: true, errMess: null, staffs: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFF:
      var staff = action.payload;
      staff.id = 17;
      switch (staff.department) {
        case "Sale":
          staff.departmentId = "Dept01";
          break;
        case "HR":
          staff.departmentId = "Dept02";
          break;
        case "IT":
          staff.departmentId = "Dept03";
          break;
        case "Marketing":
          staff.departmentId = "Dept04";
          break;
        case "Finance":
          staff.departmentId = "Dept05";
          break;
      }
      staff.image = "/assets/images/alberto.png";
      delete staff.department;
      console.log(staff);
      return { ...state, staffs: state.staffs.concat(staff) };

    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };

    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };

    case ActionTypes.STAFFS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
