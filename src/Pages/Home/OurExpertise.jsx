import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaGlobeAmericas, FaClock } from 'react-icons/fa';

const OurExpertise = () => {
  const stats = [
    {
      icon: <FaClock className="text-4xl" />,
      number: "15+",
      label: "Years Experience",
      description: "Crafting quality garments",
      color: "orange"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      number: "500+",
      label: "Skilled Workers",
      description: "Dedicated professionals",
      color: "blue"
    },
    {
      icon: <FaGlobeAmericas className="text-4xl" />,
      number: "50+",
      label: "Countries Served",
      description: "Global presence",
      color: "green"
    },
    {
      icon: <FaAward className="text-4xl" />,
      number: "100+",
      label: "Industry Awards",
      description: "Excellence recognized",
      color: "purple"
    }
  ];

  const expertise = [
    {
      title: "Custom Manufacturing",
      description: "Tailored solutions for bulk orders with your specifications and branding requirements.",
      features: ["Custom designs", "Brand labeling", "Flexible MOQ"]
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and inspection at every stage to ensure premium quality products.",
      features: ["ISO certified", "Multi-stage QC", "Durability tests"]
    },
    {
      title: "Sustainable Practices",
      description: "Eco-friendly materials and processes to minimize environmental impact.",
      features: ["Organic fabrics", "Waste reduction", "Ethical sourcing"]
    }
  ];

  const colorVariants = {
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500"
  };

  return (
    <section className="py-20 px-4">
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
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Expertise</span>
                </h2> 
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Years of experience and dedication to excellence in garment manufacturing
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="bg-gray-200 dark:bg-[#0f1621] border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center hover:border-orange-500 transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorVariants[stat.color]} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>

                {/* Number */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-5xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-orange-500 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expertise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-200 dark:bg-[#0f1621] border border-gray-200 dark:border-gray-800 rounded-xl p-8 hover:border-orange-500 transition-all duration-300 group"
            >
              {/* Title with decorative line */}
              <div className="mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default OurExpertise;