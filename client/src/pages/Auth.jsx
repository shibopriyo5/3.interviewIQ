import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparklesSharp } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { serverUrl } from '../App';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { IoCloseSharp } from "react-icons/io5"; 

function Auth({ isModel = false }) {
  const dispatch = useDispatch()
  
  const handleGoogleAuth = async () => {
    try {
      /**
       * signInWithPopup will now show account selection because:
       * 1. We set prompt: "select_account" in firebase.js
       * 2. This overrides Firebase's default behavior of auto-login
       */
      const response = await signInWithPopup(auth, provider)
      let User = response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(serverUrl + "/api/auth/google", { name, email }, { withCredentials: true })
      dispatch(setUserData(result.data))
    }
    catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }

  
  const handleClose = () => {
    
    console.log("Close model clicked");
  }

  return (
    <div className={`
      w-full transition-all duration-500
      ${isModel ? "py-6" : "min-h-screen bg-[#f8fafc] flex items-center justify-center px-6 py-24"}
    `}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className={`
          w-full bg-white ring-1 ring-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)]
          ${isModel ? "max-w-md p-10 rounded-[2.5rem]" : "max-w-lg p-12 md:p-16 rounded-[3rem]"}
          relative /* Add relative for close icon positioning */
        `}
      >
        
        {isModel && (
          <button 
            onClick={handleClose} 
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoCloseSharp size={24} />
          </button>
        )}

        
        <div className='flex flex-col items-center justify-center gap-4 mb-8'> 
          <div className='bg-gradient-to-br from-gray-900 to-gray-700 text-white p-3 rounded-2xl shadow-lg'>
            <BsRobot size={24}/>
          </div>
          <h2 className='font-bold text-xs tracking-[0.2em] text-gray-400 uppercase'>AI Interview Coach</h2>
        </div>

        
        <div className="space-y-4 mb-10">
          <h1 className='text-3xl md:text-4xl font-bold text-center tracking-tight text-gray-900 leading-tight'> 
            Continue With 
            <span className='block mt-2'>
              <span className='bg-emerald-50 text-emerald-600 px-5 py-1.5 rounded-full inline-flex items-center gap-2 border border-emerald-100 text-lg md:text-xl font-medium'> 
                <IoSparklesSharp className="animate-pulse" size={18}/>
                AI Smart Interview
              </span>
            </span>
          </h1>
          
          <p className='text-gray-600 text-center text-base md:text-lg leading-relaxed max-w-[90%] mx-auto font-normal /* Increased font weight and color opacity */'>
            Elevate your career with AI-powered mock interviews and actionable performance insights.
          </p>
        </div>

        
        <div className="flex justify-center">
            <motion.button 
              onClick={handleGoogleAuth} 
              whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }} 
              whileTap={{ scale: 0.98 }} 
              className='w-full max-w-sm /* Added max-w for smaller button */ flex items-center justify-center gap-3 py-3 px-6 /* Adjusted padding for smaller size */ bg-gray-900 hover:bg-black text-white rounded-xl /* Adjusted border-radius for size */ font-medium transition-all duration-200 group'
            >
              <div className="bg-white p-1 rounded-full group-hover:scale-110 transition-transform">
                <FcGoogle size={20 }/>
              </div>
              <span className="text-base /* Smaller text size */">Continue with Google</span>
            </motion.button>
        </div>

        
        {!isModel && (
          <p className="text-center text-xs text-gray-400 mt-10 /* More margin */">
            Secure, encrypted authentication via Google
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default Auth