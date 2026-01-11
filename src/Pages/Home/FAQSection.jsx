import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle, FaShippingFast, FaUndo, FaCreditCard, FaHeadset, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      icon: <FaShippingFast className="text-2xl" />,
      question: "What are your shipping options and delivery times?",
      answer: "We offer standard shipping (5-7 business days) and express shipping (2-3 business days). International orders typically arrive within 10-15 business days. All orders are trackable, and you'll receive a tracking number once shipped.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaUndo className="text-2xl" />,
      question: "What is your return and exchange policy?",
      answer: "We accept returns within 30 days of delivery for unworn, unwashed items with original tags. Exchanges are free, and returns receive a full refund minus shipping costs. Simply contact our support team to initiate the process.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FaCreditCard className="text-2xl" />,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various digital wallets. All transactions are secured with SSL encryption for your protection.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaQuestionCircle className="text-2xl" />,
      question: "How do I determine the right size?",
      answer: "Each product page includes a detailed size chart with measurements. We recommend measuring your current favorite garment and comparing it with our chart. If you're between sizes, we suggest sizing up for a comfortable fit.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      question: "Do you offer bulk orders for businesses?",
      answer: "Yes! We specialize in bulk orders with custom branding options. Contact our B2B team for volume discounts, custom designs, and personalized solutions for your business needs. Minimum order quantities apply.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className=" py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl text-center font-bold dark:text-white text-black mb-14">
                    Frequently  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Asked  Questions</span>
                </h2> 
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#1a2332] hover:border-orange-500 transition-all duration-300"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-center justify-between gap-4 text-left group"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${faq.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {faq.icon}
                  </div>

                  {/* Question */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    {faq.question}
                  </h3>
                </div>

                {/* Chevron Icon */}
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-orange-500 flex-shrink-0"
                >
                  <FaChevronDown className="text-xl" />
                </motion.div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-20">
                      <div className="border-l-2 border-orange-500 pl-4">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
            <FaHeadset className="text-3xl text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Our customer support team is here to help you 24/7. Get in touch and we'll respond within 2 hours.
          </p>
             <motion.div
                  whileTap={{ scale: 0.95 }}
                  className='flex justify-center mt-auto'
              >
                  <Link to='/contact' className='button py-2 px-4 text-[16px] gap-2 justify-center'>
                     Contact Us
                      <motion.button className='arrow py-2 px-3'>
                          <FaArrowRight size={12} />
                      </motion.button>
                  </Link>
              </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;