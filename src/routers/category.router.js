'use stict'
const express = require ('express')
const {Router} = require ('express')
const {createCategory, listCategory, deleteCategory, searchCategory, addProduct, } = require('../controllers/category.controller')
const api = Router()
const {validateJWT} = require('../middlewares/validate-jwt')
api.post('/add-category',validateJWT,createCategory)
api.get('/list-category', listCategory)
api.put('/addProduct-category/:id',validateJWT,addProduct)
api.delete('/delete-category/:id',validateJWT, deleteCategory)
api.get('/search',searchCategory)

module.exports = api