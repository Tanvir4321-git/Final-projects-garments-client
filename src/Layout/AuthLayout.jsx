/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from 'react-router';
import { motion } from 'framer-motion';
const AuthLayout = () => {
    return (
        <div className='bg-linear-to-br from-gray-900 via-gray-800 to-black'>
            <div className='w-11/12 mx-auto flex lg:flex-row flex-col items-center gap-10 md:gap-20 py-20'>
                <div className='lg:w-1/2 w-full'>
                    <motion.h2 initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, }} className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
                        Welcome To <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Haque Garments</span>
                    </motion.h2>
                    <p className='text-[20px] text-center font-semibold text-gray-400'>Join thousands of happy customers and discover the best fashion deals in Bangladesh.</p>
                    <div className='p-4 mt-5 border-2 border-[#36465c] rounded-xl bg-white/5 backdrop-blur-sm '>
                        <p className='text-white text-[18px]' >Get 20% off on your first order</p>
                    </div>
                    <div className='p-4 my-5 border-2 border-[#36465c] rounded-xl bg-white/5 backdrop-blur-sm '>
                        <p className='text-white text-[18px]' >
                            Free delivery on orders above 500</p>
                    </div>
                    <div className='p-4 border-2 border-[#36465c] rounded-xl my-5 bg-white/5 backdrop-blur-sm '>
                        <p className='text-white text-[18px]' >
                            Exclusive deals for members</p>
                    </div>
                </div>
                <div className='lg:w-1/2 w-full'>

                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;