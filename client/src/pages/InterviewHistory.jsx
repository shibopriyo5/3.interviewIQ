import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { serverUrl } from '../App.jsx'
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from "framer-motion";

function InterviewHistory() {
  const [interviews, setInterviews] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const navigate = useNavigate()

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/interview/get-interview", { withCredentials: true })
        setInterviews(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    getMyInterviews()
  }, [])

  // FILTER + SEARCH LOGIC (non-breaking addition)
  const filteredInterviews = interviews.filter((item) => {
    const matchesSearch = item.role.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ? true : item.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#064e3b] py-12 text-white'>

      <div className='w-[92vw] lg:w-[70vw] max-w-[1100px] mx-auto'>

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-10 flex items-center gap-4'
        >
          <button
            onClick={() => navigate("/")}
            className='p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
            hover:scale-105 transition'>
            <FaArrowLeft className='text-white'/>
          </button>

          <div>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
              Interview History
            </h1>
            <p className='text-gray-300 mt-1'>
              Review your interviews, uncover insights, and level up your performance.
            </p>
          </div>
        </motion.div>

        {/* SEARCH + FILTER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='flex flex-col md:flex-row gap-4 mb-8'
        >

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md 
            border border-white/20 text-white placeholder-gray-400 outline-none'
          />

          {/* FILTER */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md 
            border border-white/20 text-white outline-none'
          >
            <option value="all" className='text-black'>All</option>
            <option value="completed" className='text-black'>Completed</option>
            <option value="pending" className='text-black'>Pending</option>
          </select>

        </motion.div>

        {/* EMPTY STATE */}
        {filteredInterviews.length === 0 ? 
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white/10 backdrop-blur-md p-12 rounded-2xl border border-white/20 text-center'
          >
            <p className='text-gray-300'>
              No interviews found 🚀
            </p>
          </motion.div>
        :

        /* LIST */
        <div className='grid gap-5'>
          {filteredInterviews.map((item, index)=>(
            
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={()=>navigate(`/report/${item._id}`)} 
              className='group bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 
              hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
            >

              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>

                {/* LEFT */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold group-hover:text-emerald-400 transition">
                    {item.role}
                  </h3>

                  <p className="text-gray-300 text-sm mt-1">
                    {item.experience} • {item.mode}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className='flex items-center justify-between md:justify-end gap-6'>

                  {/* SCORE */}
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold text-emerald-400">
                      {item.finalScore || 0}/10
                    </p>
                    <p className="text-xs text-gray-400">
                      Score
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize ${
                      item.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              </div>

            </motion.div>

          ))}
        </div>
        }

      </div>

    </div>
  )
}

export default InterviewHistory