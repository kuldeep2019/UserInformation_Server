"use strict"

require('rootpath')();
var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
var config = require('./config/config');
var session = require('express-session');
var app = express();
var passport = require('passport'); //used to setup configurations for oAuth
require('./config/passport')(passport); // pass passport for configuration
const port = config.port
app.use(cors())
app.use(bodyparser.json())
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use('/api/users',require('./controllers/svr.user.controller'))
require('./controllers/loginWithOAuth.controller.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/',(req,res)=>{
    res.send('footer')
})
app.listen(port,() => {
    console.log("Server started at port:"+port)
})