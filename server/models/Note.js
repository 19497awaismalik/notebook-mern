const {Schema, default: mongoose} =require("mongoose");


const Note=new Schema({
    title:{
        type:String,
        required:[true,"Enter note title"]
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    description:{
        type:String,
        required:[true,"Enter note description"]
    },
    tage:{
        type:String,
        required:false,
        default:"general"
    }
},{timestamps:true});



module.exports=mongoose.models.Note|| mongoose.model("Note",Note);