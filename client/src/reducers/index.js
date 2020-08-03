import { combineReducers } from 'redux';
import needReducer from './needReducer';

export default combineReducers({
    need: needReducer
});