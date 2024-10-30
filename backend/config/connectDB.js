import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async ()=>{
  console.log("hi")
  console.log(process.env.MONGO_URI)
  try{
    console.log("hello")
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected : ${conn.connection.host}`)
  } catch (error){
    console.log(error,"error while connecting to db")
  }
}