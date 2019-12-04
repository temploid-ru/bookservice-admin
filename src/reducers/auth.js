import {AUTH__SET_DATA} from "../constants";

const initialState = {
    token: null
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH__SET_DATA:
            return {...action.payload};
        default:
            return state;
    }
}
