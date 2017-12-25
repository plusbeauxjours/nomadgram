import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import users from 'redux/modules/users';

const env = process.env.NODE_ENV;

const middlewares = [thunk];

if(env === "development"){
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

console.log(env);

const reducer = combineReducers({
    users,
})

let store = initialState => createStore(reducer, applyMiddleware(...middlewares));  

export default store()