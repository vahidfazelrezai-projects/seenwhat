// REQUIREMENTS //
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

// EXPRESS //
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // set public folder
app.set('view engine', 'html');	// set view engine as simple html reader
app.engine('html', function(path, options, cb) {
    fs.readFile(path, 'utf-8', cb);
});

// DATABASE //
var dbConfig = require('./server/config/database.js');
mongoose.createConnection(dbConfig.uri);

// PASSPORT //
require('./server/config/passport')(passport); // pass passport for configuration
app.use(session({
  secret: 'callthepoliceandthefireman',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ROUTES //
routes = require('./server/routes/routes')(passport); // load our routes and pass in our app and fully configured passport
app.use('/', routes);
app.use(function(err, req, res, next) {
    res.status(err.status || 500); // general error handler
});

// LAUNCH //
app.listen(port, function() {
    console.log("running at localhost:" + port);
});
module.exports = app;