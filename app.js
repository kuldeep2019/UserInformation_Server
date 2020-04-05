"use strict"

require('rootpath')();
var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
var fs = require('fs');
var config = require('./config/config');
var session = require('express-session');
var app = express();
var spdy = require('spdy');
var passport = require('passport'); //used to setup configurations for oAuth
require('./config/passport')(passport); // pass passport for configuration
// const port = config.port

var credentials = {
    key: fs.readFileSync('../certs/key.pem'),
    cert: fs.readFileSync('../certs/cert.pem'),
    ca: fs.readFileSync('../certs/csr.pem'),
    spdy: {
        protocols: ['h2', 'spdy/3.1', 'http/1.1']
    }
};
app.use(cors())
app.use(bodyparser.json())
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use('/api/users',require('./controllers/svr.user.controller'))
require('./controllers/loginWithOAuth.controller.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.use('/api/uploads',require('./controllers/fileOperations.controller'));
app.use('/api/googleUserInfo',require('./controllers/googleUserInfo.controller'));
app.use('/api/fileOperations',require('./controllers/fileOperations.controller'));
app.use('/aadharFiles', express.static(__dirname + '/aadharFiles'));
app.get('/',(req,res)=>{
    res.send('footer')
})
app.get('/get',(req,res)=>{
    console.log("server")
    res.send("send")
})
var server = spdy.createServer(credentials, app);
const port = process.env.PORT || config.port;
server.listen(port);
console.log("Server listening on https://", port);
// app.listen(port,() => {
//     console.log("Server started at port:"+port)
// })