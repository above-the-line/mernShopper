// THE REDUX REDUCER
// 
// As described in notes within ./store.js and ./app.js, 
// when the dispatcher notifies the store that an action
// has been completed, the store's reducer creates
// a copy of the existing state and appends it with the new state.
// The state is passed to the components as props.

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types.js'

const initialState = {
    items: [],
    loading: false
}

export default function(state= initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }    
}