require('dotenv').config();
let express = require('express');
let path = require('path');
let createError = require("http-errors");
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let passport = require('passport');

const indexRouter = require('./routes/index');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ?
        err :
        {};
    
    // render the error page
    res.status(err.status || 500).json(err);
});

module.exports = app;
