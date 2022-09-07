var express = require('express')
var indexRouter = require('./routes/index')
var adminRouter = require('./routes/admin')

var app = express()

app.use('/', indexRouter)
app.use('/admin', adminRouter)

app.listen(5000)