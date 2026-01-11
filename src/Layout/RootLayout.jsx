import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Home/Navbar';
import Footer from '../Pages/Home/Footer';

const RootLayout = () => {
    return (
        <div >
        
            <Navbar></Navbar>
      
          <main className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 
dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black"
><Outlet></Outlet></main>
          
          <footer>
            <Footer></Footer>
          </footer>
        </div>
    );
};

export default RootLayout;