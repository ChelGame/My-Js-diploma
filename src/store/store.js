import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {loginReducer} from '../reducers/loginReducer';
import {imageReducer} from '../reducers/imageReducer';

let reducers = combineReducers({
    loginReducer,
    imageReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
