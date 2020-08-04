import { combineReducers } from 'redux';
import needReducer from './needReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    need: needReducer,
    error: errorReducer,
    auth: authReducer
});