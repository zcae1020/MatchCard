/**
 * root router
 */
import express from 'express'
import indexRouter from './routes/index.js'
import adminRouter from './routes/admin.js'
//import loginRouter from './controller/auth/login.js'
import signupRouter from './controller/auth/signup.js'
import cors from 'cors'

var app = express()

app.use('/', signupRouter)
app.use('/admin', adminRouter)

app.listen(5000)