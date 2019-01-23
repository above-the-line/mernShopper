import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types.js'



export const getItems = () => dispatch => {
    dispatch(setItemsLoading());   //set loading to true, default is false
    axios
        .get('/api/items')    //in package.json we set a proxy for the DB location --also in server.js we set a short hand for items with app.use(/api/items)
        .then(res =>        //.get returns a promise, so we chain another promise with .then
            dispatch({
                type: GET_ITEMS,
                payload: res.data   //data that comes from the response (routes/api/items)
            })
        )
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
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};

