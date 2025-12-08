/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/logo1.jpg'
import { FaArrowRight } from 'react-icons/fa';
import { motion } from "framer-motion";
const Navbar = () => {
 

 const [open,setopen]=useState(false)
   const links = (
  <>
    <li>
      <NavLink to='/' className='nav-menu' onClick={() => setopen(false)}>
        Home
      </NavLink>
    </li>

    <li>
      <NavLink to='/all-products' className='nav-menu' onClick={() => setopen(false)}>
        All-Product
      </NavLink>
    </li>

    <li>
      <NavLink to='/about' className='nav-menu' onClick={() => setopen(false)}>
        About Us
      </NavLink>
    </li>

    <li>
      <NavLink to='/contact' className='nav-menu' onClick={() => setopen(false)}>
        Contact
      </NavLink>
    </li>
  </>
);


    return (
        <div className='bg-black shadow-sm '>
            <div className="navbar w-11/12 mx-auto ">


                <div className="navbar-start ">
                    <div onClick={()=>setopen(!open)} className="dropdown  z-50">
                         
                        <div tabIndex={0} role="button" className="  btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" color='white' viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                       
                            tabIndex="-1"
                            className={`bg-black  menu menu-sm dropdown-content rounded-box  z-1 mt-3 w-52 p-2 shadow ${open? 'block':'hidden'}`} >
                            {links}
                        </ul>
                    </div>
                    <img className='md:w-24 w-16' src={logo} alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">

                    
                    <motion.div
                      
                        whileTap={{ scale: 0.9, y: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        
                    >
                       <Link to='/login' className='ml-4 button  py-2 px-2 md:px-4 text-[14px] md:text-[17px] gap-2 whitespace-nowrap' >Log in <button className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></button></Link>
                    </motion.div>
                    <motion.div
                      
                        whileTap={{ scale: 0.9, y: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        
                    >
                       <Link to='/register' className='ml-4 button  py-2 px-2 md:px-4 text-[14px] md:text-[17px] gap-2' >Register  <button className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></button></Link>
                    </motion.div>

                   
                </div>
            </div>




        </div>

    );
};

export default Navbar;