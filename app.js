// App

var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var app         = express();
var router      = require('./router');

// connect to database
mongoose.connect('localhost:27017/app');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(8000);
console.log('alumnus api running on port 8000');



