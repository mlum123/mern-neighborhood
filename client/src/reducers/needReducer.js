import { GET_NEEDS, ADD_NEED, DELETE_NEED, NEEDS_LOADING, ADD_USER_NEED } from '../actions/types';
import store from '../../src/store';

const initialState = {
    needs: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NEEDS:
            return {
                ...state,
                needs: action.payload,
                loading: false
            }
        case DELETE_NEED:
            return {
                ...state,
                needs: state.needs.filter(need => need._id !== action.payload)
            }
        case ADD_NEED:
            return {
                ...state,
                needs: [action.payload, ...state.needs]
            }
        case ADD_USER_NEED:
            return {
                ...store.getState().authReducer.user,
                needs: [action.payload, ...state.user.needs]
            }
        case NEEDS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}