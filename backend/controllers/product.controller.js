import mongoose from 'mongoose'
import Product from '../models/product.model.js'


export const getProducts = async(req,res)=>{
  try{
    const allProducts = await Product.find({})
    res.json({success : true, message : 'data fetched from db successfully', data : allProducts})
  } catch (error) {
    console.log("error in fetching data from db")
    res.json({success : false, message : 'error in fetching data from db'})
  }
}

export const createProduct = async(req,res)=>{
  const product = req.body

  if(!product.name || !product.price || !product.image){
    res.json({success : false, message : 'all fields are required - name price image'})
  }
  try{
    const newProduct = new Product(product)
    await newProduct.save()
    res.json({success : true, message : 'data sent successfully', data : product})
  } catch (error) {
    res.json({success : false, message : 'error in sending data'})
  }
}

export const deleteProduct = async(req,res)=>{
  const {id} = req.params
  try{
    await Product.findByIdAndDelete(id)
    res.json({success : true, message : "successfully deleted from db"})
  } catch (error) {
    console.log("error while deleting data")
    res.json({success : false, message : "error while deleting data"})
  }
}

export const updateProduct = async(req,res)=>{
  const {id} = req.params
  const product = req.body;
  
  try{
    const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
    res.json({success : true, message : "successfully updated the product", data : updatedProduct})
  } catch (error) {
    console.log("error while updating product")
    res.json({success : false, message : 'error while updating product'})
  }
}