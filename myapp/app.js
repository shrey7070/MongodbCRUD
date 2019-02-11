var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose=require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload=require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeeRouter=require('./routes/employee');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'),
path.join(__dirname, 'views/Employee/'), 
path.join(__dirname, 'views/Student/')]);

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

//Database Connection
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true},function(err){
    if(err)  
      console.log('Error');  
    else
      console.error('connection successfull');
    
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',employeeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



