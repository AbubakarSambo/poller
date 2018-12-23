var express = require('express');
var bodyParser = require('body-parser');

// create express app
var cors = require('cors')
var app = express()

app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000

var dbConfig = require('./config/config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to the pollers API"});
});

require('./app/routes/index.js')(app);

// listen for requests
app.listen(port, function(){
    console.log(`Server is listening on port ${port}`);
});