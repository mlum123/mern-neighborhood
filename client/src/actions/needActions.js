import { GET_NEEDS, ADD_NEED, DELETE_NEED } from './types';

export const getNeeds = () => {
    return {
        type: GET_NEEDS
    };
};

export const deleteNeed = id => {
    return {
        type: DELETE_NEED,
        payload: id
    };
};

export const addNeed = need => {
    return {
        type: ADD_NEED,
        payload: need
    };
};