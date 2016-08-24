// set up
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js');

// configuration for database
mongoose.connect(configDB.url);

// configuration for passport
require('./config/passport')(passport);

app.configure(function () {

    // set up our express application
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());

    app.set('view engine', 'ejs');
    
    app.use(express.static('public'));

    // required for passport
    app.use(express.session({
        secret: 'chbu6523mcfrw0f4ta6621an4dhhru16siw91'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

});

// add routes
require('./app/routes.js')(app, passport);

// add api
require('./app/api.js')(app);

// start the server
app.listen(port);
console.log('The catalog server running on port ' + port);