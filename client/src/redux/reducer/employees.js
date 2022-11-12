import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_STATUS, GET_EMPLOYEES_NAME, GET_EMPLOYEE_ID_SEARCH } from "../actions/actionTypes"

export default function employees (state = [], action){
    switch(action.type){
        case GET_ALL_EMPLOYEES:
            return action.payload;
        case GET_EMPLOYEES_STATUS:
            return action.payload;
        case GET_EMPLOYEES_NAME:
            return action.payload;
        case GET_EMPLOYEE_ID_SEARCH:
            return action.payload;
        default:
            return state            
    }
}