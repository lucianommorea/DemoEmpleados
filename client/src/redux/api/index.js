import axios from "axios";

// RUTAS Empleados
export const postEmployee = (employee) => axios.post(`/empleados`, employee);
export const putEmployeeInfo = (id, modify) => axios.put(`/empleados/${id}`, modify);
export const getAllEmployees = () => axios.get('/empleados');
export const getEmployeeIdSearch = (id) => axios.get(`/empleados?id=${id}`);
export const getEmployeeStatus = (status) => axios.get(`/empleados?status=${status}`);
export const getEmployeesName = (search) => axios.get(`/empleados?search=${search}`);
export const getEmployeeId = (id) => axios.get(`/empleados/${id}`);

// RUTAS Ingresos
export const postIngreso = (ingreso) => axios.post(`/ingresos`, ingreso);
export const putIngresos = (id, modify) => axios.put(`/ingresos/${id}`, modify);
export const getAllIngresos = () => axios.get('/ingresos');
export const getIngresoId = (id) => axios.get(`/ingresos?id=${id}`);
export const getIngresosByEmployee = (idEmpleado) => axios.get(`/ingresos?idEmpleado=${idEmpleado}`);

// RUTAS Egresos
export const postEgreso = (egreso) => axios.post(`/egresos`, egreso);
export const putEgresos = (id, modify) => axios.put(`/egresos/${id}`, modify);
export const getAllEgresos = () => axios.get('/egresos');
export const getEgresoId = (id) => axios.get(`/egresos?id=${id}`);
export const getEgresosByEmployee = (idEmpleado) => axios.get(`/egresos?idEmpleado=${idEmpleado}`);

