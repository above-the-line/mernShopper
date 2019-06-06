// Since SQL is not being used to interact with the database,
// in order to keep as much of the app in JavaScript as possible,
// the Mongoose ORM is used to convert JS commands into SQL.
// 
// The Mongo database schema, defining the properties (the column names)
// that an entity will have, is specified below. 
// Each row in the database is a new entity
// Each column is a field.
// No ORM or UML diagram exists for this app.


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// export the model to Express, creating a database interface for the application. 
module.exports = Item = mongoose.model('item', ItemSchema);