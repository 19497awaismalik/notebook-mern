const {Schema, default: mongoose}=require("mongoose");

const User=new Schema({

    name:{
        type:String,
        required:[true,'Enter valid name']
    },
    email:{
        type:String,
        required:[true,'Enter valid email address'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Enter valid password"]
    },
    avatar:{
        public_id:String,
        url:String,
    }
},{timestamps:true});


module.exports=mongoose.models.User|| mongoose.model("User",User);