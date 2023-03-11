'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = Schema({
    name: String,
    email: String,
    password: String,
    rol: {
        type: String,
        required: false,
        default: 'cliente'
    },

    
})

module.exports = mongoose.model("users", UserSchema)