/* eslint-disable no-unused-vars */
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from "framer-motion";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../Components/Loading';

const OurProducts = () => {
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['our-products'],
        queryFn: async () => {
            const res = await axios('https://assignment-11-final-project-server.vercel.app/our-products')
            return res.data
        }
    })

    if (isLoading) return <Loading></Loading>

    return (
        <div >
            <div className='w-11/12 mx-auto py-20'>
                <h2 className="text-5xl text-center font-bold dark:text-white text-black mb-14">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Products</span>
                </h2> 
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5'>



                    {
                        products.map(product => (
                           <motion.div
    key={product._id}
    className='border-2 rounded-lg border-[#1c5cbd]  p-3 relative flex flex-col'
    // ... other props
>
    {/* image */}
    <motion.img
        className='h-[300px] w-full rounded-lg object-cover'
        src={product.image}
        alt=""
    />

    {/* name + price */}
    <div className='flex items-center justify-between dark:text-white text-black'>
        <h2 className='text-[20px] font-semibold my-5'>
            {product.productName}
        </h2>
        <h3 className='font-semibold'>Price: {product.price}</h3>
    </div>

    {/* short desc - */}
    <p className='text-gray-400 text-sm leading-relaxed mb-5 flex-grow'>
        {product.shortDescription}
    </p>

    {/* button  */}
    <motion.div
        whileTap={{ scale: 0.95 }}
        className='flex justify-center mt-auto'
    >
        <Link to={`/more-details/${product._id}`} className='button py-2 px-4 text-[16px] gap-2 w-full justify-center'>
            More Details
            <motion.button className='arrow py-2 px-3'>
                <FaArrowRight size={12} />
            </motion.button>
        </Link>
    </motion.div>
</motion.div>
                        ))
                    }



                </div>
            </div>
        </div>
    );
};

export default OurProducts;