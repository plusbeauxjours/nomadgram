import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import users from 'redux/modules/users';

const middlewares = [thunk];    // 후에 middleware를 계속 추가 할 것이다. 

const reducer = combineReducers({
    users,
})



let store = initialState => createStore(reducer, applyMiddleware(...middlewares));  // applyMiddleware(middlewares)를 하면 list of function이 아니라 array가 applyMiddleware에 담긴다. 그 것은 옳지 않다. ...middleware를 쓰면 unpack을 할 수 있다. (풀 수 있다)

export default store()