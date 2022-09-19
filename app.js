/**
 * root router
 */
import express from 'express'
import indexRouter from './routes/index.js'
import adminRouter from './routes/admin.js'
import firebaseRouter from './service/firebase.js'
import * as createUser from './service/createUser.js'

var app = express()

app.use('/', indexRouter)
app.use('/admin', adminRouter)
app.use('/firebase', firebaseRouter)
app.use(createUser)

app.listen(5000)