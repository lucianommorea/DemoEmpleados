import { GET_EGRESOS_ID, POST_EGRESO, PUT_EGRESOS } from "../actions/actionTypes"

export default function egreso (state = {}, action){
    switch(action.type){
        case POST_EGRESO:
            return action.payload;
        case PUT_EGRESOS:
            return action.payload;
        case GET_EGRESOS_ID:
            return action.payload;
        default:
            return state            
    }
}