/* eslint-disable no-unused-vars */
import React from 'react';

import { motion } from 'framer-motion';
import { FaShoppingCart,  FaTruck, FaStar,  FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const HowitWorks = () => {

const steps = [
    {
      icon: <FaShoppingCart className="w-12 h-12" />,
      title: "Browse & Select",
      description: "Explore our premium collection of garments and choose your favorite styles",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FaCheckCircle className="w-12 h-12" />,
      title: "Quality Check",
      description: "Every piece undergoes strict quality control to ensure perfection",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <FaTruck className="w-12 h-12" />,
      title: "Fast Delivery",
      description: "We pack and ship your order with care, ensuring safe delivery to your doorstep",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: <FaStar className="w-12 h-12" />,
      title: "Enjoy & Review",
      description: "Wear your new garments with confidence and share your experience",
      color: "from-purple-500 to-indigo-500"
    }
  ];
   



  

  return (
    <div className="min-h-screen  py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold dark:text-white text-black mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Works</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Simple steps from browsing to delivery - your journey to premium garments
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-1 bg-gradient-to-r from-orange-500/30 to-transparent -translate-x-4 z-0" />
              )}

              {/* Card */}
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 bg-white  dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border-2 border-[#1c5cbd]   hover:border-red-600 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mx-auto text-white shadow-xl`}
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold dark:text-white text-black mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-center leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className='w-[250px] mx-auto'
          >
            <Link to='/all-products' className='button py-2 px-2 md:px-4 text-[14px] md:text-[17px] gap-2'>
              Start Shopping Now
              <button className='arrow py-2 px-3'>
                <FaArrowRight size={12}/>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


export default HowitWorks;