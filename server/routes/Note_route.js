const express=require("express");
const {getAllNotes,addNote, updateNote, deleteNote}=require("../controllers/Note_controller");
const middleware = require("../middleware/middleware");
const Note=express.Router();


Note.get("/get-note",middleware,getAllNotes)

Note.post("/add-note",middleware,addNote)

Note.put("/update-note/:id",updateNote)

Note.delete("/delete-note/:id",deleteNote)



module.exports={Note};