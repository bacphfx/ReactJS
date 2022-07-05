import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staffs";
import { DeptList } from "./deptList";
import { DeptDetail } from "./deptDetail";
import { Salary } from "./salary";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      deptList: DeptList,
      deptDetail: DeptDetail,
      salary: Salary,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
