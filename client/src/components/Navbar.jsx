import { motion } from 'motion/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

import axios from 'axios';
import AuthModel from './AuthModel';

function Navbar() {
    const {userData}=useSelector((state)=>state.user)
    const [showCreditPopup,setShowCreditPopup]=useState(false)
    const [showUserPopup,setShowUserPopup]=useState(false)
    const Navigate=useNavigate()
    const dispatch =useDispatch()
    const [showAuth,setShowAuth]=useState(false);
    const handleLogout=async()=>{
      try{
        /**
         * PROPER LOGOUT FLOW
         * =================
         * Step 1: Sign out from Firebase (clears Firebase session)
         * Step 2: Clear server cookie (clears backend session)
         * Step 3: Clear Redux state (clears frontend state)
         * Step 4: Redirect to home
         * 
         * This ensures that when user logs in again, they'll see the account picker
         */
        
        // Step 1: Clear Firebase session
        await signOut(auth);
        
        // Step 2: Clear server cookies
        await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true});
        
        // Step 3: Clear frontend state
        dispatch(setUserData(null));
        setShowCreditPopup(false);
        setShowUserPopup(false);
        
        // Step 4: Redirect to home
        Navigate("/")
      }
      catch(error){
        console.log(error);
      }
    }
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
      <motion.div initial={{opacity:0,y:-40}} animate={{opacity:1,y:0}} transition={{duration:0.3}} className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative'>
        <div className='flex items-center gap-3 cursor-pointer'>
            <div className='bg-black text-white p-2 rounded-lg'>
                <BsRobot size={18}/>

            </div>
            <h1 className='font-semibold hidden md:block text-lg'>AceInterview</h1>
        </div>
        <div className='flex items-center gap-6 relative'>
            <div className='relative'>
                <button onClick={()=>{
                  if(!userData){
                    setShowAuth(true)
                    return;
                  }
                    setShowCreditPopup(!showCreditPopup);setShowUserPopup(false)}} className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200'> <BsCoin size={20}/>{userData?.credits||0}</button>
                {showCreditPopup && (
                    <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded p-5 z-50'>
                        <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                        <button onClick={()=>Navigate("/pricing")} className='w-full bg-black text-white py-2 rounded-lg text-sm'>Buy more credits</button>
                        </div>
                )}
            </div>
            <div className='relative'>
                <button onClick={()=>{
                  if(!userData){
                    setShowAuth(true)
                    return;
                  }setShowUserPopup(!showUserPopup);setShowCreditPopup(false)}} className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold'> {userData?userData?.name.slice(0,1).toUpperCase():<FaUserAstronaut size={16}/>}</button>
                {showUserPopup && (
                  <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                    <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>
                    <button onClick={()=>Navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black text-gray-600'>Interview History</button>
                    <button onClick={handleLogout} className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'>
                      <HiOutlineLogout size={16}/>
                      Logout</button>

                    </div>
                )}
            </div>
        </div>

      </motion.div>
        {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/> }
    </div>
  )
}

export default Navbar