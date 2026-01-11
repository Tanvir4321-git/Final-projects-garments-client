/* eslint-disable no-unused-vars */
import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/logo1.jpg'
import { FaArrowRight } from 'react-icons/fa';
import { motion } from "framer-motion";
import { Authcontext } from '../../Components/Context/Authcontext';
import { toast } from 'react-toastify';
import profile from '../../assets/profile.jpg'
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from "react-icons/md";

const  Navbar = () => {
  const { logOut, user,loading } = use(Authcontext)
const {theme,setTheme}=useTheme()
// const [theme, setTheme] = useState(() => {
//   return localStorage.getItem('theme') || 'light';
// });

// //  Save to localStorage
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

// //  Toggle function
// const toggleTheme = () => {
//   setTheme(prev => prev === 'light' ? 'dark' : 'light');
// };


  const [open, setopen] = useState(false)
  const links = (
    <>
      <li>
        <NavLink to='/' className='nav-menu ' onClick={() => setopen(false)}>
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
      {
        user && <li>
        <NavLink to='/dashboard' className='nav-menu' onClick={() => setopen(false)}>
        Dashboard
        </NavLink>
      </li>
      }
    </>
  );

  const handlelogout = async () => {
    try {
      await logOut()
      toast('successfuly log out')
    } catch (err) {
toast(err?.message)
    }


  }


  return (
    <div className='dark:bg-black/90  bg-base-300 sticky top-0  z-50 shadow-sm '>
      <div className="navbar w-11/12 mx-auto ">


        <div className="navbar-start ">
          <div onClick={() => setopen(!open)} className="dropdown  z-50">

            <div tabIndex={0} role="button" className="  btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" color='white' viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul

              tabIndex="-1"
              className={`bg-black  menu menu-sm dropdown-content rounded-box  z-1 mt-3 w-52 p-2 shadow ${open ? 'block' : 'hidden'}`} >
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

      


          {
             loading?<span className="loading text-[#f9652f] loading-dots loading-xl"></span>: user?<> 

             
<button className="" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } }>
 <img className='rounded-[100%] w-10 mr-4 border border-[#f9652f]' src={user?user.photoURL:profile} alt="" />
</button>

<ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
  popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } }>
  <li><div className="flex items-center gap-2 ml-3 mt-2">
               {theme==='dark'?
<MdDarkMode  size={30}/>:<MdLightMode size={30} />}
                      <input
                        type="checkbox"
                        className="toggle"
                        defaultChecked={theme === "dark"}
                        onChange={() =>
                          setTheme(theme==='dark'?"light":'dark')
                        }
                      />
                    </div></li>
  {/* <li><a>Item 2</a></li> */}
</ul>

                 <motion.div

            whileTap={{ scale: 0.9, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}

          >
            <button onClick={handlelogout} className=' button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center' >Log Out  <span className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></span></button>
          </motion.div></> :<>  <motion.div

            whileTap={{ scale: 0.9, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}

          >
            <Link to='/login' className='ml-4 button  py-2 px-2 md:px-4 text-[14px] md:text-[17px] gap-2 whitespace-nowrap' >Log in <button className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></button></Link>
          </motion.div> <motion.div

            whileTap={{ scale: 0.9, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}

          >
            <Link to='/register' className='ml-4 button  py-2 px-2 md:px-4 text-[14px] md:text-[17px] gap-2' >Register  <button className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></button></Link>
          </motion.div>
          </>
          }

          


        </div>
      </div>




    </div>

  );
};

export default Navbar;