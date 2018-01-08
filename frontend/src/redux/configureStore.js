import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import user  from 'redux/modules/user';
import { composeWithDevTools } from 'redux-devtools-extension';
import { i18nState } from 'redux-i18n';

const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

if(env === "development"){
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

console.log(env);

const reducer = combineReducers({
    user, 
    routing: routerReducer,
    i18nState
})

let store;

if(env === 'development'){
    store = initialState => 
    createStore(
        reducer, 
        composeWithDevTools(applyMiddleware(...middlewares))
    );  
} else {
    store = initialState => 
    createStore(
        reducer, 
        applyMiddleware(...middlewares)
    );  
}

export { history };

export default store()