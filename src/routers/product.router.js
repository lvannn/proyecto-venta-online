'use stict'
const express = require ('express')
const {Router} = require ('express')
const {createProduct, listProduct, updateProduct, deleteProduct} = require('../controllers/product.controller')
const api = Router()

api.post('/add-product',createProduct)
api.get('/list-products', listProduct)
api.put('/edit-product/:id', updateProduct)
api.delete('/delete-product/:id', deleteProduct)

module.exports = api