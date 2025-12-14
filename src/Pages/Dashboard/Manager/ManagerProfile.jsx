/* eslint-disable no-unused-vars */
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ManagerProfile = () => {
  
  const {data:users}=useQuery({
    queryFn:['user-profile'],
    queryKey:async()=>{
    await  axios('/user-profile')
    }
  })
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Profile Card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          {/* Header with Gradient */}
          <div className="h-32 bg-[#f9652f]"></div>

        {
          users.map()
        }

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Profile Image */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-slate-800 shadow-xl">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online Status */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-800"></div>
              </div>
            </div>

            {/* User Name */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {user.name}
              </h2>
              <div className="inline-block">
                <span className="px-4 py-1.5 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Email Section */}
            <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 mb-1">Email Address</p>
                  <p className="text-white text-sm font-medium truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <motion.div

              whileTap={{ scale: 0.9, y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}

            >
              <button className=' bg-red-600 text-white rounded my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center' > Log Out  <span className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></span></button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;