import { GET_NEEDS, ADD_NEED, DELETE_NEED, NEEDS_LOADING } from '../actions/types';

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
        case NEEDS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}