import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_STATUS, GET_EMPLOYEES_NAME, GET_EMPLOYEE_ID_SEARCH, GET_ALL_ACTIVE_EMPLOYEES, GET_ACTIVE_EMPLOYEES_NAME, GET_ACTIVE_EMPLOYEE_ID_SEARCH, GET_ACTIVE_EMPLOYEES_STATUS, CLEAN_EMPLOYEES, GET_ALL_INACTIVE_EMPLOYEES, GET_INACTIVE_EMPLOYEES_NAME, GET_INACTIVE_EMPLOYEE_ID_SEARCH } from "../actions/actionTypes"

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
        case GET_ALL_ACTIVE_EMPLOYEES:
            return action.payload;
        case GET_ACTIVE_EMPLOYEES_NAME:
            return action.payload;
        case GET_ACTIVE_EMPLOYEE_ID_SEARCH:
            return action.payload;
        case GET_ACTIVE_EMPLOYEES_STATUS:
            return action.payload;
        case GET_ALL_INACTIVE_EMPLOYEES:
            return action.payload;
        case GET_INACTIVE_EMPLOYEES_NAME:
            return action.payload;
        case GET_INACTIVE_EMPLOYEE_ID_SEARCH:
            return action.payload;
        case CLEAN_EMPLOYEES:
            return [];
        default:
            return state            
    }
}