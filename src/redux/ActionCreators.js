import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// post nhan vien moi len server
export const postStaff =
  (name, doB, startDate, salaryScale, department, annualLeave, overTime) =>
  (dispatch) => {
    const newStaff = {
      name: name,
      dob: doB,
      startDate: startDate,
      salaryScale: salaryScale ? salaryScale : 1,
      department: department ? department : "Sale",
      annualLeave: annualLeave ? annualLeave : 0,
      overTime: overTime ? overTime : 0,
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
      default:
        newStaff.departmentId = "Dept01";
    }
    newStaff.image = "/assets/images/alberto.png";

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
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addStaff(response)))
      .catch((error) => {
        console.log("Post new staff ", error.message);
        alert("New staff could not be posted\nError: " + error.message);
      });
  };
export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

// Update thong tin nhân viên len server
export const patchStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(staff),
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
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(updateStaff(response)));
};
export const updateStaff = (staff) => ({
  type: ActionTypes.EDIT_STAFF,
  payload: staff,
});

// Xóa nhân viên
export const deleteStaff = (id) => (dispatch) => {
  if (window.confirm("Are you sure?")) {
    return fetch(baseUrl + `staffs/${id}`, {
      method: "DELETE",
    }).then(() => {
      dispatch(delStaff(id));
    });
  }
};

export const delStaff = (id) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: id,
});

// Lấy thông tin danh sách nhân viên
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
  dispatch(departmentsLoading(true));
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
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentFailed(error.message)));
};

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentFailed = (errMess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errMess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

// Lấy thông tin bảng lương
export const fetchSalary = () => (dispatch) => {
  dispatch(salaryLoading(true));
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

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});

export const salaryFailed = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});
