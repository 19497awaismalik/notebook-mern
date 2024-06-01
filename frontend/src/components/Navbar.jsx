import React, { useEffect, useState, useSyncExternalStore } from 'react';
import {Link, resolvePath, useNavigate} from 'react-router-dom' 
import { CgProfile } from "react-icons/cg";
import profile from '/profile.jpg'
import {useSelector} from 'react-redux'
const Navbar = () => {
  let naviagte=useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handle=()=>{
naviagte("/signup")
  }
 
  let {user}= useSelector((state)=>state.auth);
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                <svg className="h-6 w-6 text-blue-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m0 0l3-3m-3 3l-3-3m12 6h2a2 2 0 002-2V5a2 2 0 00-2-2h-6a2 2 0 00-2 2v1M6 18H4a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1m0 0h6" />
                </svg>
                <span className="font-bold">iNotebook</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/home" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">About</a>
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
            </div>
          </div>

          
         {!user  ? <CgProfile  size={30} className=' items-center hidden md:flex mt-3 cursor-pointer' onClick={handle}/>:<img src={user?.avatar ? user?.avatar.url:profile} className=' md:block hidden w-[50px] cursor-pointer h-[50px] rounded-full border-2   mt-3 border-green-600' onClick={()=>naviagte("/profile")}/>}

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button focus:outline-none">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} mobile-menu md:hidden`}>
        <Link to="/home" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</Link>
        <Link to="#" className="block py-2 px-4 text-sm hover:bg-gray-200">About</Link>
        <Link to="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact</Link>
      {!user ?  <CgProfile  size={30} className=' items-center block hover:bg-gray-200   mx-3  cursor-pointer' onClick={handle}/>:<img src={user?.avatar ? user?.avatar.url:profile} className=' block w-[40px] cursor-pointer h-[40px] mx-3 my-2 rounded-full border-2   mt-3 border-green-600' onClick={()=>naviagte("/profile")}/>}
        
      </div>
    </nav>
  );
};

export default Navbar;
