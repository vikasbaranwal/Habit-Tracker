// require the library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/habit_tracker');

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//check if error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the database:: MongoDB');
});

module.exports= db;