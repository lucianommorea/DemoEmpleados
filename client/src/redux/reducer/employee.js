import { GET_EMPLOYEE_ID, POST_EMPLOYEE, PUT_EMPLOYEE_ACTIVITY, PUT_EMPLOYEE_INFO} from "../actions/actionTypes"

export default function employee (state = {}, action){
    switch(action.type){
        case POST_EMPLOYEE:
            return action.payload;
        case PUT_EMPLOYEE_INFO:
            return action.payload;
        case PUT_EMPLOYEE_ACTIVITY:
            return action.payload;
        case GET_EMPLOYEE_ID:
            return action.payload;
        default:
            return state            
    }
}