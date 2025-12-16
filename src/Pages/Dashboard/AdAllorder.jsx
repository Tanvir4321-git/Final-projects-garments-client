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
    const [search, setSearch] = useState('')
    const { data: orders = [] } = useQuery({
        queryKey: ['AdAll-orders', search],
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
                  <title>Haque Garments- All Order Page</title>
            <h2 className="text-2xl  font-bold text-white mb-8">
                All Orders
            </h2>
            <div className='flex items-center md:flex-row flex-col space-y-2  justify-between mb-4'>
                <h3 className="text-lg ">Total Orders: <span>{orders.length}</span></h3>
              
                    <label className="input input-bordered flex items-center gap-2 bg-slate-800 border-slate-600">
                        <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            className='text-white bg-transparent'
                            type="search"
                            placeholder="Search orders..."
                        />
                    </label>

                
            </div>

            <div className="overflow-x-auto mt-8 rounded-lg border border-slate-700">
                <table className="table w-full">
                    {/* head */}
                    <thead className='text-white bg-slate-800'>
                        <tr className=''>
                            <th className="text-sm font-semibold">Order ID </th>
                            <th className="text-sm font-semibold">User</th>
                            <th className="text-sm font-semibold">Product</th>
                            <th className="text-sm font-semibold">Quantity</th>
                            <th className="text-sm font-semibold">Status</th>
                            <th className="text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            orders.map((order, i) => <tr key={i} className="hover:bg-slate-800/50 border-b border-slate-700">
                                <td className="text-sm font-mono">{order._id}</td>
                                <td className="text-sm">{order.email}</td>
                                <td className="text-sm">{order.productname}</td>
                                <td className="text-sm">{order.quantity}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'approved' || order.status === 'Approved'
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : order.status === 'pending' || order.status === 'Pending'
                                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                : order.status === 'rejected' || order.status === 'Rejected'
                                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handlemodalOpen(order)}
                                        className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors'
                                    >
                                        Details
                                    </button>
                                </td>
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