// REACT-REDUX CONFIGURATION: ACTIONS 
// When using Redux to manage state, it is conventional to 
// centralise the available methods for changing state within
// the ./actions folder. 
// The dispatcher manages actions. So, below, methods that the dispatcher
// can execute are defined.
// The dispatcher service has abstracted business logic that
// handles monitoring actions and their effects.
// Simply put, React components call the action creators (functions below),
// which are registered with the Redux Store (its dispatcher),
// and actions are emitted (actions are dispatched to the store),
// where they are processed by the store's reducers.
// The Redux store manages actions in flight and notifies components of changes to
// state that have resulted from the actions, once they land.
// The Store passes these state changes to React components as props. 
// (e.g. a component accesses results of getItems action with this.props.getItems())
// 
// REDUX MIDDLEWARE: THUNK
// To manage async actions Thunk middleware is used.
// Usually an action creator returns an action object 
// (which is { type: 'TYPE', payload: ... }),
// But with Thunk, it returns a function, which accepts dispatch as an argument.
// When an action creator returns a function, 
// that function will get executed by the Redux Thunk middleware.
// That function doesn't need to be pure; it is thus allowed to have side effects,
// including executing asynchronous API calls. 
// 
// CURRYING IN REDUX
// The Redux middleware signature uses a triply nested function structure:
// const middleware = storeAPI => next => action => {}
// Redux was intended to use functional programming principles in its design.
// Currying functions like this creates closures where variables that exist
// for the lifetime of the middleware can be delared.
// (which could be considered a functional equivalent 
// to instance variables that exist for the lifetime of a class instance). 
// Finally, it's simply the approach that was chosen when Redux was initially designed.
// 
// AXIOS
// Front-end HTTP client Axios, makes a get request to back-end server ExpressJS
// when the end-user lands on the page and creates the getItems action.
// 
// When the end-user clicks on the "Add Item" button in the ItemModal (./components/ItemModal)
// the addItem action is created. This 

import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types.js'

// Below, a method of the dispatcher is defined.
// When a component calls the action, the dispatcher is returned.
// Thunk monitors actions in flight, and when it sees a function
// being returned rather than an action object, it intervenes
// and handles the functions execution and the notification to 
// subscribed React componets.
export const getItems = () => dispatch => {
    //set loading to true, default is false.
    dispatch(setItemsLoading());   
    axios
        // A proxy for the DB location is set in package.json 
        // Shorthand for items - app.use(/api/items) - is set in server.js
        // .get returns a promise, so we chain promises with .then, .catch, etc.
        .get('/api/items')    
        .then(res =>        
            dispatch({
                type: GET_ITEMS,
                //data that has come from the response (routes/api/items)
                payload: res.data   
            })
        )
        .catch(err => console.log(err));
};

export const addItem = item => dispatch => {
    axios
        .post('/api/items', item)
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};
        
export const deleteItem = id => dispatch => {
    axios
        .delete(`/api/items/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err => console.log(err));
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};

