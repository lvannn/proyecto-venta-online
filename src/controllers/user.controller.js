'use strict'
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { generateJWT} = require('../helpers/create-jwt')


const createUser = async (req,res)=>{
    const{name,email,password}= req.body
    try{
       let user = await User.findOne({email: email})
       if(user){
        return res.status(400).send({
            ok: false,
            message: 'correo ya utilizado',
            user: user
        })
       }
       user = new User(req.body)
       const saltos = bcrypt.genSaltSync()
       user.password = bcrypt.hashSync(password, saltos)
       user = await user.save()
       res.status(200).send({
        message: `hola ${name} bievenido`,
            ok: true,
            usuario: user,
    });

    }catch(er){
        throw new Error(er)
    }
}

const listUser = async   (req,res)=>{
        try{
            const users = await User.find()
            if(!users){
                res.status(400).send({
                    message: 'no contamos con usarios en este momento :('
                })
            }
            res.status(200).send({users: users})
        }catch(er){
            throw new Error(er)
        } 
    
}

const updateUser = async(req,res)=>{
    try{
        const id = req.params.id
        const useredit = {...req.body}
        useredit.password = useredit.password
        ? bcrypt.hashSync(useredit.password, bcrypt.genSaltSync())
        : useredit.password
        const usercomplete = await User.findByIdAndUpdate(id, useredit,{new: true})

        if(usercomplete){
            return res.status(200).send({message:'se actualizaron los datos', usercomplete})
        }
        res.status(400).send({message: 'ocurrrio un error'})
    }catch(er){
        throw new Error(er)
    }
}

const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id
        const deleteuser = await User.findByIdAndDelete(id)
        res.status(200).send({message: 'usuario eliminado'})
    }catch(er){
        throw new Error(er)
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body
    try{
       const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({
                ok: false,
                message: 'el usuario no existe'
            })
        }
        const validPassword = bcrypt.compareSync(
            password, user.password
        )
        if(!validPassword){
            return res.status(400).send({
                message: ' constraseña incorrecta'
            })
        }
        
        const token = await generateJWT(user.id, user.name, user.email)
        res.send({
        ok: true,
        uid: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol,
        token,
        })
      
    }catch(er){
        throw new Error(er)
    }

}

module.exports = {createUser, listUser, updateUser, deleteUser, login}