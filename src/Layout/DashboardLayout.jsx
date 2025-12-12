import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import logo from '../assets/logo1.jpg'
import { LuCodesandbox, LuUsers, } from "react-icons/lu";
import { MdProductionQuantityLimits } from "react-icons/md"
import { GrDeliver } from "react-icons/gr";
import useRole from '../Components/CustomHooks/useRole';
const DashboardLayout = () => {
  const { role } = useRole()
  return (
    <div className="drawer lg:drawer-open bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <title>Dashboard</title>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />
      <div className="drawer-content ">
        {/* Navbar */}
        <nav className="navbar border-b border-gray-400 w-full bg-[#121a25]">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="white" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4 text-3xl text-white">Haque <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500" >Garmnets</span></div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible ">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64 border-r border-gray-400 w-full bg-[#121a25]  ">

          {/* Sidebar content here */}
          <ul className="menu w-full grow text-white text-[18px]">
            <NavLink to='/'> <img src={logo} className='w-10' alt="" /> </NavLink>
            {/* List item */}
            <li>
              <button className="is-drawer-close:tooltip hover:bg-[#ff6200] is-drawer-close:tooltip-right" data-tip="Homepage">

                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden ">Homepage</span>
              </button>
            </li>

            {/* // admin route */}

            {
              role.role === 'admin' && <>
                {/* Admin manage users*/}

                <NavLink to='manage-users'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] is-drawer-close:tooltip-right" data-tip="manage-users">
                      {/* Settings icon */}
                      <LuUsers />
                      <span className="is-drawer-close:hidden">manage-users </span>
                    </button>
                  </li>
                </NavLink>

                {/* Admin All products*/}
                <NavLink to='dash-all-products'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] is-drawer-close:tooltip-right" data-tip="All-Products">
                      {/*  icon */}
                      <MdProductionQuantityLimits />
                      <span className="is-drawer-close:hidden">All Products </span>
                    </button>
                  </li>
                </NavLink>
                {/* Admin All orders*/}
                <NavLink to='all-orders'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] is-drawer-close:tooltip-right" data-tip="All Orders">
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
                role.role==='manager'  && <>
                {/* add products */}
                   <NavLink to='add-products'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] is-drawer-close:tooltip-right" data-tip="Add Products">
                      {/* icon */}
                      <LuCodesandbox />
                      <span className="is-drawer-close:hidden">Add Products</span>
                    </button>
                  </li>
                </NavLink>
                </>
            }

           {/* // buyer */}
           {/* my-orders */}
           <NavLink to='my-orders'>
                  <li>
                    <button className="is-drawer-close:tooltip hover:bg-[#ff6200] is-drawer-close:tooltip-right" data-tip="My Orders">
                      {/* icon */}
                      <LuCodesandbox />
                      <span className="is-drawer-close:hidden">My Orders</span>
                    </button>
                  </li>
                </NavLink>
          




            <li>
              <button className="is-drawer-close:tooltip hover:bg-[#ff6200] is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;