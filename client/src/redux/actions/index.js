import * as api from "../api";
import { GET_ALL_EGRESOS, GET_ALL_EMPLOYEES, GET_ALL_INGRESOS, GET_EGRESOS_EMPLOYEE, GET_EGRESOS_ID, GET_EMPLOYEES_STATUS, GET_EMPLOYEE_ID, GET_EMPLOYEES_NAME, GET_INGRESOS_EMPLOYEE, GET_INGRESOS_ID, POST_EGRESO, POST_EMPLOYEE, POST_INGRESO, PUT_EGRESOS, PUT_EMPLOYEE_INFO, PUT_INGRESOS, GET_EMPLOYEE_ID_SEARCH, GET_ALL_ACTIVE_EMPLOYEES, GET_ACTIVE_EMPLOYEE_ID_SEARCH, GET_ACTIVE_EMPLOYEES_NAME, GET_ACTIVE_EMPLOYEES_STATUS, PUT_EMPLOYEE_ACTIVITY, CLEAN_EMPLOYEES, CLEAN_EMPLOYEE, CLEAN_INGRESOS } from "./actionTypes";

export const postEmployee = (employee) => async (dispatch) => {
    try {
      const { data } = await api.postEmployee(employee);
      dispatch({ type: POST_EMPLOYEE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const putEmployeeInfo = (id, modify) => async (dispatch) => {
    try {
      const {data} = await api.putEmployeeInfo(id, modify);
      dispatch({ type: PUT_EMPLOYEE_INFO, payload: data})
    } catch (error) {
      console.log(error.message);
    }
};

export const putEmployeeActivity = (id, modify) => async (dispatch) => {
  try {
    const {data} = await api.putEmployeeActivity(id, modify);
    dispatch({ type: PUT_EMPLOYEE_ACTIVITY, payload: data})
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllEmployees = () => async (dispatch) => {
    try {
      const { data } = await api.getAllEmployees();
      dispatch({ type: GET_ALL_EMPLOYEES, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const getEmployeeIdSearch = (id) => async (dispatch) => {
  try {
    const { data } = await api.getEmployeeIdSearch(id);
    dispatch({ type: GET_EMPLOYEE_ID_SEARCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmployeeId = (id, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.getEmployeeId(id);
    dispatch({ type: GET_EMPLOYEE_ID, payload: data });
    setLoading && setLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmployeeStatus = (status) => async (dispatch) => {
    try {
      const { data } = await api.getEmployeeStatus(status);
      dispatch({ type: GET_EMPLOYEES_STATUS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const getEmployeesName = (search) => async (dispatch) => {
    try {
      const { data } = await api.getEmployeesName(search);
      dispatch({ type: GET_EMPLOYEES_NAME, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const getAllActiveEmployees = () => async (dispatch) => {
  try {
    const { data } = await api.getAllActiveEmployees();
    dispatch({ type: GET_ALL_ACTIVE_EMPLOYEES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getActiveEmployeeIdSearch = (id) => async (dispatch) => {
try {
    const { data } = await api.getActiveEmployeeIdSearch(id);
    dispatch({ type: GET_ACTIVE_EMPLOYEE_ID_SEARCH, payload: data });
  } catch (error) {
  console.log(error.message);
}
};

export const getActiveEmployeesName = (search) => async (dispatch) => {
  try {
    const { data } = await api.getActiveEmployeesName(search);
    dispatch({ type: GET_ACTIVE_EMPLOYEES_NAME, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getActiveEmployeeStatus = (status) => async (dispatch) => {
  try {
    const { data } = await api.getActiveEmployeeStatus(status);
    dispatch({ type: GET_ACTIVE_EMPLOYEES_STATUS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const postIngreso = (ingreso) => async (dispatch) => {
    try {
      const { data } = await api.postIngreso(ingreso);
      dispatch({ type: POST_INGRESO, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const putIngresos = (id, modify) => async (dispatch) => {
    try {
      const {data} = await api.putIngresos(id, modify);
      dispatch({ type: PUT_INGRESOS, payload: data})
    } catch (error) {
      console.log(error.message);
    }
};


export const getAllIngresos = () => async (dispatch) => {
    try {
      const { data } = await api.getAllIngresos();
      dispatch({ type: GET_ALL_INGRESOS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const getIngresoId = (id) => async (dispatch) => {
  try {
    const { data } = await api.getIngresoId(id);
    dispatch({ type: GET_INGRESOS_ID, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getIngresoByEmployee = (idEmpleado) => async (dispatch) => {
    try {
      const { data } = await api.getIngresosByEmployee(idEmpleado);
      dispatch({ type: GET_INGRESOS_EMPLOYEE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const postEgreso = (egreso) => async (dispatch) => {
    try {
      const { data } = await api.postEgreso(egreso);
      dispatch({ type: POST_EGRESO, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const putEgresos = (id, modify) => async (dispatch) => {
    try {
      const {data} = await api.putEgresos(id, modify);
      dispatch({ type: PUT_EGRESOS, payload: data})
    } catch (error) {
      console.log(error.message);
    }
};

export const getAllEgresos = () => async (dispatch) => {
    try {
      const { data } = await api.getAllEgresos();
      dispatch({ type: GET_ALL_EGRESOS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const getEgresoId = (id) => async (dispatch) => {
  try {
    const { data } = await api.getEgresoId(id);
    dispatch({ type: GET_EGRESOS_ID, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getEgresosByEmployee = (idEmpleado) => async (dispatch) => {
    try {
      const { data } = await api.getEgresosByEmployee(idEmpleado);
      dispatch({ type: GET_EGRESOS_EMPLOYEE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const cleanEmployees = () => {
  return { type: CLEAN_EMPLOYEES };
};

export const cleanEmployee = () => {
  return { type: CLEAN_EMPLOYEE };
};

export const cleanIngresos = () => {
  return { type: CLEAN_INGRESOS };
};
