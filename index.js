const express = require("express")
const app = express()
const {connection}= require('./src/db/connection')
require('dotenv').config()
const port = process.env.PORT
const routes = require('./src/routers/user.router')
const rp = require('./src/routers/product.router')
const rc = require('./src/routers/category.router')
const sc = require('./src/routers/shopping.router')

connection()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api',routes)
app.use('/api', rp)
app.use('/api', rc)
app.use('/api',sc)

app.listen(port, () =>{
    console.log(`el servidor funciona en el puerto: ${port}`)
})

