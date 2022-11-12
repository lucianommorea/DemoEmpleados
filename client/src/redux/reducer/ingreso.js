import { GET_INGRESOS_ID, POST_INGRESO, PUT_INGRESOS} from "../actions/actionTypes"

export default function ingreso (state = {}, action){
    switch(action.type){
        case POST_INGRESO:
            return action.payload;
        case PUT_INGRESOS:
            return action.payload;
        case GET_INGRESOS_ID:
            return action.payload;
        default:
            return state            
    }
}