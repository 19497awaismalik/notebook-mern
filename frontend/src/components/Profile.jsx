import React, { useState } from 'react'
import SideBarProfile from './SideBarProfile'
import ProfileInfo from './ProfileInfo';
import avatar from '/profile.jpg'
import ChangePassword from './ChangePassword';
import { useSelector } from 'react-redux';
const Profile = () => {
  const [active, setactive] = useState(1);
  let {user}=useSelector((state)=>state.auth);


  
  return (
    <div>
      <div className='w-[90%]  flex mx-auto '>
      <div className={`w-[60px] md:w-[310px] h-[450px] bg-opacity-90 bg-white dark:bg-slate-900 border 
        dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-lg dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? " top-[120px]" : "top-[30px]"} left-[30] `}>
      <SideBarProfile active={active} setactive={setactive} user={user}/>
          </div>
          {active === 1 && <div className='w-full h-full bg-transparent mt-[80px]'><ProfileInfo 
          userData={user} avatar={avatar} /></div>}
          {active === 2 && <div className='w-full h-full bg-transparent mt-[80px]'><ChangePassword 
         /></div>}
        </div>
    </div>
  )
}

export default Profile