'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchemaCategory = Schema({
    name: String,
    product : [{
        type : Schema.Types.ObjectId, ref: "products",
        required : false
    }]
})

module.exports = mongoose.model('categories', SchemaCategory)