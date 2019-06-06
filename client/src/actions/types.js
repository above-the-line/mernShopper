// REDUX REDUCER
// Because Redux is managing state (see /store.js), we list the types below.
// So that the flags which notify the reducer to create the next state 
// are consistent, constants are used to reduce the chances of input-error with strings.

export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ITEMS_LOADING = 'ITEMS_LOADING';