import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Home/Navbar';
import Footer from '../Pages/Home/Footer';

const RootLayout = () => {
    return (
        <div>
          <header>
            <Navbar></Navbar>
          </header>
          <main className='bg-linear-to-br from-gray-900 via-gray-800 to-black'><Outlet></Outlet></main>
          
          <footer>
            <Footer></Footer>
          </footer>
        </div>
    );
};

export default RootLayout;