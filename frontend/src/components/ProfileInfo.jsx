import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {AiOutlineCamera} from 'react-icons/ai'
import { useEditProfileMutation, useUpdateAvatarMutation } from '../redux/features/auth/user/userApi';
import { useLoadUserQuery} from '../redux/features/auth/authApi'
const ProfileInfo = ({userData,avatar}) => {
    const [user, setuser] = useState({
        name:"",
        email:"",
    })
   let {refetch}= useLoadUserQuery("",{refetchOnMountOrArgChange:true})
let [updateAvatar,{error,isSuccess}]= useUpdateAvatarMutation()
let [editProfile,{isSuccess:editProfileSuccess,error:editProfileError}]= useEditProfileMutation();

    useEffect(()=>{
        if(userData){
            setuser({
                name:userData.name,
                email:userData.email
            })
        }
       
    },[userData,])
    useEffect(()=>{
        if(isSuccess ){
            refetch();
            toast.success("avatar updated successfull");
        }
        if(editProfileSuccess){
            refetch();
            toast.success("Profile updated successfully")
        }
        if(editProfileError){
            toast.error(editProfileError.data.messsage)
        }
        if(error){
            toast.error(error.data.messsage)
        }
    },[isSuccess,error,refetch,editProfileSuccess,editProfileError])

    const imageHandler=async(e)=>{
    const fileReader=new FileReader();
    fileReader.onload=async()=>{
      if(fileReader.readyState===2){
             let avatar=fileReader.result
              await updateAvatar({avatar})
              }
    }
    fileReader.readAsDataURL(e.target.files[0]);
    
  
}
    
const handle=async(e)=>{
    e.preventDefault();
    if(user.name ===""){
    toast.error("please fill the name field");
     }else{
         await editProfile({name:user.name});
     }

}

  return (
    <div>
          <div>
          <div className=' w-full  flex justify-center'>
                <div className=' relative'>
                
                    <img src={ userData.avatar ? userData.avatar.url : avatar} width={120} height={120} className='w-[120px] h-[120px] rounded-full border-[3px] border-solid border-[#37a39a] ' alt='avatarImage' />
     
                    <input type="file" name='' className='hidden' accept='image/png,image/jpeg,image/jpg,image/webp' id='avatar'  onChange={imageHandler}/>
     
                    <label htmlFor="avatar" className=' w-[30px] bg-slate-900 h-[30px] rounded-full absolute  items-center  right-2 bottom-2  cursor-pointer text-white '>
                        <AiOutlineCamera size={23} className=' z-1 !items-center !flex  !justify-center ' />
                    </label>
                </div>
                </div>
                <br />
                <br />
                <div className="w-full pl-6 8000px:pl-10">
                <form action="" onSubmit={handle}>
                    <div className=" md:w-[60%] m-auto block pb-4">
                        <div className=" w-[100%] ">

                            <label htmlFor="" className=' block pb-1 dark:text-white text-black '>Full  Name</label>
                            <input type="text" className={`w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins  mb-4 md:mb-0`} required value={user.name} 
                             onChange={(e) => setuser({name:e.target.value})} />

                        </div>
                        <div className=" w-[100%] pt-3">

                            <label htmlFor="" className=' block pb-1 dark:text-white text-black '>Email Address</label>
                            <input type="text" className={`w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins  mb-4 md:mb-0`} required readOnly value={user.email} />
                            <button className=' w-full md:w-[250px] h-[40px] border border-[#37a39a] text-black dark:text-white text-center rounded-md mt-8 cursor-pointer  font-Poppins '>Update</button>

                        </div>
                    </div>

                </form>

            </div>
    </div>
    </div>
  )
}

export default ProfileInfo