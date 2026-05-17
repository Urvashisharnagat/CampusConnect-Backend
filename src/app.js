const express = require('express')
const authroutes = require('./routes/auth.route')
const eventroutes = require('./routes/event.route')
const requestroute  =require('./routes/request.route')
const businessroute = require('./routes/business.routes')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authroutes)
app.use('/api/event',eventroutes)
app.use('/api/request',requestroute)
app.use('/api/business',businessroute)

module.exports = app