
const Note=require("../models/Note")


 const getAllNotes=async(req,res)=>{
     const id=req.id;
try {
  const findAllNote=await Note.find({userId:id});
  if(findAllNote){
    res.json({
        success:true,
        notes:findAllNote
    })
    return;
    }
   
 
} catch (error) {
    res.json({
        success:false,
        message:"Internal server error"
    })
}
 }
 const addNote=async(req,res)=>{
    const id=req.id;
    try {
    const {title,description,tage}=req.body;
       await Note.create({
            title,
            userId:id,
            description,
            tage   
         })
         res.json({
            success:true,
            message:"Note created successfully"
         })

        
    } catch (error) {
        res.json({
            success:false,
            message:"Internal server error"
        })
    
    }
 }
 const updateNote=async(req,res)=>{
   try {
    const {title,description,tage}=req.body;
    const {id}=req.params;
    console.log(req.body,id);
    const note=await Note.findById({_id:id});
    if(!note){
        res.json({
            success:false,
            message:"Note not found"
        })
        return;
    }
    if(title){note.title=title}
    if(description){note.description=description}
    if(tage){note.tage=tage}
    await note.save();
    res.json({
        success:true,
        message:"Note updated successfully"
      })
     
   } catch (error) {
    res.json({
        success:false,
        message:"Internal server error"
    })
   }

 }
 const deleteNote=async(req,res)=>{
    try {
        const {id}=req.params;
        const note=await Note.findById({_id:id});
        if(!note){
            res.json({
                success:false,
                message:"Note not found"
            })
            return ;
        }
        await Note.deleteOne({_id:id})
        res.json({
            success:true,
            message:"Note deleted successfully"
        })
    } catch (error) {
        res.json({
            success:false,
            message:"Internal server error"
        })  
    }
 }
module.exports={getAllNotes,addNote,updateNote,deleteNote}