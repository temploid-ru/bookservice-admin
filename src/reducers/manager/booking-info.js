import {BOOKING__SET_DATA} from "../../constants/manager";

const initialState = null;

export default function bookingInfo(state = initialState, action) {
    switch (action.type) {
        case BOOKING__SET_DATA:
            return [...action.payload];
        default:
            return state;
    }
}
