import React from 'react';
import img from '../assets/error1.jpg'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div   style={{ backgroundImage: `url(${img})` }} className=' min-h-screen bg-center bg-cover'>
          <div className='flex items-center justify-center  pt-[450px] pr-[30px]'>
           <Link to='/'>
           <button className='bg-[#211f71] text-white px-10 py-8 rounded-[10px]  text-2xl font-semibold btn '>Go to Home</button>
           </Link>

          </div>
        </div>
    );
};

export default ErrorPage;