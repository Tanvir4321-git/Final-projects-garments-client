import React from 'react';
import useAxiosHook from '../../Components/CustomHooks/useAxiosHook';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useState } from 'react';
import AdModal from './AdModal';

const AdAllorder = () => {
    const axioshook = useAxiosHook()
    const detailsRef = useRef()
    const [selectedProduct, setSelectedProduct] = useState({});
    const [search,setSearch]=useState('')
    const { data: orders = [] } = useQuery({
        queryKey: ['AdAll-orders',search],
        queryFn: async () => {
            const res = await axioshook(`/ad-allorders?search=${search}`)

            return res.data
        }
    })


    const handlemodalOpen = (order) => {
        setSelectedProduct(order);
        detailsRef.current.showModal()

    }


    return (
        <div className='text-white p-8'>
            <h2 className="text-2xl  font-bold text-white mb-8">
                All Orders
            </h2>
            <div className='flex items-center justify-between'>
                <h3>Total  Orders: {orders.length}</h3>
                <label class="input">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2.5"
                            fill="none"
                            stroke="black"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearch(e.target.value)} className='text-black' type="search" required placeholder="Search" />
                </label>
            </div>

            <div className="overflow-x-auto mt-8">
                <table className="table ">
                    {/* head */}
                    <thead className='text-white  '>
                        <tr className=''>

                            <th>Order ID </th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            orders.map((order, i) => <tr key={i} >

                                <td>{order._id}</td>
                                <td>{order.email}</td>
                                <td>{order.productname}</td>
                                <td>{order.quantity}</td>
                                <td>{order.status}</td>



                                <td><button onClick={() => handlemodalOpen(order)} className=' ml-2 bg-white p-2 text-black rounded'>Details</button></td>
                            </tr>)
                        }


                    </tbody>
                </table>

                <AdModal order={selectedProduct} detailsRef={detailsRef} />





            </div>
        </div>
    );
};

export default AdAllorder;