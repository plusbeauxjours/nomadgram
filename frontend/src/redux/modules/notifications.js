// import

import { actionCreators as userActions } from 'redux/modules/user';

// actions

const SET_NOTIFICATION = "SET_NOTIFICATION";

// action creators

function setNotification(notification){
    return {
        type: SET_NOTIFICATION,
        notification
    }
}

// API actions

function getNotification(){
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch('/notifications/', {
            method: "GET",
            headers:{
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setNotification(json)));
    };
}

// initial state

const initialState = {

};

// reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_NOTIFICATION:
            return applySetNotification(state, action);
        default:
            return state;
    }
}

// reducer functions

function applySetNotification(state, action){
    const { notification } = action;
    return {
        ...state, 
        notification
    }
}

// exports

const actionCreators = {
    getNotification
}

export { actionCreators };

// default reducer export

export default reducer;