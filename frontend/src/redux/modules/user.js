// imports

// actions

const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';
const SET_USER_LIST = "SET_USER_LIST";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_USER_PROFILE = "SET_USER_PROFILE";

// action creators

function saveToken(token, username) {
    return {
        type: SAVE_TOKEN,
        token,
        username
    }
}

function logout() {
    return {
        type: LOGOUT
    }
}

function setUserList(userList) {
    return {
        type: SET_USER_LIST,
        userList
    }
}

function setImageList(imageList) {
    return {
        type: SET_IMAGE_LIST,
        imageList
    }
}

function setFollowUser(username) {
    return {
        type: FOLLOW_USER,
        username
    }
}

function setUnfollowUser(username) {
    return {
        type: UNFOLLOW_USER,
        username
    }
}

function setUserProfile(userProfile) {
    return {
        type: SET_USER_PROFILE,
        userProfile
    }
}

// API actions

function facebookLogin(access_token){
    return dispatch => {
        fetch('/users/login/facebook/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_token
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token){
                dispatch(saveToken(json.token, json.user.username));
            }
        }) 
        .catch(err => console.log(err));
    }
}

function usernameLogin(username, password){
    return dispatch => {
        fetch("/rest-auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, 
                password
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token){
                dispatch(saveToken(json.token, json.user.username))
            }
        })
        .catch(err => console.log(err))
    }
}

function createAccount(username, password, email, name) {
    return dispatch => {
        fetch("/rest-auth/registration/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password1: password,
                password2: password,
                email,
                name
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.token) {
                dispatch(saveToken(json.token, json.user.username));
            }
        })
        .catch(err => console.log(err));
    };
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
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setUserList(json));
        });
    };
}

function followUser(username) {
    return (dispatch, getState) => {
        dispatch(setFollowUser(username));
        const { user: { token } } = getState();
        fetch(`/users/${username}/follow/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            } else if (!response.ok) {
                dispatch(setUnfollowUser(username));
            }
        });
    };
}

function unfollowUser(username) {
    return (dispatch, getState) => {
        dispatch(setUnfollowUser(username));
        const { user: { token } } = getState();
        fetch(`/users/${username}/unfollow/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(logout());
            } else if (!response.ok) {
                dispatch(setFollowUser(username));
            }
        });
    };
}

function getExplore() {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/users/explore/`, {
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            } 
            return response.json()
        })
        .then(json => dispatch(setUserList(json)));
    };
}

function searchByTerm(searchTerm){
    return async(dispatch, getState) => {
        const { user: { token } } = getState();
        const userList = await searchUsers(token, searchTerm);
        const imageList = await searchImages(token, searchTerm);
        if(userList === 401 || imageList === 401){
            dispatch(logout());
        }
        dispatch(setUserList(userList));
        dispatch(setImageList(imageList));
    }
}

function searchUsers(token, searchTerm){
    return fetch(`/users/search/?username=${searchTerm}`, {
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                return 401
            }
            return response.json()
        })
        .then(json => json)
}

function searchImages(token, searchTerm){
    return fetch(`/images/search/?hashtags=${searchTerm}`, {
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                return 401
            }
            return response.json()
        })
        .then(json => json)
}

function getUserProfile(username) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/users/${username}/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => dispatch(setUserProfile(json)));
    };
}

function getUserFollowers(username) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/users/${username}/followers/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setUserList(json));
        });
    }
}

function getUserFollowing(username) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/users/${username}/following/`, {
          method: "GET",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setUserList(json))
        });
    };
}

// initial state

const initialState = {
    isLoggedIn: localStorage.getItem('jwt') ? true : false,
    token: localStorage.getItem('jwt'),
    username: localStorage.getItem('username')
};

// reducer

function reducer(state = initialState, action) {
    switch(action.type){
        case SAVE_TOKEN:
            return applySetToken(state, action);
        case LOGOUT:
            return applyLogout(state, action);
        case SET_USER_LIST:
            return applySetUserList(state, action);
        case SET_IMAGE_LIST:
            return applySetImageList(state, action);
        case FOLLOW_USER:
            return applyFollowUser(state, action);
        case UNFOLLOW_USER:
            return applyUnfollowUser(state, action);
        case SET_USER_PROFILE:
            return applySetUserProfile(state, action);
        default: 
            return state;
    }
}

// reducer functions

function applySetToken(state, action){
    const { token } = action;
    const { username } = action;
    localStorage.setItem("jwt", token);
    localStorage.setItem('username', username);
    return {
        ...state, 
        isLoggedIn: true,
        token,
        username
    }
}

function applyLogout(state, action) {
    localStorage.removeItem('jwt');
    return {
        isLoggedIn: false
    }
}

function applySetUserList(state, action) {
    const { userList } = action;
    return {
        ...state, 
        userList
    };
}

function applySetImageList(state, action) {
    const { imageList } = action;
    return {
        ...state, 
        imageList
    };
}

function applyFollowUser(state, action) {
    const { username } = action;
    const { userList } = state;
    const updatedUserList = userList.map(user => {
        if(user.username === username){
            return { ...user, is_following: true };
        }
        return user;
    });
    return { ...state, userList: updatedUserList }
}

function applyUnfollowUser(state, action) {
    const { username } = action;
    const { userList } = state;
    const updatedUserList = userList.map(user => {
        if (user.username === username) {
            return { ...user, is_following: false };
        }
        return user;
    });
    return { ...state, userList: updatedUserList };
}

function applySetUserProfile(state, action) {
    const { userProfile } = action;
    return {
        ...state, 
        userProfile
    }
}

// exports

const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout,
    getPhotoLikes,
    followUser,
    unfollowUser,
    getExplore,
    searchByTerm,
    getUserProfile,
    getUserFollowers,
    getUserFollowing
}

export { actionCreators };

//reducer export

export default reducer;
