import React, { useEffect, useState } from 'react'
import {RiLockPasswordLine} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi'
import profile from '/profile.jpg'
import { useNavigate } from 'react-router-dom'
import { useLogoutQuery } from '../redux/features/auth/authApi'
import toast from 'react-hot-toast'
const SideBarProfile = ({active,setactive,user}) => {
  let navigate = useNavigate();
  const [logout, setlogout] = useState(false)
  let {isSuccess,error} = useLogoutQuery("",{ skip: !logout ? true : false });
    const handleLogout=()=>{
            setlogout(true);
    }
    useEffect(()=>{
 if(isSuccess){
  toast.success("user logout successfully");
  navigate("/login");
 }
 if(error){
  toast.error(error.data.message);
 }
    },[isSuccess,error]);
  
  return (
    <div>
         <div className='w-full'>
        <div className={`w-full flex items-center px-3 py-3 cursor-pointer ${active===1?"bg-slate-100 dark:bg-slate-800":"bg-transparent"}` } onClick={()=>setactive(1)}>
            <img src={user?.avatar? user?.avatar?.url:profile}
            alt='avatar'
            className='w-[25px] h-[25px] md:w-[35px] md:h-[35px] cursor-pointer rounded-full
            border-[3px] border-solid border-[#37a39a]'
            />
            <h5 className='pl-2 md:block hidden text-black dark:text-white font-Poppins'>My Account</h5>
        </div>
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active===2?"bg-slate-100 dark:bg-slate-800":"bg-transparent"}` } onClick={()=>setactive(2)}>
            <RiLockPasswordLine size={20}  className=' md:ml-2 text-black dark:text-white'/>
            <h5 className='pl-2 md:block hidden text-black dark:text-white font-Poppins'>Change Password</h5>
        </div>
        
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active===4?"bg-slate-100 dark:bg-slate-800":"bg-transparent"}` } onClick={handleLogout}>
            <FiLogOut size={20}  className=' md:ml-2 text-black dark:text-white'/>
            <h5 className='pl-2 md:block hidden text-black  font-Poppins' >Log Out</h5>
        </div>

        </div>
    </div>
  )
}

export default SideBarProfile