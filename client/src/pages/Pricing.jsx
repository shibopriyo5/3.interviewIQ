import React , { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { FaCheckCircle } from "react-icons/fa";

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan,setSelectedPlan]=useState("free");

  const plans =  [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect for beginners starting interview preparation",
    features: [
      "100 AI Interview Credits",
      "Basic Performance Report",
      "Voice Interview Access",
      "Limited History Tracking",
    ],
    default: true,
  },
  {
    id: "basic",
    name: "Starter Pack",
    price: "₹100",
    credits: 150,
    description: "Great for focused practice and skill improvement.",
    features: [
      "150 AI Interview Credits",
      "Detailed Feedback",
      "Performance Analytics",
      "Full Interview History",
    ],
  },
  {
    id: "pro",
    name: "Pro Pack",
    price: "₹500",
    credits: 650,
    description: "Best value for serious job preparation.",
    features: [
      "650 AI Interview Credits",
      "Advanced AI Feedback",
      "Skill Trend Analysis",
      "Priority AI Processing",
    ],
    badge:"Best Value",
  },
 ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#064e3b] py-16 px-6 text-white'>

      {/* HEADER */}
      <div className='max-w-6xl mx-auto mb-16 flex items-center gap-4'>

        <button 
          onClick={() => navigate("/")} 
          className='p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
          hover:scale-105 transition'>
          <FaArrowLeft className='text-white' />
        </button>

        <div className='text-center w-full'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
            Choose Your Plan
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            Flexible pricing designed for every stage of your journey.
          </p>
        </div>

      </div>

      {/* PLANS */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

        {plans.map((plan)=>{
          const isSelected = selectedPlan === plan.id

          return(
            <motion.div 
              key={plan.id}
              whileHover={!plan.default && { scale: 1.04 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}

              className={`relative rounded-3xl p-8 transition-all duration-300 border backdrop-blur-md
              ${
                isSelected
                  ? "border-emerald-400 bg-white/10 shadow-2xl shadow-emerald-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }
              ${plan.default ? "cursor-default opacity-90" : "cursor-pointer"}
              `}
            >

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-5 right-5 bg-emerald-500/20
                text-emerald-300 text-xs px-4 py-1 rounded-full border border-emerald-400/30">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-5 right-5 bg-white/10
                text-gray-300 text-xs px-3 py-1 rounded-full border border-white/20">
                  Default
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-5">
                <span className="text-4xl font-bold text-emerald-400">
                  {plan.price}
                </span>
                <p className="text-gray-400 mt-1">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-400 text-sm" />
                    <span className="text-gray-300 text-sm">
                      { feature }
                    </span>
                  </div>
                ))}
              </div>

              {/* BUTTON */}
              {!plan.default && 
                <button 
                  className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all duration-300
                  ${
                    isSelected 
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:opacity-90"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {isSelected ? "Proceed to Pay" : "Select Plan"}
                </button>
              }

            </motion.div>
          )
        })}
      </div>

    </div>
  )
}

export default Pricing