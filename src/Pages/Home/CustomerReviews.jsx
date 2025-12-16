/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Rakib Hasan",
      location: "Dhaka, Bangladesh",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=12",
      feedback: "Amazing quality! The cotton t-shirt I ordered fits perfectly and the fabric is so soft. Delivery was super fast too."
    },
    {
      id: 2,
      name: "Ayesha Rahman",
      location: "Chittagong, Bangladesh",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=5",
      feedback: "Best online shopping experience ever! The formal shirt quality exceeded my expectations. Will definitely order again."
    },
    {
      id: 3,
      name: "Mehedi Khan",
      location: "Sylhet, Bangladesh",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=33",
      feedback: "Great collection and affordable prices. The denim jeans are stylish and comfortable. Customer service was very helpful."
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      location: "Rajshahi, Bangladesh",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=9",
      feedback: "Love the punjabi I bought for Eid! The fabric quality is excellent and it looks so elegant. Worth every taka!"
    },
    {
      id: 5,
      name: "Farhan Ahmed",
      location: "Khulna, Bangladesh",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=15",
      feedback: "The hoodie is perfect for winter! Warm, comfortable, and stylish. Shipping was fast and packaging was neat."
    },
    {
      id: 6,
      name: "Tanvir Hossain",
      location: "Gazipur, Dhaka",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=8",
      feedback: "Excellent service! The chino pants fit perfectly and the quality is outstanding. Great value for money."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + reviews.length) % reviews.length;
      cards.push({ ...reviews[index], position: i });
    }
    return cards;
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5,  }} className="text-5xl md:text-6xl font-bold text-white mb-4">
            Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Reviews</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What our happy customers are saying about us
          </p>
        </motion.div>

        {/* Carousel - 3 Cards */}
        <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
          {getVisibleCards().map((review) => {
            const isCenter = review.position === 0;

            return (
              <motion.div
                key={review.id}
                initial={false}
                animate={{
                  x: review.position * 280,
                  y: isCenter ? -20 : 0,
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : 0.5,
                  zIndex: isCenter ? 10 : 0,
                  filter: isCenter ? 'blur(0px)' : 'blur(2px)'
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}


                


                className="absolute w-full max-w-sm"
              >
                {/* Your Card Design */}
                <motion.div  
             
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5,  }}  className='bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-xl p-6 border border-[#252f3e] relative'>
                  {/* Quote Icon - Right Top Corner */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-xl rotate-12">
                    <FaQuoteLeft className="text-white text-lg" />
                  </div>

                  {/* Customer Info */}
                  <div className='flex items-center gap-3 mb-4'>
                    <img
                      className='w-16 h-16 rounded-xl border-4 border-[#ff6900] object-cover'
                      src={review.image}
                      alt={review.name}
                    />
                    <div>
                      <h4 className="text-white font-bold text-lg">
                        {review.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {review.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className='flex gap-1 my-3'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < review.rating ? '#fdc700' : '#4a5568'}
                        size={25}
                      />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-300 text-base leading-relaxed italic">
                    "{review.feedback}"
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;