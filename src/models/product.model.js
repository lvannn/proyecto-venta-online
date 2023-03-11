'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchemaProduct = Schema({
    name: String,
    category : [{
        type : Schema.Types.ObjectId,
         ref: 'categories',
    
    }],
    description : String,
    stock: {
        type: Number,
        required: true
    },
    price: Number
})

module.exports = mongoose.model("products", SchemaProduct)