import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postStaff =
  (name, doB, startDate, salaryScale, department, annualLeave, overTime) =>
  (dispatch) => {
    const newStaff = {
      name: name,
      doB: doB,
      startDate: startDate,
      salaryScale: salaryScale,
      department: department,
      annualLeave: annualLeave,
      overTime: overTime,
    };
    switch (newStaff.department) {
      case "Sale":
        newStaff.departmentId = "Dept01";
        break;
      case "HR":
        newStaff.departmentId = "Dept02";
        break;
      case "IT":
        newStaff.departmentId = "Dept03";
        break;
      case "Marketing":
        newStaff.departmentId = "Dept04";
        break;
      case "Finance":
        newStaff.departmentId = "Dept05";
        break;
    }
    newStaff.image = "/assets/images/alberto.png";
    delete newStaff.department;

    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addStaff(response)))
      .catch((error) => {
        console.log("post comments", error.message);
        alert("Your comment could not be posted\nError: " + error.message);
      });
  };

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffFailed(error.message)));
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

// Lấy danh sách phòng ban
export const fetchDeptList = () => (dispatch) => {
  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((departments) => dispatch(addDeptList(departments)))
    .catch((error) => dispatch(departmentFailed(error.message)));
};

export const departmentFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDeptList = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

// Lấy danh sách nhân viên của từng phòng ban
export const fetchDeptDetail = (id) => (dispatch) => {
  return fetch(baseUrl + "departments/" + id)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((deptDetail) => dispatch(addDeptDetail(deptDetail)))
    .catch((error) => dispatch(deptDetailFailed(error.message)));
};

export const addDeptDetail = (deptDetail) => ({
  type: ActionTypes.ADD_DEPTDETAIL,
  payload: deptDetail,
});

export const deptDetailFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

// Lấy thông tin bảng lương
export const fetchSalary = () => (dispatch) => {
  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((salary) => dispatch(addSalary(salary)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});

export const salaryFailed = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});
