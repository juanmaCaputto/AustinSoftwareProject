const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/proyectoAustin')
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

//initialize routes
app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
    res.send({error: err.message});
});

// listen for requests, defining port
app.listen(process.env.PORT || 4000, function(){
    console.log("Now listening for requests...");
});