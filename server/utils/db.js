const mongoose=require("mongoose");
const {config} =require("dotenv");
config();

 const Connection=async()=>{


    await mongoose.connect("mongodb+srv://19497awaismalik:19497awaismalik@cluster0.ekvjren.mongodb.net/");
    console.log("connect with mongodb successfully!");
}

module.exports={Connection}