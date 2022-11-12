import { GET_ALL_INGRESOS, GET_INGRESOS_EMPLOYEE } from "../actions/actionTypes"

export default function ingresos (state = [], action){
    switch(action.type){
        case GET_ALL_INGRESOS:
            return action.payload;
        case GET_INGRESOS_EMPLOYEE:
            return action.payload;
        default:
            return state            
    }
}