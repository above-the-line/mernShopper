// EXPRESS JS ROUTING
// To respond to the requests being sent from the
// Axios HTTP client, this app uses promise based ExpressJS.
// The express.Router class is used to create modular, 
// mountable RESTful route handlers. 
// A route-handler is a call-back function called when
// the app recieves a call to particular end point. 
// In the code below a router is created as a module,
// a middleware function is loaded into it,
// some routes are defined, and finally the router module is mounted
// on a path in the main app.

const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Items')

// @route   GET api/items  (came from the GET endpoint to the items route)
// @desc    Get all items 
// @access   Public
router.get('/', (req, res) => {
    Item.find()     //execute find method on the model, returns a promise
        .sort({date: -1}) //descending
         //convert every item to JSON
        .then(items => res.json(items))
        .catch(err => console.log(err))
});

// @route   POST api/items  (came from the GET endpoint to the items route)
// @desc    Create a post
// @access   Public
router.post('/', (req, res) => {
    const newItem = new Item({
        //bodyParser parses name property from JSON object created to ItemSchema spec
        name: req.body.name    
    });
    newItem.save().then(item => res.json(item));
 });

// @route   DELETE api/items  (came from the DELETE endpoint to the items route)
// @desc    Delete a post
// @access   Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;