var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express({
    origin: 'http://localhost:5173/', // domain that can access the API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allowed methods; others will be blocked
    credentials: false, // indicates whether the request can include user credentials like cookies and HTTP auth
    optionsSuccessStatus: 200, // status code for successful OPTIONS requests (used by browsers during 'preflight')
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

var port = 9000;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'interface/dist')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/smart-garden-dev');

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
