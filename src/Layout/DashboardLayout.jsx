import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import logo from '../assets/logo1.jpg'
import { LuCodesandbox, LuUsers, } from "react-icons/lu";
import { MdOutlinePendingActions, MdProductionQuantityLimits } from "react-icons/md"
import { GrDeliver } from "react-icons/gr";
import useRole from '../Components/CustomHooks/useRole';
import { FaWpforms } from 'react-icons/fa';
import { SiManageiq } from "react-icons/si";
import { FcApproval } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import Navbar from '../Pages/Home/Navbar';
import Footer from '../Pages/Home/Footer';

const DashboardLayout = () => {
  const { role } = useRole()
  return (
    <>
   
    <div className="drawer lg:drawer-open bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 
dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <title>Dashboard</title>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />
      <div className="drawer-content ">
        {/* Navbar */}
        <nav className="navbar border-b border-gray-400 w-full bg-[#121a25]">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="white" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4 lg:text-3xl text-2xl text-white">{role.role==='admin'?'Admin':role.role==='Manager'?'Manager':role.role==='Buyer'?'Buyer':''}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500" >  Dashboard</span></div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible ">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64 border-r border-gray-400 w-full bg-[#121a25]  ">

          {/* Sidebar content here */}
          <ul className="menu w-full grow text-white text-[18px] ">
            <NavLink to='/'> <img src={logo} className='w-10 rounded-full mb-4' alt="" /> </NavLink>
          

            {/* // admin route */}

            {
              role.role === 'admin' && <>
                {/* Admin manage users*/}

                <NavLink to='manage-users'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white  is-drawer-close:tooltip-right" data-tip="manage-users">
                      {/* Settings icon */}
                      <LuUsers />
                      <span className="is-drawer-close:hidden">manage-users </span>
                    </button>
                  </li>
                </NavLink>

                {/* Admin All products*/}
                <NavLink to='dash-all-products'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white is-drawer-close:tooltip-right" data-tip="All-Products">
                      {/*  icon */}
                      <MdProductionQuantityLimits />
                      <span className="is-drawer-close:hidden">All Products </span>
                    </button>
                  </li>
                </NavLink>
                {/* Admin All orders*/}
                <NavLink to='all-orders'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white is-drawer-close:tooltip-right" data-tip="All Orders">
                      {/* Settings icon */}
                      <GrDeliver />
                      <span className="is-drawer-close:hidden">All Orders</span>
                    </button>
                  </li>
                </NavLink>
              </>
            }
            {/* manager route */}
            {
              role.role === 'Manager' && <>
                {/* add products */}
                <NavLink to='add-products'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white is-drawer-close:tooltip-right" data-tip="Add Products">
                      {/* icon */}
                      <FaWpforms />
                      <span className="is-drawer-close:hidden">Add Products</span>
                    </button>
                  </li>
                </NavLink>
                <NavLink to='manage-products'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white is-drawer-close:tooltip-right" data-tip="Manage Products">
                      {/* icon */}
                      <SiManageiq />
                      <span className="is-drawer-close:hidden">Manage Products</span>
                    </button>
                  </li>
                </NavLink>
                <NavLink to='pending-orders'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white is-drawer-close:tooltip-right" data-tip="Pending Orders">
                      {/* icon */}
                      <MdOutlinePendingActions />
                      <span className="is-drawer-close:hidden">Pending Orders</span>
                    </button>
                  </li>
                </NavLink>
                <NavLink to='approved-orders'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white is-drawer-close:tooltip-right" data-tip="Approved Orders">
                      {/* icon */}
                      <FcApproval />
                      <span className="is-drawer-close:hidden">Approved Orders</span>
                    </button>
                  </li>
                </NavLink>
              </>
            }

            {/* // buyer */}
            {/* my-orders */}
            {
              role.role === 'Buyer' && <>
                <NavLink to='my-orders'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white is-drawer-close:tooltip-right" data-tip="My Orders">
                      {/* icon */}
                      <LuCodesandbox />
                      <span className="is-drawer-close:hidden">My Orders</span>
                    </button>
                  </li>
                </NavLink>


              </>
            }

  
     {/* profile */}
       
            <NavLink to='my-Profile'>
              <li>
                <button className="is-drawer-close:tooltip hover:bg-[#ff6200] hover:text-white is-drawer-close:tooltip-right" data-tip="My Profile">
                  {/* icon */}
                  <CgProfile />
                  <span className="is-drawer-close:hidden">My Profile</span>
                </button>
              </li>
            </NavLink>
       
            




          </ul>
        </div>
      </div>
      
    </div>
   
    </>
  );
};

export default DashboardLayout;