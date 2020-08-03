import { GET_NEEDS, ADD_NEED, DELETE_NEED, NEEDS_LOADING } from './types';
import axios from 'axios';

export const getNeeds = () => dispatch => {
    dispatch(setNeedsLoading());

    axios
        .get('/api/needs')
        .then(res =>
            dispatch({
                type: GET_NEEDS,
                payload: res.data
            })
        )
};

export const addNeed = need => dispatch => {
    axios
        .post('/api/needs', need)
        .then(res =>
            dispatch({
                type: ADD_NEED,
                payload: res.data
            })
        )
};

export const deleteNeed = id => dispatch => {
    axios
        .delete(`/api/needs/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_NEED,
                payload: id
            })
        )
};

export const setNeedsLoading = () => {
    return {
        type: NEEDS_LOADING
    }
}