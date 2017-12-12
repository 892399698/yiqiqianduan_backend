var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var routes = require('./routes/index');
var spa = require('./routes/spa');
var users = require('./routes/users');
var backend = require('./routes/backend');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(cookieParser('yiqiqianduan admin manager'));
app.use(session({
    secret: 'yiqiqianduan admin manager',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);
app.use('/spa', spa);
app.use('/backend', backend);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3332, function () {
    console.log('Example app listening at http://%s:%s', 3332);
});

module.exports = app;