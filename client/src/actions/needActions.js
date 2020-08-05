import { GET_NEEDS, ADD_NEED, DELETE_NEED, NEEDS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getNeeds = () => dispatch => {
    dispatch(setNeedsLoading());

    axios
        .get('/api/needs')
        .then(res =>
            dispatch({
                type: GET_NEEDS,
                payload: res.data
            }))
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.data))
            );
};

export const addNeed = need => (dispatch, getState) => {
    axios
        .post('/api/needs', need, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_NEED,
                payload: res.data
            }))
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.data))
            );
};

export const deleteNeed = id => (dispatch, getState) => {
    axios
        .delete(`/api/needs/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_NEED,
                payload: id
            }))
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.data))
            );
};

export const setNeedsLoading = () => {
    return {
        type: NEEDS_LOADING
    };
};