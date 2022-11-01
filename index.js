//----------- Importing Modules -----------//
const express = require('express');
const PORT =  7000;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const db = require('./config/mongoose');

const app = express();





// setting up view engine and its layout
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use("/assets", express.static('./assets'));


// adding a body parser
app.use(express.urlencoded());

// Create a session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


// adding flash messeges
app.use(flash());

// adding Global Variables for flash messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// add routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));




// creating server
app.listen(PORT, function(err){
    if(err){
        console.log(`Error in connecting the server ${err}`);
    }
    console.log(`Server is running on port ${PORT}`)
});

