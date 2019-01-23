const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Items')

// @route   GET api/items  (from which end point we arrived, what route were in) 
// @desc    Get all items
// @acess   Public
router.get('/', (req, res) => {
    Item.find()     //execute find method on the model
        .sort({date: -1}) //descending
        .then(items => res.json(items)) //returns a promise and we use the res.json method to format the returned json data and return to the server
});



// @route   POST api/items  (from which end point we arrived, what route were in)
// @desc    Create a post
// @acess   Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name    //uses bodyParser to grab the name property from the JSON object that is created to the ItemSchema spec
    });
    //
    newItem.save().then(item => res.json(item));
 });
 




// @route   DELETE api/items  (from which end point we arrived, what route were in) 
// @desc    Delete a post
// @acess   Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;