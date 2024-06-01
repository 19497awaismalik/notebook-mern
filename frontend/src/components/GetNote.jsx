import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const GetNote = ({item,DeleteNote,EditNote}) => {
  return (
    <div className='   px-4 mx-4  my-4 pt-[20px] min-h-[150px] rounded-md border-2  bg-white relative'>
      <span className=' absolute left-[-10px] cursor-pointer  z-[999] top-[-10px] px-2 py-1 rounded-md bg-blue-700 text-white'>{item.tage}</span>
        <div className=' flex justify-between  '>
          <h1 className='   text-xl'>{item.title}</h1>
          <div className=' flex float-right'>
          <AiOutlineDelete   className=' text-[18px] md:text-xl cursor-pointer text-red-700' onClick={()=>{DeleteNote(item._id)}}/>
          <FaEdit   className=' text-xl text-[18px] mx-2 cursor-pointer text-blue-700' onClick={()=>EditNote(item._id)}/>
          </div>
          </div>
        <h1 className='  text-xl'>{item.description}</h1>
    </div>
  )

}

export default GetNote