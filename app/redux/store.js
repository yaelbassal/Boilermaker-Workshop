import {createStore, applyMiddleware} from 'redux';
import nePineReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  nePineReducer,
  applyMiddleware(thunkMiddleware,
    createLogger())
);

export default store;

