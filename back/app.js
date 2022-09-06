var express = require('express')
var indexRouter = require('./routes/index')

var app = express()

app.use('/', indexRouter)

app.listen(5000)