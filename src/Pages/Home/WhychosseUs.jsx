/* eslint-disable no-unused-vars */
import React from 'react';
import { FaTruck, FaShieldAlt, FaHeadset, FaUndo, FaLock, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
const WhychosseUs = () => {

    const data = [
        {
            id: 1,
            icon: <FaTruck className="text-4xl" />,
            title: "Fast Delivery",
            description: "Get your products delivered within 2-3 days across Bangladesh",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            icon: <FaShieldAlt className="text-4xl" />,
            title: "Quality Assured",
            description: "100% authentic products with quality guarantee",
            color: "from-green-500 to-emerald-500"
        },
        {
            id: 3,
            icon: <FaHeadset className="text-4xl" />,
            title: "24/7 Support",
            description: "Our customer service team is always ready to help you",
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 4,
            icon: <FaUndo className="text-4xl" />,
            title: "Easy Returns",
            description: "7-day hassle-free return policy for your peace of mind",
            color: "from-orange-500 to-red-500"
        },
        {
            id: 5,
            icon: <FaLock className="text-4xl" />,
            title: "Secure Payment",
            description: "Multiple payment options with 100% secure transactions",
            color: "from-indigo-500 to-blue-500"
        },
        {
            id: 6,
            icon: <FaTags className="text-4xl" />,
            title: "Best Prices",
            description: "Competitive prices with regular discounts and offers",
            color: "from-yellow-500 to-orange-500"
        }
    ];


    return (
        <div className='w-11/12 mx-auto'>

            <motion.h2 initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, }} className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Chosse  us</span>
            </motion.h2>


            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-14 gap-5'>
                {
                    data.map(d => <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, }}

                        whileHover={{
                            scale: 1.03,
                            y: -15,
                            rotateX: 2,
                            rotateY: 2,

                            borderColor: "#f80606"
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: 1000
                        }}



                        key={data.id} className='bg-linear-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-xl p-6 border border-[#252f3e] '>
                        <div className={`bg-gradient-to-r ${d.color} inline-block  rounded-xl`}>

                            <div className={`p-4  text-white  `}>
                                {d.icon}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white my-2">
                            {d.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            {d.description}
                        </p>

                    </motion.div>)
                }
            </div>
        </div>


    );
};

export default WhychosseUs;