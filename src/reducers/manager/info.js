import {INFO__SET_DATA} from "../../constants/manager";

const initialState = null;

export default function info(state = initialState, action) {
    switch (action.type) {
        case INFO__SET_DATA:
            return {...action.payload};
        default:
            return state;
    }
}
