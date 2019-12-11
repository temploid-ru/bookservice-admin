import { combineReducers } from 'redux';

import auth from './auth';
import bookingInfo from './manager/booking-info';
import info from './manager/info';
import showDate from './manager/show-date';

export const reducer = combineReducers({
    auth,

    bookingInfo,
    info,
    showDate,
});
