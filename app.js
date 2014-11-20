// App

var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var app         = express();
var router      = require('./router');
var crossOrigin = require('./middleware/cross-origin');

// connect to database
mongoose.connect('localhost:27017/app');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(crossOrigin);
app.use('/api', router);

app.listen(8000);
console.log('alumnus api running on port 8000');



