'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoppingCSchema = mongoose.Schema({
    name:{
        type : Schema.Types.ObjectId, ref: 'products',
        required : true
    },
    username:{
        type: String, 
        required: true
    }, 

    howmany:{
        type: Number,
        required: true
    }
})
    module.exports = mongoose.model('shopping',shoppingCSchema)