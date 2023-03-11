'use strict'
const Category = require('../models/category.model')
const Product = require('../models/product.model')

const createCategory = async(req,res)=>{
    const {name} = req.body
    try{
        let category = await Category.findOne({name})
        if(category){
            return res.status(200).send({
                ok: false,
                message: 'categoria existente',
                category,
               
            })
        }
        category = new Category(req.body)
        category = await category.save()
        res.status(200).send({
            message: `${name} agregado correctamente`,
            ok : true,
            category
            
        })
    }catch(er){
        throw new Error(er)
    }
}

const listCategory = async (req,res)=>{
    try{
        const category = await Category.find()
        if(!category){
            res.status(400).send({
                message: 'no contamos con categorias'
            })
        }
        res.status(200).send({category})
    }catch(er){
        throw new Error(er)
    }
}




const addProduct = async (req,res)=>{
    try{
        const id = req.params.id
        const categoryedit = {...req.body}
        const categoryCom = await Category.findByIdAndUpdate(id, categoryedit, {new: true})

        if(categoryCom){
            return res.status(200).send({
                message: 'se actualizaron los datos',
                categoryCom
            })
        }
        res.status(400).send({
            message: 'error'
        })
    }catch(er){
        throw new Error(er)
    }

}

const deleteCategory = async (req,res)=>{
    try{
        const id = req.params.id
        const defaultCa = await Category.findOne({name: 'default'})
        await Product.updateMany(
            {category: id},
            {category: defaultCa._id}
        )

        const deleteCa = await Category.findByIdAndDelete(id)
        res.status(200).send({
            message: 'categoria eliminada'
        })
    }catch(er){
        throw new Error(er)
    }
}

const searchCategory = async(req, res) =>{
        const {name} = req.body;
        try{
            const sProduct = await Category.findOne({name});

            if(!sProduct){
                return res.status(404).send({message:'no se encontro la categoria'});
            }
            return res.status(200).json(sProduct)
        }catch(error){
            console.log(error);
        }

}



module.exports = {createCategory,listCategory,addProduct,deleteCategory,searchCategory}