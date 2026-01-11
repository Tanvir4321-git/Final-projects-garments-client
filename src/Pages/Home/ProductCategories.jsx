/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaTshirt, FaHatCowboy, FaShoePrints, FaRing } from 'react-icons/fa';
import { GiLargeDress, GiShirt } from 'react-icons/gi';

const ProductCategories = () => {
  const categories = [
    {
      icon: <FaTshirt className="text-5xl" />,
      title: "T-Shirts & Tops",
      count: "250+ Products",
      description: "Casual and comfortable wear for everyday style",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: <GiLargeDress className="text-5xl" />,
      title: "Dresses",
      count: "180+ Products",
      description: "Elegant designs for every occasion",
      gradient: "from-pink-500 to-purple-600"
    },
    {
      icon: <GiShirt className="text-5xl" />,
      title: "Formal Wear",
      count: "120+ Products",
      description: "Professional attire for the modern workplace",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: <FaShoePrints className="text-5xl" />,
      title: "Footwear",
      count: "200+ Products",
      description: "Step up your style with premium shoes",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <FaHatCowboy className="text-5xl" />,
      title: "Accessories",
      count: "300+ Products",
      description: "Complete your look with perfect additions",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: <FaRing className="text-5xl" />,
      title: "Jewelry",
      count: "150+ Products",
      description: "Shine bright with our exclusive collection",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 ">
      <div className='w-11/12 mx-auto '>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl text-center font-bold dark:text-white text-black mb-14">
                  Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Collections</span>
                </h2> 
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Discover a wide range of premium garments tailored to your lifestyle
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer"
            >
              <div className="bg-gray-50 dark:bg-[#1a2332] border border-gray-200 dark:border-gray-800 rounded-xl p-8 h-full overflow-hidden relative hover:border-orange-500 transition-all duration-300">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon container */}
                <div className="relative z-10 mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white group-hover:rotate-6 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-orange-500 font-semibold mb-3">
                    {category.count}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {category.description}
                  </p>

                  
                 
                </div>

                {/* Decorative corner */}
                <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${category.gradient} opacity-20 group-hover:scale-150 transition-transform duration-500`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;