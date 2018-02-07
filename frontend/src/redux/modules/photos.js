// import 

import { actionCreators as userActions } from 'redux/modules/user';

// actions

const SET_FEED = 'SET_FEED';
const LIKE_PHOTO = 'LIKE_PHOTO';
const UNLIKE_PHOTO = 'UNLIKE_PHOTO';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const SET_PHOTO_LIKES = 'SET_PHOTO_LIKES';

// action creators

function setFeed(feed){
    return {
        type: SET_FEED,
        feed
    }
}

function doLikePhoto(photoId){
    return {
        type: LIKE_PHOTO,
        photoId
    };
}

function doUnlikePhoto(photoId){
    return {
        type: UNLIKE_PHOTO,
        photoId
    };
}

function addComment(photoId, comment){
    return {
        type: ADD_COMMENT,
        photoId,
        comment
    }
}

function removeComment(photoId, messageId){
    return {
        type: DELETE_COMMENT,
        photoId,
        messageId
    };
}

function setPhotoLikes(photoId, likes) {
    return {
        type: SET_PHOTO_LIKES,
        photoId,
        likes
    };
}

// api actions

function getFeed(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch('/images/', {
            headers:{
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setFeed(json));
        });
    }
}

function likePhoto(photoId){
    return (dispatch, getState) => {
        dispatch(doLikePhoto(photoId));
        const { user: { token } } = getState();
        fetch(`/images/${photoId}/likes/`, {
            method: 'POST', 
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            } else if (!response.ok) {
                dispatch(doUnlikePhoto(photoId));
            }
        });
    }; 
}

function unlikePhoto(photoId){
    return (dispatch, getState) => {
        dispatch(doUnlikePhoto(photoId));
        const { user: { token } } = getState();
        fetch(`/images/${photoId}/unlikes/`, {
            method: 'DELETE', 
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            } else if (!response.ok) {
                dispatch(doLikePhoto(photoId));
            }
        });
    }; 
}

function commentPhoto(photoId, message){
    return (dispatch, getState) => {
        const {user: { token } } = getState();
        fetch(`/images/${photoId}/comments/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout())
            }
            return response.json()
        })
        .then(json => {
            if(json.message){
                dispatch(addComment(photoId, json)); 
            }
        })
    }
}

function getPhotoLikes(photoId) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/images/${photoId}/likes/`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setPhotoLikes(photoId, json));
        });
    }
}

// initial state

const initialState = {
    
};

// reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FEED: 
            return applySetFeed(state, action);
        case LIKE_PHOTO:
            return applyLikePhoto(state, action);
        case UNLIKE_PHOTO:
            return applyUnlikePhoto(state, action);
        case ADD_COMMENT:
            return applyAddComment(state, action);
        case SET_PHOTO_LIKES:
            return applyPhotoLikes(state, action);
        default:
            return state;
    }
}

// reducer functions

function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  };
}

function applyLikePhoto(state, action){
    const { photoId } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
        if(photo.id === photoId){
            return { ...photo, is_liked: true, like_count: photo.like_count + 1 };
        } 
        return photo;
    });
    return { ...state, feed: updatedFeed };
}

function applyUnlikePhoto(state, action){
    const { photoId } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
        if (photo.id === photoId) {
            return { ...photo, is_liked: false, like_count: photo.like_count - 1 };
        }
        return photo;
    });
    return { ...state, feed: updatedFeed };
}

function applyAddComment(state, action){
    const { photoId, comment } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
        if (photo.id === photoId) {
            return { 
                ...photo,
                comments: [...photo.comments, comment]  
            };
        }
        return photo;
    });
    return { ...state, feed: updatedFeed };
}

function applyPhotoLikes(state, action) {
    const { photoId, likes } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
        if (photo.id === photoId) {
            return {
                ...photo,
                likes
            };
        }
        return photo;
    });
    return { ...state, feed: updatedFeed };
}

// exports

const actionCreators = {
    getFeed,
    likePhoto,
    unlikePhoto,
    commentPhoto,
    getPhotoLikes
};

export { actionCreators }


// default reducer export

export default reducer;