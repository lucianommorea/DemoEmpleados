import axios from "axios";

// RUTAS Empleados
export const postEmployee = (employee) => axios.post(`/empleados`, employee);
export const putEmployeeInfo = (id, modify) => axios.put(`/empleados/${id}`, modify);
export const putEmployeeActivity = (id, modify) => axios.put(`/empleados/actividad/${id}`, modify);
export const getAllEmployees = () => axios.get('/empleados');
export const getEmployeeIdSearch = (id) => axios.get(`/empleados?id=${id}`);
export const getEmployeeStatus = (status) => axios.get(`/empleados?status=${status}`);
export const getEmployeesName = (search) => axios.get(`/empleados?search=${search}`);
export const getEmployeeId = (id) => axios.get(`/empleados/${id}`);
export const getAllActiveEmployees = () => axios.get('/empleados/activos');
export const getActiveEmployeeIdSearch = (id) => axios.get(`/empleados/activos?id=${id}`);
export const getActiveEmployeesName = (search) => axios.get(`/empleados/activos?search=${search}`);
export const getActiveEmployeeStatus = (status) => axios.get(`/empleados/activos?status=${status}`);
export const getAllInactiveEmployees = () => axios.get('/empleados/inactivos');
export const getInactiveEmployeeIdSearch = (id) => axios.get(`/empleados/inactivos?id=${id}`);
export const getInactiveEmployeesName = (search) => axios.get(`/empleados/inactivos?search=${search}`);

// RUTAS Ingresos
export const postIngreso = (ingreso) => axios.post(`/ingresos`, ingreso);
export const putIngresos = (id, modify) => axios.put(`/ingresos/${id}`, modify);
export const getAllIngresos = () => axios.get('/ingresos');
export const getIngresoId = (id) => axios.get(`/ingresos?id=${id}`);
export const getIngresosByEmployee = (idEmpleado) => axios.get(`/ingresos?idEmpleado=${idEmpleado}`);
export const deleteIngreso = (id) => axios.delete(`/ingresos/${id}`);

// RUTAS Egresos
export const postEgreso = (egreso) => axios.post(`/egresos`, egreso);
export const putEgresos = (id, modify) => axios.put(`/egresos/${id}`, modify);
export const getAllEgresos = () => axios.get('/egresos');
export const getEgresoId = (id) => axios.get(`/egresos?id=${id}`);
export const getEgresosByEmployee = (idEmpleado) => axios.get(`/egresos?idEmpleado=${idEmpleado}`);

