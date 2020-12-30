import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import movieReducer from './reducers/movieReducer';
import tvReducer from './reducers/tvReducer';

const reducers = combineReducers({ movieReducer, tvReducer });
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
