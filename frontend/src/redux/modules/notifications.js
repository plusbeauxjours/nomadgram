// import

import { actionCreators as userActions } from 'redux/modules/user';

// actions

const NOTI_SET_NOTIFICATION = "NOTI_SET_NOTIFICATION";
const NOTI_FOLLOW_USER = "NOTI_FOLLOW_USER";
const NOTI_UNFOLLOW_USER = "NOTI_UNFOLLOW_USER";

// action creators

function setNotification(notificationList){
    return {
        type: NOTI_SET_NOTIFICATION,
        notificationList
    }
}

function setNotiFollowUser(userId) {
    return {
        type: NOTI_FOLLOW_USER,
        userId
    }
}

function setNotiUnfollowUser(userId) {
    return {
        type: NOTI_UNFOLLOW_USER,
        userId
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

function notiFollowUser(userId) {
    return (dispatch, getState) => {
        dispatch(setNotiFollowUser(userId));
        const { user: { token } } = getState();
        fetch(`/users/${userId}/follow/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(userActions.logout());
            } else if (!response.ok) {
                dispatch(setNotiUnfollowUser(userId));
            }
        });
    };
}

function notiUnfollowUser(userId) {
    return (dispatch, getState) => {
        dispatch(setNotiUnfollowUser(userId));
        const { user: { token } } = getState();
        fetch(`/users/${userId}/unfollow/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            } else if (!response.ok) {
                dispatch(setNotiFollowUser(userId));
            }
        });
    };
}

// initial state

const initialState = {

};

// reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case NOTI_SET_NOTIFICATION:
            return applySetNotification(state, action);
        case NOTI_FOLLOW_USER:
            return applyNotiFollowUser(state, action);
        case NOTI_UNFOLLOW_USER:
            return applyNotiUnfollowUser(state, action);
        default:
            return state;
    }
}

// reducer functions

function applySetNotification(state, action){
    const { notificationList } = action;
    return {
        ...state,
        notificationList
    }
}

function applyNotiFollowUser(state, action) {
    const { userId } = action;
    const { notificationList } = state;
    const updatedNotificationList = notificationList.map(user => {
        if(user.creator.id === userId){
            return { ...user, following: true };
        }
        return user;
    });
    return { ...state, notificationList: updatedNotificationList }
}

function applyNotiUnfollowUser(state, action) {
    const { userId } = action;
    const { notificationList } = state;
    const updatedNotificationList = notificationList.map(user => {
        if (user.creator.id === userId) {
            return { ...user, following: false };
        }
        return user;
    });
    return { ...state, notificationList: updatedNotificationList };
}

// exports

const actionCreators = {
    getNotification,
    notiFollowUser,
    notiUnfollowUser
}

export { actionCreators };

// default reducer export

export default reducer;
