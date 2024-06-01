import React, { useState } from 'react';
import toast from 'react-hot-toast'
import {useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../redux/features/auth/authApi';
import { useEffect } from 'react';
const Form = () => {
  let navigate=useNavigate();
  const [credentails, setCredentails] = useState({
    name:"",
    email:"",
    password:""
  })
 let [register,{data}] =useRegisterMutation();
  const handleChange=(e)=>{
    const {name,value}=e.target
    setCredentails({...credentails,[name]:value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
   if(credentails.name===""|| credentails.email==="" || credentails.password===""){
    toast.error("please fill the name ,email and password fields");
   }else{
    await register({name:credentails.name,email:credentails.email,password:credentails.password});
   }
  }
  useEffect(()=>{
    if(data?.success){
      toast.success("User created successfully");
      navigate("/login");
    }
    if(!data?.success){
     if(data?.message){
      toast.error(data.message);
     }
    }

  },[data]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={credentails.name} name='name' onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={credentails.email} name='email' onChange={handleChange}

            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={credentails.password} name='password' onChange={handleChange}

            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full flex flex-row justify-center py-3 px-6 items-center  rounded-full cursor-pointer bg-[#2190ff] min-h-[16px] text-[16px] font-Poppins font-semibold text-white"
             
            >
              Sign Up
            </button>
          </div>
        </form>
        <h1 className=' text-center  pt-2 font-Poppins text-[14px] text-black dark:text-white my-5'>
            Already have an account? {" "}
            <span className='text-blue-500 pl-1 cursor-pointer' onClick={()=>navigate("/login")}>Sign In</span>
        </h1>
        <br />
      </div>
    </div>
  );
};

export default Form;
