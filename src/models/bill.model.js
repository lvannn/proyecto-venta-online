'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const billSchema = Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId, 
                       ref: "shopping"
         
     }, 
    username:{
        type: String, 
        required: true
    }, 
    
    total: Number

})
 module.exports= mongoose.model('bill', billSchema);