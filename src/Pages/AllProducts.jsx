/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

import { Link } from 'react-router';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import Loading from '../Components/Loading';

const AllProducts = () => {

    const { data: products = [], isLoading } = useQuery({
        
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axios('http://localhost:3000/all-products')
            return res.data
        }
    })
console.log(products)
    if (isLoading) return <Loading></Loading>


    return (
        <div className='w-11/12 mx-auto py-20' >
            <title>All Products</title>
            <h2 className="text-5xl text-center font-bold text-white mb-14">
                All <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">Products</span>
            </h2>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5'>

                {
                    products.map(product => (
                        <motion.div
                            key={product._id}
                            className='border-2 rounded-lg border-[#f9652f] p-3  relative'


                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}

                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}

                            // whileHover={{
                            //     scale: 1.03,
                            //     y: -15,
                            //     rotateX: 2,
                            //     rotateY: 2,
                             
                            //     borderColor: "#f80606"
                            // }}
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: 1000
                            }}
                        >
                            {/* image */}
                            <motion.img
                                className='h-[300px] w-full rounded-lg object-cover'
                                src={product.image}
                                alt=""
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* name + price */}
                            <div className='flex items-center justify-between text-white '>
                                <h2 className='text-[20px] font-semibold my-5'>
                                    {product.productName}
                                </h2>
                                <h3 className='font-semibold'>Price: {product.price}</h3>
                            </div>
                            <p className='text-gray-400'>Category:{product.category}</p>

                            {/* short desc */}
                            <p className='text-gray-400 text-sm leading-relaxed mb-5'>
                               Quentity: {product.availableQuantity}
                            </p>

                            {/* button */}
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className='flex justify-center'
                            >
                                <Link to={`/more-details/${product._id}`} className='button py-2 px-4 text-[16px] gap-2 w-full justify-center'>
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
                    ))
                }

            </div>

        </div>
    );
};

export default AllProducts;