// THE REDUX REDUCER
// Usually, React apps using Redux are so complex that they
// require a number of separate reducers to manage distinct
// parts of the state tree.
// combineReducers is passed an object that specifies
// to which function it should delegate each property
// of the state object. 
// The state object is defined below with one property, item.

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer
});