// This is a simple RESTful ExpressJS Server with one route.
// BodyParser middleware extracts commands from 
// incoming Axios HTTP client JSON messages.
// Request strings (not screened for any security compromises!) are
// used to create items in the associated Mongo database. 
// Since SQL is not being used to interact with the database,
// in order to keep as much of the app in JavaScript as possible,
// the Mongoose ORM is used to convert JS commands into SQL.
// See /models/Items.js for the schema definition.


'use strict';

const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const path = require('path')

const app = express();

// ExpressJS Routes
const ITEMS = require('./routes/api/items.js'); 

// BodyParser Middleware
app.use(bodyParser.json());  

// DB Config
const DATABASE = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
   .connect(
       DATABASE,
       { useNewUrlParser: true}
   )
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));

// Have ExpressJS register the api/items endpoint
// So that it routes traffic headed for items to the javaScript in the items file.  
app.use('/api/items', ITEMS)

// If in production mode do not route to Webpack-dev-server for serving of front-end.
// Instead, Express will serve static content.
if(process.env.NODE_ENV === 'production'){
    // Set static folder (minified/built React project)
    app.use(express.static('client/build'));
    // Serve the index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

//PORT on which app will run
const PORT = process.env.PORT || 5000;

//Use the ExpressJS method to start the server and have it listen on port 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));