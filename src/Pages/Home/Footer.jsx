import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/logo1.jpg'

import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
const Footer = () => {
    return (
       <div className='bg-linear-to-br from-gray-900 via-gray-800 to-black py-10 '>
        <footer className="footer footer-horizontal footer-center p-4 w-11/12 mx-auto rounded-2xl bg-black text-base-content  border border-[#252f3e] ">
        <img className='md:w-24 w-16' src={logo} alt="" />
  <nav className="grid grid-flow-col text-white text-[18px] gap-4">
  <Link to='/'>Home</Link>
  <Link to='/all-products'>All-Product</Link>
  <Link to='/about'>About Us</Link>
  <Link to='/contact'>Contact</Link>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <FaXTwitter  size={30} color='white' />
     <FaFacebook  size={30} color='blue'></FaFacebook>
     <FaYoutube  size={30} color='red'></FaYoutube>
    </div>
  </nav>
  <aside>
    <p className='text-white'>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>

       </div>
    );
};

export default Footer;