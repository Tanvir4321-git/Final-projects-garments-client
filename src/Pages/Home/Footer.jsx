import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/logo1.jpg'

import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
const Footer = () => {
    return (
       <div className='bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 
dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black py-10  '>
        <footer className="footer footer-horizontal footer-center p-4 w-11/12 mx-auto rounded-2xl dark:bg-black text-base-content bg-purple-300  border border-[#1c5cbd] ">
        <img className='md:w-24 w-16' src={logo} alt="" />
  <nav className="grid grid-flow-col dark:text-white text-black text-[18px] gap-4">
  <Link to='/'>Home</Link>
  <Link to='/all-products'>All-Product</Link>
  <Link to='/about'>About Us</Link>
  <Link to='/contact'>Contact</Link>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a target="_blank" href="https://x.com/">

      <FaXTwitter  size={30} color='dark:white black' />
      </a>
      <a target="_blank" href="https://www.facebook.com/">

     <FaFacebook  size={30} color='blue'></FaFacebook>
      </a>
      <a target="_blank" href="https://www.youtube.com/">
     <FaYoutube  size={30} color='red'></FaYoutube>
      </a>
    </div>
  </nav>
  <aside>
    <p className='dark:text-white text-black '>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>

       </div>
    );
};

export default Footer;