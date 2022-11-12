import { combineReducers } from "redux";
import egreso from "./egreso";
import egresos from "./egresos";
import ingreso from "./ingreso";
import ingresos from "./ingresos";
import employee from "./employee";
import employees from "./employees";


export default combineReducers({
    egreso,
    egresos,
    employee,
    employees,
    ingreso,
    ingresos
});