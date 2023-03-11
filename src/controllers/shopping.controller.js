'use strict'
const Product = require('../models/product.model')
const Cart = require('../models/shoppingcart.model')
const Bill = require('../models/bill.model')

const createShopping = async(req,res)=>{
    const {name,howmany} = req.body
    // esto es para ver si tenemos el Producto a solicitar
    const estaProduct = await Product.findOne({_id: name})
    //esto es para ver si ya esta en el carrito
    const estaCart = await Cart.findOne({
        $and: [
            {name},

        ]         
    })

    if(!estaProduct){
        return res.status(400).send({
            message : 'producto no encontrado'
        })
    } else if(!estaCart){   
        const newProductCart = new Cart(req.body)
        await Product.findByIdAndUpdate(estaProduct?._id,{stock: estaProduct.stock-howmany}
            ,{new: true}).then((product)=>{
                newProductCart.save()
                res.send({
                    message: 'producto agregado al carrito',
                    product
                })
            }) . catch((er)=>console.error(er))
    }else if (estaCart){
        return res.status(400).send({
            message: 'el producto ya esta en el carrito'
        })
    }
}
const listShopping = async(req,res)=>{
    try{
        const cart = await Cart.find()
       if(!cart){
        return res.status(400).send({
            message : 'no se encotro'
        })
       }
       res.status(200).send({cart})
    }catch(er){
        throw new Error(er)
    }
}

const deleteShopping = async(req,res)=>{
    try{
        const id = req.params.id
        const deleteCart = await Cart.findByIdAndDelete(id)
        res.status(200).send({message: 'carrito de compras eliminado correctamente'})

    }catch(er){
        throw new Error(er)
    }
}

const buyShopping = async(req,res)=>{
    const{name,username, total} = req.body
    try{
        let bill = await Bill.findOne({username})
        let cart = await Cart.findOne({name})
        if(cart){
            return res.status(400).send({
                message: 'no se encontro carrito'
            })
        }
        bill = new Bill(req.body)
        
        bill = await bill.save()
        res.send({
            
            bill,
            total :'156.2',
        })
        
    }catch(er){
        throw new Error(er)
    }
        
}

module.exports ={createShopping,listShopping,deleteShopping,buyShopping}