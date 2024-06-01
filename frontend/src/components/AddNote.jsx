import React, { useEffect, useState, } from 'react'
import GetNote from './GetNote';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { useAddNoteMutation, useDeleteNoteMutation, useGetNoteQuery, useUpdateNoteMutation } from '../redux/features/note/noteApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AddNote = () => {
  let {user}= useSelector((state)=>state.auth)
  let navigate=useNavigate();
  const [data, setdata] = useState({
    title: "",
    description: "",
    tage: ""
  })
  const [edit, setEdit] = useState({
    etitle: "",
    edescription: "",
    etage: "",
    noteId: ""
  })
  const [toggle, settoggle] = useState(false);

  const [note, setNote] = useState([])

  let [addNote, { isSuccess: addNoteSuccess, error: addNoteError }] = useAddNoteMutation();

  const { refetch, data: getNote } = useGetNoteQuery("", { refetchOnMountOrArgChange: true });

  let [deleteNote, { isSuccess: deleteNoteSuccess, error: deleteNoteError }] = useDeleteNoteMutation();
 let [updateNote,{isSuccess:updateNoteSuccess,error:updateNoteError}]= useUpdateNoteMutation();

  useEffect(() => {
    if (getNote) {
      setNote(getNote.notes)
    }
  }, [getNote]);

  useEffect(() => {
    if (addNoteSuccess) {
      refetch();
      toast.success("note addded successfully")
      setdata({
        title: "",
        description: "",
        tage: ""
      })
    }
    if (addNoteError) {
      toast.error(addNoteError.data.message);
    }

  }, [addNoteSuccess, addNoteError])

  useEffect(() => {
    if (deleteNoteSuccess) {
      refetch();
      toast.success("note deleted successfully");
    }
    if (deleteNoteError) {
      toast.error(deleteNoteError.data.message);
    }
  }, [deleteNoteError, deleteNoteSuccess])

  useEffect(() => {
    if (updateNoteSuccess) {
      refetch();
      settoggle(false);
      toast.success("note updated successfully");
    }
    if (updateNoteError) {
      toast.error(deleteNoteError.data.message);
    }
  }, [updateNoteError, updateNoteSuccess])

  const Change = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }


  const DeleteNote = async (noteId) => {
    console.log(noteId)
    await deleteNote({ id: noteId });

  }



  const handleSubmit = async (e) => {
    e.preventDefault();
          
    if (data.title === "" || data.description === "" || data.tage === "") {

      toast.error("Please fill all the fields")
    } else {
      if(!user){
        toast.error("login for add new note ")
        navigate("/login")

      }else{
        await addNote({ title: data.title, description: data.description, tage: data.tage });
      }
    }
  }
  const Close = (e) => {
    if (e.target.id === "parent") {
      settoggle(false)
    }
  }
  const EditNote = (id) => {
    settoggle(true)
    const editNote = note.filter((item) => item._id === id);
    editNote.map((item) => {
      setEdit({ etitle: item.title, edescription: item.description, etage: item.tage, noteId: item._id });
    })

  }

  const EditChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  }
  const updatehandle = async (e) => {
    e.preventDefault();
    if(edit.etitle===""|| edit.edescription===""|| edit.etage===""){
      toast.success("plase fill the title ,description and tage fields")
    }else{
      await updateNote({id:edit.noteId,title:edit.etitle,description:edit.edescription,tage:edit.etage});
    }
    
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center flex-col justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md my-4">


          <form action="" onSubmit={handleSubmit}>
            <h1 className='  bg-gradient-to-r from-blue-500 bg-clip-text text-transparent to-purple-800 md:text-4xl text-2xl  font-semibold text-center '>Add Note</h1>
            <div className='  my-6  w-full  md:mx-0 mx-3'>
              <label htmlFor="" className=' text-[18px] md:text-xl mx-3 '>Title</label>
              <input type="text" placeholder='Enter your Title here' value={data.title} name='title' className='  border-2 border-gray-400 w-full h-[50px] px-3 py-2 rounded-md' onChange={Change} />
            </div>
            <div className='  my-6  w-full  md:mx-0 mx-3 '>
              <label htmlFor="" className=' text-[18px]  md:text-xl mx-3 '>Description</label>
              <input type="text" placeholder='Enter your Title here' value={data.description} name='description' className='  border-2 border-gray-400 w-full h-[50px] px-3 py-2 rounded-md' onChange={Change} />
            </div>
            <div className='my-6  w-full  md:mx-0 mx-3'>
              <label htmlFor="" className='  text-xl mx-3  '>Tage</label>
              <input type="text" placeholder='Enter your Title here' value={data.tage} name='tage' className='  border-2 border-gray-400 w-[100%] h-[50px] px-3 py-2 rounded-md' onChange={Change} />
              <button className=' bg-gradient-to-r from-blue-800 to-purple-800 px-4 py-3 rounded-md text-white my-4 text-[18px]  md:text-xl' >Add Note</button>
            </div>
          </form>
        </div>
        <h1 className='   bg-gradient-to-r from-blue-900 bg-clip-text text-transparent to-purple-800 md:text-4xl text-2xl  font-semibold text-center md:my-0 my-5 '>{note && note.length === 0 ? "No Note here" : "All Note here"}</h1>
        <div className=' grid  md:grid-cols-3  grid-cols-1'>
          {note && note.map((item, index) => {
            return <div key={index}><GetNote item={item} DeleteNote={DeleteNote} EditNote={EditNote} /></div>
          })}
        </div>
        {/* edit Note  */}
        {toggle && <div className=' md:w-full h-full w-full  fixed   top-0   border-2 parent ' id='parent' onClick={Close}>
          <div className='  w-full md:w-[500px] bg-white mt-0 pt-5 m-auto rounded-sm effect z-[999]'>

            <div className=' flex justify-between'>
              <h1 className=' font-bold text-left px-6 text-2xl '>Edit Note</h1>
              <RxCross2 size={30} className=' mr-5 cursor-pointer' onClick={() => settoggle(false)} />
            </div>
            <form action="" onSubmit={updatehandle}>
              <div className=' my-4 '>
                <label htmlFor="" className=' block ml-3'>Edit Title</label>
                <input type="text" value={edit.etitle} name='etitle' onChange={EditChange} className='border-2 border-gray-400 w-[95%] h-[50px] px-3 py-2 rounded-md mx-2' />
              </div>
              <div className=' my-4'>
                <label htmlFor="" className=' ml-3'>Edit Description</label>
                <input type="text" value={edit.edescription} name='edescription' onChange={EditChange} className='border-2 border-gray-400 w-[95%] h-[50px] px-3 py-2 rounded-md mx-2' />
              </div>
              <div className=' my-4'>
                <label htmlFor="" className=' ml-3'>Edit Tag</label>
                <input type="text" value={edit.etage} name='etage' onChange={EditChange} className='border-2 border-gray-400 w-[95%] h-[50px] px-3 py-2 rounded-md mx-2' />
              </div>
              <button className=' bg-gradient-to-r from-blue-800 to-purple-800 px-4 py-3 rounded-md text-white my-4  text-xl ml-5'>Update Note</button>
            </form>
          </div>
        </div>}
        {/* edit Note  */}
      </div>
    </>
  )
}

export default AddNote