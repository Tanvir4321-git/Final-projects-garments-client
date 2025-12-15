import React from 'react';
import { FaFirstOrderAlt, FaUser, FaUsers } from 'react-icons/fa';
import { GrUserManager } from 'react-icons/gr';
import { motion } from 'framer-motion';
const DashboardHome = () => {

    const steps = [
        {
          icon: <FaUsers className="w-12 h-12" />,
          title: "Total Users",
          description: "55",
          color: "from-orange-500 to-red-500"
        },
        {
          icon: <GrUserManager  className="w-12 h-12" />,
          title: "Managers",
          description: "20",
          color: "from-red-500 to-pink-500"
        },
        {
          icon: <FaUser  className="w-12 h-12" />,
          title: "Buyers",
          description: "34",
          color: "from-pink-500 to-purple-500"
        },
        {
          icon: <FaFirstOrderAlt className="w-12 h-12" />,
          title: "Total Order",
          description: "200",
          color: "from-purple-500 to-indigo-500"
        }
      ];




    return (
        <div className='p-8'>
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
                className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-red-600 transition-all duration-300"
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
                <h3 className="text-2xl font-bold text-white mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
        </div>
    );
};

export default DashboardHome;