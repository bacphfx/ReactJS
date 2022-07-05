import * as ActionTypes from "./ActionTypes";

export const DeptList = (
  state = { isLoading: true, errMess: null, deptList: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPARTMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        deptList: action.payload,
      };

    case ActionTypes.DEPARTMENTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
