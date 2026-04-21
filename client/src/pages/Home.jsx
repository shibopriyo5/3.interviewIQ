import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
    BsRobot,
    BsMic,
    BsClock,
    BsBarChart,
    BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

function Home() {
  const {userData}=useSelector((state)=>state.user)
  const [showAuth,setShowAuth]=useState(false);
  const navigate=useNavigate()

  return (
    <div className='min-h-screen relative flex flex-col overflow-hidden bg-[#fafafa] antialiased'>

      {/* Background */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#f7f7f7] to-[#f1f5f9]' />

      <div className='absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] 
      bg-green-200 opacity-20 blur-[120px] rounded-full -z-10' />

      <div className='absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] 
      bg-emerald-100 opacity-20 blur-[120px] rounded-full -z-10' />

      <div className='absolute inset-0 -z-10 opacity-[0.04] 
      [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] 
      [background-size:40px_40px]' />

      <Navbar/>

      <div className='flex-1 px-6 py-14'>
        <div className='max-w-5xl mx-auto'>

        {/* Badge */}
        <div className='flex justify-center mb-6'>
          <div className='flex items-center gap-2 text-sm text-gray-700 font-medium border border-gray-200 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm'>
            <HiSparkles size={14} className="text-green-600"/>
            AI Powered Smart Interview Platform
          </div>
        </div>

        {/* Hero */}
        <div className='text-center mb-20'>
          <motion.h1 
            initial={{opacity:0,y:20}} 
            animate={{opacity:1,y:0}} 
            transition={{duration:0.5}}
            className='text-4xl md:text-5xl font-bold text-gray-950 leading-tight tracking-tight'
          >
            Practice Interviews with{" "}
            <span className='text-green-600'>
              AI Intelligence
            </span>
          </motion.h1>

          <motion.p 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            transition={{duration:0.7}} 
            className='text-gray-600 mt-4 max-w-xl mx-auto text-base leading-relaxed font-medium'
          >
            Role-based mock interviews with smart follow-ups, adaptive difficulty and real-time performance evaluation.
          </motion.p>

          <div className='flex justify-center gap-3 mt-8'>
            <motion.button
              onClick={()=>{
                if(!userData){
                  setShowAuth(true)
                  return;
                }
                navigate("/interview")
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className='bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-900 transition shadow-sm hover:shadow-md'
            >
              Start Interview
            </motion.button>

            <motion.button
              onClick={()=>{
                if(!userData){
                  setShowAuth(true)
                  return;
                }
                navigate("/history")
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className='border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition bg-white/80 backdrop-blur-sm'
            >
              View History
            </motion.button>
          </div>
        </div>

        {/* Steps */}
        <div className='grid md:grid-cols-3 gap-6 mb-24'>
        {
          [
            {
              icon: <BsRobot size={20} />,
              step: "STEP 1",
              title: "Role & Experience Selection",
              desc: "AI adjusts difficulty based on selected job role."
            },
            {
              icon: <BsMic size={20} />,
              step: "STEP 2",
              title: "Smart Voice Interview",
              desc: "Dynamic follow-up questions based on your answers."
            },
            {
              icon: <BsClock size={20} />,
              step: "STEP 3",
              title: "Timer Based Simulation",
              desc: "Real interview pressure with time trackers."
            }
          ].map((item,index)=>(
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              className='bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-md transition'
            >
              <div className='flex items-center gap-3 mb-3 text-green-600'>
                {item.icon}
                <span className='text-xs font-semibold tracking-wide'>{item.step}</span>
              </div>

              <h3 className='font-semibold text-gray-950 mb-1'>{item.title}</h3>
              <p className='text-sm text-gray-600 leading-relaxed font-medium'>{item.desc}</p>
            </motion.div>
          ))
        }
        </div>

        {/* AI Features */}
        <div className='mb-24'>
          <motion.h2 
            initial={{opacity:0,y:10}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.5}}
            className='text-2xl font-bold text-center mb-12 text-gray-950 tracking-tight'
          >
            Advanced AI <span className='text-green-600'>Capabilities</span>
          </motion.h2>   

          <div className='grid md:grid-cols-2 gap-6'>
          {
            [
              { image: evalImg, icon: <BsBarChart size={18} />, title: "AI Answer Evaluation", desc: "Scores communication, technical accuracy and confidence." },
              { image: resumeImg, icon: <BsFileEarmarkText size={18} />, title: "Resume Based Interview", desc: "Project-specific questions based on uploaded resume." },
              { image: pdfImg, icon: <BsFileEarmarkText size={18} />, title: "Downloadable PDF Report", desc: "Detailed strengths, weaknesses and improvement insights." },
              { image: analyticsImg, icon: <BsBarChart size={18} />, title: "History & Analytics", desc: "Track progress with performance graphs and topic analysis." }
            ].map((item,index)=>(
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -3 }}
                className='bg-white/85 backdrop-blur-sm border border-gray-200 rounded-xl p-5 flex gap-4 items-center hover:shadow-md transition'
              >
                <img src={item.image} alt={item.title} className='w-16 h-16 object-contain'/>

                <div>
                  <div className='text-green-600 mb-1'>{item.icon}</div>
                  <h3 className='text-sm font-semibold text-gray-950'>{item.title}</h3>
                  <p className='text-xs text-gray-600 font-medium'>{item.desc}</p>
                </div>
              </motion.div>
            ))
          }
          </div>
        </div>

        {/* Modes */}
        <div className='mb-24'>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-2xl font-bold text-center mb-12 text-gray-950 tracking-tight'
          >
            Multiple Interview <span className='text-green-600'>Modes</span>
          </motion.h2>

          <div className='grid md:grid-cols-2 gap-5'>
          {
            [
              { img: hrImg, title: "HR Interview Mode", desc: "Behavioral and communication based evaluation." },
              { img: techImg, title: "Technical Mode", desc: "Deep technical questioning based on selected role." },
              { img: confidenceImg, title: "Confidence Detection", desc: "Basic tone and voice analysis insights." },
              { img: creditImg, title: "Credits System", desc: "Unlock premium interview sessions." }
            ].map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -3 }}
                className='flex items-center justify-between border border-gray-200 rounded-xl p-5 bg-white/85 backdrop-blur-sm hover:shadow-md transition'
              >
                <div>
                  <h3 className="text-base font-semibold text-gray-950 mb-1">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-gray-700 font-semibold leading-relaxed max-w-[240px]">
                    {mode.desc}
                  </p>
                </div>

                <img
                  src={mode.img}
                  alt={mode.title}
                  className="w-12 h-12 object-contain opacity-90"
                />
              </motion.div>
            ))
          }
          </div>
        </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
    </div>
  )
}

export default Home