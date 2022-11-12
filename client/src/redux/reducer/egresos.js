import { GET_ALL_EGRESOS, GET_EGRESOS_EMPLOYEE } from "../actions/actionTypes"

export default function egresos (state = [], action){
    switch(action.type){
        case GET_ALL_EGRESOS:
            return action.payload;
        case GET_EGRESOS_EMPLOYEE:
            return action.payload;
        default:
            return state            
    }
}