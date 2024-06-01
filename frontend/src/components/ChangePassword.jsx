import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useUpdatePasswordMutation } from '../redux/features/auth/user/userApi';

const ChangePassword = () => {
    const [user, setuser] = useState({
        oldpassword:"",
        password:"",
        cpassword:""
    })
   let [updatePassword,{isSuccess,error}]= useUpdatePasswordMutation();
    const ChangeHandler=(e)=>{
        setuser({...user,[e.target.name]:e.target.value});
    }
    const handle=async(e)=>{
        e.preventDefault();
       if(user.password!==user.cpassword){
        toast.error("Password do not Match");
        return ;
       }else{
      await updatePassword({oldpassword:user.oldpassword,newpassword:user.password});
       }
  
    }
    useEffect(()=>{
   if(isSuccess){
    toast.success("password updated successfully");
   }
   if(error){
    toast.error(error.data.message)
   }
    },[isSuccess,error]);
  return (
    <div className=' w-full '>
    <h1 className=' text-[25px]  dark:text-white font-semibold  font-Poppins pb-4 text-black dark;text-white text-center'>Change Password</h1>
    <form action="" onSubmit={handle}>
        <div className=" flex items-center pt-3">

                <div className="w-[90%] md:w-[80%] m-auto block pb-4">
                    <div className=" w-[100%] ">

                        <label htmlFor="" className=' block  font-Poppins dark:text-white text-black '>
                            Enter your old password
                        </label>
                        <input type="password" className={` text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[100%] mb-4 md:mb-0`} required  onChange={ChangeHandler} name='oldpassword' 
                         value={user.oldpassword}/>

                    </div>
                    <div className=" w-[100%] pt-3">

                        <label htmlFor="" className=' block pb-1 font-Poppins dark:text-white text-black '>Enter your new password</label>
                        <input type="password" className={` text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[100%] mb-4 md:mb-0`} required name='password' onChange={ChangeHandler} value={user.password} minLength={6} />



                    </div>
                    <div className=" w-[100%] pt-3">

                        <label htmlFor="" className=' block pb-1 dark:text-white text-black
                        font-Poppins '>Enter your confirm password</label>
                        <input type="password" className={`w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins mb-4 md:mb-0`}   name='cpassword' onChange={ChangeHandler} value={user.cpassword} minLength={6}/>



                    </div>
                        <button className=' w-full md:w-full h-[40px] border border-[#37a39a] text-black dark:text-white text-center rounded-[4px] mt-8 cursor-pointer font-Poppins  '>Update</button>

                </div>

        </div>
            </form>

</div>
  )
}

export default ChangePassword