import React from 'react';

import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div   className=' '>
          <div className='flex items-center justify-center min-h-screen  '>
         <div >
            <h1 className='font-extrabold text-[#211f71] text-[150px]'>Oops</h1>
           <p className='text-3xl font-bold text-center'>404 Page not Found</p>
           <Link className='flex items-center justify-center my-5' to='/'>
           <button className='bg-[#211f71]  text-white  py-8 rounded-[10px]  text-2xl font-semibold btn '>Go to Home</button>
           </Link>
         </div>

          </div>
        </div>
    );
};

export default ErrorPage;