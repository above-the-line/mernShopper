// THE REDUX STORE
// Even though Redux state management is not necessary in an app of such simplicity,
// the Redux library is used here to practice.
// In Redux, application state is contained in a single, immutable object within
// the Rexux store. As soon as the store receives an action it triggers a reducer,
// which returns the next state.
// A reducer function takes two parameters: 
// the current state and an action (the change), and creates a new state.
// The new state is a copy of the old state, plus changes.
// This maintains immutable state and allows you to "go back in time".
// Redux state is passed to components as props.
// 
// MIDDLEWARE
// The store is registered with Thunk.
// It combines the reducers, the initial state, middleware and final line
// needed for debugging.
// See (./actions/itemActions.js) for notes on how Thunk works.

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// createStore takes a reducer as the first argument and in our case we passed in rootReducer 
const store = createStore(
 rootReducer,
 initialState,
 compose(
    applyMiddleware(...middleware),
    window._REDUX_DEVTOOLS_EXTENSION_ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
 )   
);

export default store;