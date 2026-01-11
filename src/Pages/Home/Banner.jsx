/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

// Demo images - replace with your actual imports
const slider1 = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800";
const slider2 = "https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg";
const slider3 = "https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_se_enriched&w=740&q=80";
const slideImg1 = "https://img.freepik.com/free-photo/handsome-bearded-tailor-working-with-cloth-samples-sewing-workshop_613910-6778.jpg?semt=ais_hybrid&w=740&q=80";
const slideImg2 = "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400";
const slideImg3 = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderEvents = [
    {
      id: 1,
      desc: 'Our skilled team of garment professionals works with care and precision to produce high-quality clothing every day. From cutting and stitching to finishing and quality control, every step is handled by trained workers dedicated to maintaining international standards.',
      img: slider1,
      slideImg: slideImg1
    },
    {
      id: 2,
      desc: "Our production process begins with the finest quality yarns, carefully selected for strength, color richness, and durability. These vibrant threads represent the foundation of every garment we create, ensuring comfort and long-lasting performance. From spinning to weaving, each step is handled with precision to maintain consistent texture and color accuracy.",
      img: slider2,
      slideImg: slideImg2
    },
    {
      id: 3,
      desc: "The image captures skilled garment workers carefully stitching clothing inside a busy production floor. Each craftsman focuses on precision, ensuring every piece meets high-quality standards. Modern sewing machines and organized workstations help maintain efficiency and consistency. The team collaborates in a streamlined environment to deliver premium garments on time.",
      img: slider3,
      slideImg: slideImg3
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderEvents.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [sliderEvents.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = sliderEvents[currentSlide];

  return (
    <div className="relative overflow-hidden">
      <div
        className="relative h-[400px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${slide.img})` }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-white lg:px-5 px-3 flex md:flex-row flex-col-reverse items-center md:gap-10 gap-4  w-11/12 mx-auto">

          {/* Text animation - Left to Right */}
          <motion.div
            key={`text-${slide.id}`}
            className="md:w-1/2 w-full text-white"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-semibold lg:text-2xl md:text-[18px] text-[14px] text-left">
              {slide.desc}
            </p>
          </motion.div>

          {/* Image animation - Right to Left */}
          <motion.div
            key={`img-${slide.id}`}
            className="md:w-1/2 w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              className="md:h-[300px] h-[200px] w-full object-cover rounded-lg"
              src={slide.slideImg}
              alt=""
            />
          </motion.div>

        </div>
      </div>

      {/* Pagination Controls - Centered */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-4">

   
        {/* <motion.div
          whileTap={{ scale: 0.9, y: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Link to='/about' className='button button  py-2 px-2 md:px-4 text-[14px] md:text-[17px] gap-2'>
           More Details
            <button className='arrow py-2 px-3 '>
              <FaArrowRight size={12}/>
            </button>
          </Link>
        </motion.div> */}
        
        {/* Pagination Dots */}
        <div className="flex gap-3">
          {sliderEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        

      </div>

    </div>
  );
};

export default Banner;