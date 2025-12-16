/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaBullseye, FaAward, FaChartLine, FaHandshake, FaShieldAlt } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f1729] text-white">
        <title>Haque Garments- About Page</title>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-[#0f1729] to-blue-900/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}></div>
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-orange-500 text-sm uppercase tracking-[0.3em] font-semibold">Who We Are</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Crafting excellence in garment manufacturing with precision, passion, and unmatched quality standards
          </p>
        </div>
      </div>

      {/* Story Section with Image */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{once: false, amount: 0.3 }}
            className="space-y-8"
          >
            <div>
              <span className="text-orange-500 text-sm uppercase tracking-widest font-semibold">Our Journey</span>
              <h2 className="text-5xl font-bold mt-4 mb-8 leading-tight">
                Building Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Since Day One</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                Our story began with a simple vision: to create garments that blend traditional craftsmanship with modern innovation. Today, we stand as a testament to that vision, delivering premium quality products to clients worldwide.
              </p>
              <p>
                With state-of-the-art facilities and a team of dedicated professionals, we've transformed the way garments are manufactured. Every stitch, every fabric, every detail is carefully considered to ensure perfection.
              </p>
              <p>
                Our commitment goes beyond just making clothes – we're creating lasting relationships built on trust, quality, and reliability.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500">15+</div>
                <div className="text-sm text-slate-400 mt-1">Years</div>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500">50K+</div>
                <div className="text-sm text-slate-400 mt-1">Products</div>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500">500+</div>
                <div className="text-sm text-slate-400 mt-1">Clients</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3  }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800" 
                alt="Manufacturing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-orange-500/20 rounded-3xl blur-3xl"></div>
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-blue-500/20 rounded-3xl blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-900/50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-orange-500 text-sm uppercase tracking-widest font-semibold">What Drives Us</span>
            <h2 className="text-5xl font-bold mt-4">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaAward className="text-4xl" />,
                title: "Premium Quality",
                desc: "Every product meets international quality standards with rigorous testing and inspection processes."
              },
              {
                icon: <FaUsers className="text-4xl" />,
                title: "Customer First",
                desc: "Your satisfaction drives everything we do. We build lasting relationships through exceptional service."
              },
              {
                icon: <FaChartLine className="text-4xl" />,
                title: "Innovation",
                desc: "Embracing cutting-edge technology and modern techniques to stay ahead in the industry."
              },
              {
                icon: <FaBullseye className="text-4xl" />,
                title: "Precision",
                desc: "Meticulous attention to detail ensures every garment is crafted to absolute perfection."
              },
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: "Reliability",
                desc: "Consistent delivery of high-quality products on time, every time, without compromise."
              },
              {
                icon: <FaHandshake className="text-4xl" />,
                title: "Trust",
                desc: "Building transparent, honest relationships with clients, suppliers, and team members."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
             
                
                className="group relative bg-[#1a2332] p-10 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-orange-500 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <span className="text-orange-500 text-sm uppercase tracking-widest font-semibold">Why Partner With Us</span>
          <h2 className="text-5xl font-bold mt-4">
            What Makes Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Different</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-8"
          >
            {[
              {
                title: "State-of-the-Art Facilities",
                desc: "Our modern manufacturing units are equipped with the latest machinery and technology for superior production."
              },
              {
                title: "Skilled Workforce",
                desc: "A team of experienced professionals dedicated to maintaining the highest standards of craftsmanship."
              },
              {
                title: "Quality Assurance",
                desc: "Multi-stage quality checks ensure every product meets international standards before delivery."
              },
              {
                title: "Timely Delivery",
                desc: "Efficient production processes and logistics ensure your orders arrive exactly when you need them."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3  }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" 
                alt="Factory"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 mb-20">
        <div className="relative overflow-hidden rounded-3xl  bg-gradient-to-r from-orange-500 to-red-500 p-16 text-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with our expertise and commitment to excellence
            </p>
            <button className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              Get In Touch →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}