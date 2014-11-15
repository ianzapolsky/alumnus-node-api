// App

var express     = require('express');
var jwt         = require('jwt-simple');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var app         = express();
var router      = require('./router');
var jwtauth        = require('./middleware/jwtauth');
var requireAuth    = require('./middleware/requireauth');

// connect to database
mongoose.connect('localhost:27017/app');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(8000);
console.log('alumnus api running on port 8000');



