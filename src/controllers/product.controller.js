'use estrict'
const Product = require('../models/product.model')
const Category = require('../models/category.model')


const createProduct = async(req,res)=>{
    const {name, category} = req.body
    try{
        let product = await Product.findOne({name})
        let categoryProduct = await Category.findOne({category})
            if(!categoryProduct){
              return res.status(400).send({
                message: 'categoria no encontrada'
              })
            }
            if(product){
                return res.status(400).send({
                    ok: false,
                    message: 'producto ya existente',
                    product
                })
            }
            product = new Product(req.body)
            product = await product.save()
            res.status(200).send({
                message: `${name} agregado correctamente`,
                ok : true,
                product
            })

    }catch(er){
        throw new Error(er)
    }
}

const listProduct = async(req,res)=>{
    try{
        const product = await Product.find()
        if(!product){
            res.status(400).send({
                message: 'no contamos con productos en estos momentos'
            })
        }
        res.status(200).send({product})
    }catch(er){
        throw new Error(er)
    }
}

const updateProduct = async(req,res)=>{
    try{
        const id = req.params.id
        const productedit = {... req.body}
        const productComplete = await Product.findByIdAndUpdate(id, productedit,{new: true})
        if(productComplete){
            return res.status(200).send({
                message: 'se actualizaron los datos correctamente',
                productComplete
            })
        }
        res.status(400).send({message: 'error'})
    }catch(er){
        throw new Error(er)
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const id = req.params.id
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.status(200).send({message: 'producto eliminado correctamente'})
    }catch(er){
        throw new Error(er)
    }
}


module.exports = {createProduct, listProduct, updateProduct, deleteProduct}