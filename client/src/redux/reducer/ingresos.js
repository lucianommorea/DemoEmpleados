import { CLEAN_INGRESOS, GET_ALL_INGRESOS, GET_INGRESOS_EMPLOYEE } from "../actions/actionTypes"

export default function ingresos (state = [], action){
    switch(action.type){
        case GET_ALL_INGRESOS:
            return action.payload;
        case GET_INGRESOS_EMPLOYEE:
            return action.payload;
        case CLEAN_INGRESOS:
            return [];
        default:
            return state            
    }
}