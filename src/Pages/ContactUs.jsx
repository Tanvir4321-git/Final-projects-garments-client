import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#0f1729] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-[#0f1729] to-blue-900/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}></div>
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-orange-500 text-sm uppercase tracking-[0.3em] font-semibold">Get In Touch</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Let's discuss how we can help bring your project to life
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaPhone className="text-3xl" />,
              title: "Phone",
              info: "+880 1234-567890",
              subInfo: "+880 9876-543210"
            },
            {
              icon: <FaEnvelope className="text-3xl" />,
              title: "Email",
              info: "info@company.com",
              subInfo: "support@company.com"
            },
            {
              icon: <FaMapMarkerAlt className="text-3xl" />,
              title: "Location",
              info: "Chattogram, Bangladesh",
              subInfo: "Visit us anytime"
            },
            {
              icon: <FaClock className="text-3xl" />,
              title: "Working Hours",
              info: "Mon - Sat: 9AM - 6PM",
              subInfo: "Sunday: Closed"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a2332] p-8 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300 text-center group"
            >
              <div className="text-orange-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-300 mb-1">{item.info}</p>
              <p className="text-slate-500 text-sm">{item.subInfo}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-10">
              <span className="text-orange-500 text-sm uppercase tracking-widest font-semibold">Send Message</span>
              <h2 className="text-4xl font-bold mt-4 mb-4">
                Let's Start a <span className="text-orange-500">Conversation</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-300">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-[#1a2332] border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-300">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-[#1a2332] border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1234-567890"
                    className="w-full bg-[#1a2332] border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="w-full bg-[#1a2332] border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-300">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows="6"
                  className="w-full bg-[#1a2332] border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Send Message →
              </button>
            </div>
          </motion.div>

          {/* Map & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Map */}
            <div className="bg-[#1a2332] rounded-2xl overflow-hidden border border-slate-800 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.735837328796!2d91.83777931495735!3d22.356851585279184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5bcb6905d9!2sChattogram%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Additional Info */}
            <div className="bg-[#1a2332] p-8 rounded-2xl border border-slate-800">
              <h3 className="text-2xl font-bold mb-6">Why Reach Out?</h3>
              <ul className="space-y-4">
                {[
                  "Get a free consultation for your project",
                  "Request a custom quote",
                  "Ask about our manufacturing process",
                  "Discuss bulk order discounts",
                  "Schedule a factory visit"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="bg-[#1a2332] p-8 rounded-2xl border border-slate-800">
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: <FaFacebook />, color: "hover:text-blue-500" },
                  { icon: <FaTwitter />, color: "hover:text-sky-500" },
                  { icon: <FaLinkedin />, color: "hover:text-blue-600" },
                  { icon: <FaInstagram />, color: "hover:text-pink-500" }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-xl text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-slate-700`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm uppercase tracking-widest font-semibold">Common Questions</span>
            <h2 className="text-4xl font-bold mt-4">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "What is your minimum order quantity?",
                a: "Our MOQ varies by product type. Contact us for specific details about your requirements."
              },
              {
                q: "How long does production take?",
                a: "Typical production time is 3-4 weeks depending on order size and complexity."
              },
              {
                q: "Do you offer custom designs?",
                a: "Yes! We specialize in custom garment manufacturing based on your specifications."
              },
              {
                q: "What are your payment terms?",
                a: "We accept multiple payment methods. Terms are discussed based on order volume."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1a2332] p-6 rounded-xl border border-slate-800"
              >
                <h3 className="text-lg font-bold mb-3 text-orange-500">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}