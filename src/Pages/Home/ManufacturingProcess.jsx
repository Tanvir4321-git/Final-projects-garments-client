import React from 'react';
import { motion } from 'framer-motion';
import { FaCogs, FaCheckCircle, FaTruck, FaIndustry } from 'react-icons/fa';

const ManufacturingProcess = () => {
  const processes = [
    {
      icon: <FaIndustry className="text-4xl" />,
      title: "Design & Planning",
      description: "Expert designers create detailed patterns and specifications for each garment with precision.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FaCogs className="text-4xl" />,
      title: "Fabric Selection",
      description: "We source premium quality fabrics from trusted suppliers ensuring durability and comfort.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaCheckCircle className="text-4xl" />,
      title: "Quality Control",
      description: "Multi-stage inspection process guarantees every piece meets our high standards.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaTruck className="text-4xl" />,
      title: "Final Packaging",
      description: "Careful packaging and labeling before delivery to ensure products arrive in perfect condition.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className=" py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl text-center font-bold dark:text-white text-black mb-14">
                     Our Manufa<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">cturing  Process</span>
                </h2> 
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            From concept to creation - transparency in every step of our production journey
          </p>
        </motion.div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="bg-gray-200 dark:bg-[#0f1621] border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full hover:border-orange-500 transition-all duration-300">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${process.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {process.icon}
                </div>

                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-300 dark:text-gray-800 group-hover:text-gray-200 dark:group-hover:text-gray-700 transition-colors">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed relative z-10">
                  {process.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default ManufacturingProcess;