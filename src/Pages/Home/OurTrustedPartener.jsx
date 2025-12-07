/* eslint-disable no-unused-vars */
import React from 'react';
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import mar1 from '../../assets/mar1.webp'
import mar2 from '../../assets/mar2.webp'
import mar3 from '../../assets/mar3.webp'
import mar4 from '../../assets/mar4.webp'
import mar5 from '../../assets/mar5.webp'
import mar6 from '../../assets/mar6.webp'




const OurTrustedPartener = () => {
   
    return (
        <div className='pb-[100px]'>
              <motion.h2 initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5,  }} className="text-5xl md:text-6xl font-bold text-white text-center my-[100px]">
            Our Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Partners</span>
          </motion.h2>
         <Marquee >
         
            <div  className='bg-white border border-[#252f3e] p-2 rounded-xl ml-14'>
          
       <img className='w-[150px] rounded-xl' src={mar1} alt="" />
       
            </div>
            <div  className='bg-white border border-[#252f3e] p-2 rounded-xl ml-14'>
          
       <img className='w-[150px] rounded-xl' src={mar2} alt="" />
       
            </div>
            <div  className='bg-white border border-[#252f3e] p-2 rounded-xl ml-14'>
          
       <img className='w-[150px] rounded-xl' src={mar3} alt="" />
       
            </div>
            <div  className='bg-white border border-[#252f3e] p-2 rounded-xl ml-14'>
          
       <img className='w-[150px] rounded-xl' src={mar4} alt="" />
       
            </div>
            <div  className='bg-white border border-[#252f3e] p-2 rounded-xl ml-14'>
          
       <img className='w-[150px] rounded-xl' src={mar5} alt="" />
       
            </div>
            <div  className='bg-white border border-[#252f3e] p-2 rounded-xl ml-14'>
          
       <img className='w-[150px] rounded-xl' src={mar6} alt="" />
       
            </div>
            

            
            </Marquee>
        </div>
    );
};

export default OurTrustedPartener;