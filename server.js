'use strict';

const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const path = require('path')


const app = express();

//Routes
const ITEMS = require('./routes/api/items.js'); 



// BodyParser Middleware
app.use(bodyParser.json());  // to support JSON-encoded bodies


//DB Config
const DATABASE = require('./config/keys').mongoURI;

// Connect to DB
mongoose
   .connect(
       DATABASE,
       { useNewUrlParser: true}
   )
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));

// api/items ENDPOINT: ROUTE traffic headed for items to the ITEMS file  
// tell express to register the route
app.use('/api/items', ITEMS)



// If in production mode do not route to Webpack-dev-server for serving of front-end
// Express serve static content instead
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

//Use the Express method for listening, to start the server (listening) on that port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));