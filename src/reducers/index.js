import { combineReducers } from 'redux';

import auth from './auth';
import tablesList from './tablesList';

export const reducer = combineReducers({
    auth,
    tablesList,
});
