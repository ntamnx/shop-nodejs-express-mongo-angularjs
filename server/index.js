/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 27, 2017, 9:01:16 AM
 Author     : nguyen.xuan.tam
 */

var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database'); // get db config file
var port = process.env.PORT || 4444;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', '../client');
app.use(express.static('../client'));
app.listen(port);
console.log('connect: ' + port);
mongoose.connect(config.database);
// pass passport for configuration
require('./config/passport')(passport);
app.use('/api/auth', require('./app/controller/auth'));
app.use('/api/member', require('./app/controller/member'));
app.use('/api/category', require('./app/controller/category'));
app.use('/api/superlier', require('./app/controller/superlier'));
app.use('/api/customer', require('./app/controller/customer'));
