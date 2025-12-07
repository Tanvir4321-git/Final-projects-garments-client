/* eslint-disable no-unused-vars */
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from "framer-motion";
import img from '../../assets/img.jpg'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const OurProducts = () => {
    const {data:products=[]}=useQuery({
        queryKey:['our-products'],
        queryFn:async()=>{
            const res=await axios('http://localhost:3000/our-products')
            return res.data
        }
    })
    return (
        <div className='bg-black'>
            <div className='w-11/12 mx-auto py-16'>
                <h1 className='text-2xl mb-8 font-bold text-white hover:text-[#f9652f]'>Our products</h1>
                <div className='grid grid-cols-3  gap-3'>


                    <motion.div
                        className='border-4 rounded-lg border-[#f9652f] p-3 space-y-7 relative'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.03,
                            y: -15,
                            rotateX: 2,
                            rotateY: 2,
                            boxShadow: "0 20px 60px rgba(249, 101, 47, 0.4), 0 0 40px rgba(248, 6, 6, 0.3)",
                            borderColor: "#f80606"
                        }}
                        transition={{
                            duration: 0.4,
                            ease: [0.23, 1, 0.32, 1]
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: 1000
                        }}
                    >
                        <motion.img
                            className='h-[200px] w-full rounded-lg object-cover'
                            src={img}
                            alt=""
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className='flex items-center justify-between text-white '>
                            <h2
                                className='text-[20px] font-semibold'

                            >
                                T-shirt
                            </h2>
                            <h3 className='font-semibold '>Price:200tk</h3>
                        </div>
                        <p className='text-white text-sm leading-relaxed'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati hic sapiente rerum ex sequi eaque voluptas asperiores facere.
                        </p>
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className='flex justify-center'
                        >
                            <Link to='/about' className='button py-2 px-4 text-[16px] gap-2 w-full justify-center'>
                                More Details
                                <motion.button
                                    className='arrow py-2 px-3'
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaArrowRight size={12} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className='border-4 rounded-lg border-[#f9652f] p-3 space-y-7 relative'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.03,
                            y: -15,
                            rotateX: 2,
                            rotateY: 2,
                            boxShadow: "0 20px 60px rgba(249, 101, 47, 0.4), 0 0 40px rgba(248, 6, 6, 0.3)",
                            borderColor: "#f80606"
                        }}
                        transition={{
                            duration: 0.4,
                            ease: [0.23, 1, 0.32, 1]
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: 1000
                        }}
                    >
                        <motion.img
                            className='h-[200px] w-full rounded-lg object-cover'
                            src={img}
                            alt=""
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className='flex items-center justify-between text-white '>
                            <h2
                                className='text-[20px] font-semibold'

                            >
                                T-shirt
                            </h2>
                            <h3 className='font-semibold '>Price:200tk</h3>
                        </div>
                        <p className='text-white text-sm leading-relaxed'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati hic sapiente rerum ex sequi eaque voluptas asperiores facere.
                        </p>
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className='flex justify-center'
                        >
                            <Link to='/about' className='button py-2 px-4 text-[16px] gap-2 w-full justify-center'>
                                More Details
                                <motion.button
                                    className='arrow py-2 px-3'
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaArrowRight size={12} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className='border-4 rounded-lg border-[#f9652f] p-3 space-y-7 relative'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.03,
                            y: -15,
                            rotateX: 2,
                            rotateY: 2,
                            boxShadow: "0 20px 60px rgba(249, 101, 47, 0.4), 0 0 40px rgba(248, 6, 6, 0.3)",
                            borderColor: "#f80606"
                        }}
                        transition={{
                            duration: 0.4,
                            ease: [0.23, 1, 0.32, 1]
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: 1000
                        }}
                    >
                        <motion.img
                            className='h-[200px] w-full rounded-lg object-cover'
                            src={img}
                            alt=""
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className='flex items-center justify-between text-white '>
                            <h2
                                className='text-[20px] font-semibold'

                            >
                                T-shirt
                            </h2>
                            <h3 className='font-semibold '>Price:200tk</h3>
                        </div>
                        <p className='text-white text-sm leading-relaxed'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati hic sapiente rerum ex sequi eaque voluptas asperiores facere.
                        </p>
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className='flex justify-center'
                        >
                            <Link to='/about' className='button py-2 px-4 text-[16px] gap-2 w-full justify-center'>
                                More Details
                                <motion.button
                                    className='arrow py-2 px-3'
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaArrowRight size={12} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default OurProducts;