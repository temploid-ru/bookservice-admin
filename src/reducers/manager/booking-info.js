import {BOOKING__SET_DATA} from "../../constants/manager";

const initialState = {};

export default function bookingInfo(state = initialState, action) {
    switch (action.type) {
        case BOOKING__SET_DATA:
            return {...state, ...action.payload};
        default:
            return state;
    }
}
