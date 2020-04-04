"use strict"

require('rootpath')();
var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
var config = require('./config/config.json');
var session = require('express-session');
var app = express();

const port = config.port
app.use(cors())
app.use(bodyparser.json())
app.use('/api/users',require('./controllers/svr.user.controller'))

app.get('/',(req,res)=>{
    res.send('footer')
})
app.listen(port,() => {
    console.log("Server started at port:"+port)
})