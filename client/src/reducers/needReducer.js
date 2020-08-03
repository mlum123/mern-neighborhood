import {v4 as uuid} from 'uuid';
import { GET_NEEDS, ADD_NEED, DELETE_NEED } from '../actions/types';

const initialState = {
    needs: [
        { id: uuid(), name: 'Grocery Shopper'},
        { id: uuid(), name: 'Yeast'},
        { id: uuid(), name: 'Flour'},
        { id: uuid(), name: 'Dog Walker'}
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NEEDS:
            return {
                ...state
            }
        case DELETE_NEED:
            return {
                ...state,
                needs: state.needs.filter(need => need.id !== action.payload)
            }
        case ADD_NEED:
            return {
                ...state,
                needs: [action.payload, ...state.needs]
            }
        default:
            return state;
    }
}