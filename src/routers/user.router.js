'use stict'
const express = require ('express')
const {Router} = require ('express')
const {createUser, listUser, updateUser, deleteUser, login} = require('../controllers/user.controller')
const api = Router()
const {validateJWT} = require('../middlewares/validate-jwt')

api.post('/create-user', createUser)
api.get('/list',validateJWT,listUser)
api.put('/edit-user/:id', validateJWT, updateUser)
api.delete('/delete-user/:id',validateJWT, deleteUser)
api.post('/login',login)

module.exports = api
    