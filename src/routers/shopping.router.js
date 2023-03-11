'use stict'
const express = require ('express')
const {Router} = require ('express')
const { createShopping, listShopping, deleteShopping, buyShopping } = require('../controllers/shopping.controller')
const api = Router()
api.post('/add-shopping',createShopping)
api.get('/list-shopping', listShopping)
api.delete('/delete-shopping/:id',deleteShopping)
api.post('/buy',buyShopping)


module.exports = api