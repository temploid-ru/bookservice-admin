import {SHOW_DATE__SET} from "../../constants/manager";
import moment from "moment";

const initialState = {
    activeDate: moment().startOf('day').format(),
    currentDate: moment().startOf('day').format(),
};

export default function showDate(state = initialState, action) {
    switch (action.type) {
        case SHOW_DATE__SET:
            return action.payload;
        default:
            return state;
    }
}
