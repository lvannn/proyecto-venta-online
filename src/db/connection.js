'use strict'
require('dotenv').config()
const db = process.env.DB
const mongoose = require("mongoose")
mongoose.set("strictQuery", true)


const connection = async()=>{
    try{
        await mongoose.connect(db)
        console.log("conectado a la base de datos")
    }catch(error){
        console.log(error)
        throw new Error(error)

    }
}

module.exports = {connection}
