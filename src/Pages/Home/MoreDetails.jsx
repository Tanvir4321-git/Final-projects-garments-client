import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';

const MoreDetails = () => {
    const {id}=useParams()
    console.log(id)
     const { data: product = [] } = useQuery({
        queryKey: ['our-products',id],
        queryFn: async () => {
            const res = await axios(`http://localhost:3000/our-products/${id}`)
            return res.data
        }
    })

    return (
        <div >
            
            <div className='w-11/12 mx-auto py-16 text-white flex items-center gap-3 md:gap-8 md:flex-row flex-col  '>
       <div className="w-1/2"> 
       <img className='rounded-xl' src={product.image} alt="" />
       </div>
       <div className="w-1/2">
       <h2 className='font-semibold text-[20px] mb-8'> {product.name}</h2>
       <p className='leading-7'>{product.details}</p>
       </div>

            </div>
            
        </div>
    );
};

export default MoreDetails;