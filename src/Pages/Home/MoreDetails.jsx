/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import useRole from '../../Components/CustomHooks/useRole';

const MoreDetails = () => {
    const { role, status } = useRole()
    const { id } = useParams()

    const { data: product = [], isLoading } = useQuery({
        queryKey: ['our-products', id],
        queryFn: async () => {
            const res = await axios(`https://assignment-11-final-project-server.vercel.app/our-products/${id}`)
            return res.data
        }
    })

    //  Skeleton UI
    if (isLoading) {
        return (
            <div className='w-11/12 mx-auto py-16 flex flex-col lg:flex-row gap-8'>
                <div className="lg:w-1/2 w-full animate-pulse">
                    <div className='h-[400px] md:h-[500px] bg-gray-700 rounded-xl'></div>
                </div>
                <div className="lg:w-1/2 w-full flex flex-col gap-4">
                    <div className='h-8 bg-gray-700 rounded w-3/4'></div> {/* Product Name */}
                    <div className='space-y-3'>
                        <div className='h-4 bg-gray-600 rounded w-full'></div>
                        <div className='h-4 bg-gray-600 rounded w-5/6'></div>
                        <div className='h-4 bg-gray-600 rounded w-2/3'></div>
                    </div>
                    <div className='border-t border-gray-500 mt-4 pt-5 space-y-3'>
                        <div className='h-4 bg-gray-700 rounded w-1/2'></div>
                        <div className='h-4 bg-gray-700 rounded w-1/3'></div>
                        <div className='h-10 bg-gray-700 rounded w-[250px] mt-4'></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <title>Haque Garments- Details</title>
            <div className='w-11/12 mx-auto py-16 text-white flex items-center gap-3 md:gap-8 lg:flex-row flex-col'>
                <div className="lg:w-1/2 w-full">
                    <img className='rounded-xl h-[400px] w-full md:h-[500px]' src={product.image} alt="" />
                </div>
                <div className="lg:w-1/2 w-full">
                    <h2 className='font-semibold text-[20px] mb-8'> {product.productName}</h2>
                    <p className='leading-7'>{product.description}</p>
                    <div className='border-t border-gray-400 mt-4 py-5'>
                        <div className='flex items-center justify-between'>
                            <p>Category : {product.category}</p>
                            <p>Price : {product.price}</p>
                        </div>
                        <div className='flex items-center my-5 justify-between'>
                            <p>Available Quantity : {product.availableQuantity}</p>
                            <p>Minimum order : {product.minimumOrder}</p>
                        </div>
                        <p>Payment Options : {product.paymentOptions}</p>

                        {
                            role.role === 'Buyer' && role.status !== 'suspended' ? <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-center mt-10"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9, y: 2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    className='w-[250px]'
                                >
                                    <Link to='/order' state={product} className='button py-2 px-2 md:px-4 text-[14px] md:text-[17px] flex justify-center gap-2'>
                                        Order Now
                                        <button className='arrow py-2 px-3'>
                                            <FaArrowRight size={12} />
                                        </button>
                                    </Link>
                                </motion.div>
                            </motion.div> : <button disabled className='button my-4 py-2 px-2 md:px-4 text-[14px] w-[250px] md:text-[17px] gap-2 flex justify-center' >Only Buyer can Buy</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreDetails;
