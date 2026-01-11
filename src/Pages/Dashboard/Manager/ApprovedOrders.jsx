import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import { Authcontext } from '../../../Components/Context/Authcontext';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';
import { toast } from 'react-toastify';
import AddTrackingModal from './AddTrackingModal';
import ViewTrackingModal from './ViewTrackingModal';
import Loading from '../../../Components/Loading';


const ApprovedOrders = () => {
    const { user,loading } = use(Authcontext)
    const axioshook = useAxiosHook()
    const trackingRef = useRef()
    const viewTrackingRef = useRef()
    const [selectedProduct, setSelectedProduct] = useState({});


    const { data: orders = [] } = useQuery({
        queryKey: ['approve-orders', user?.email,],
        queryFn: async () => {
            const res = await axioshook(`/approve-orders?email=${user?.email}`)


            return res.data
        }
    })

    // add tracking modal

    const handlemodalOpen = (order) => {
       
      
        setSelectedProduct(order);
        trackingRef.current.showModal()

    }
    // view tracking modal
    const viewemodalOpen = (order) => {
      
        setSelectedProduct(order);
        viewTrackingRef.current.showModal()
        

    }

if(loading)return<Loading></Loading>


    return (
        <div className='text-black dark:text-white  p-8'>
                  <title>Haque Garments-Approve Page</title>
            <h2 className="text-2xl  font-bold text-black dark:text-white  mb-8">
                Approved Orders
            </h2>
            <h3 className="text-lg mb-4">Total Approved Orders: <span className=" font-bold">{orders.length}</span></h3>

            <div className="overflow-x-auto mt-8 rounded-lg border border-[#1c5cbd]">
                <table className="table w-full">
                    {/* head */}
                    <thead className='text-white bg-slate-800'>
                        <tr className=''>
                            <th className="text-sm font-semibold">Tracking ID </th>
                            <th className="text-sm font-semibold">User</th>
                            <th className="text-sm font-semibold">Product</th>
                            <th className="text-sm font-semibold">Quantity</th>
                            <th className="text-sm font-semibold">Order Date</th>
                            <th className="text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            orders.map((order, i) => <tr key={i} className="dark:hover:bg-slate-800/80 hover:bg-green-200 border-b border-[#1c5cbd]">
                                <td className="text-sm font-mono">{order.trackingId}</td>
                                <td className="text-sm">{order.email}</td>
                                <td className="text-sm">{order.productname}</td>
                                <td className="text-sm">{order.quantity}</td>
                                <td className="text-sm">
                                    {new Date(order.timestamp).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handlemodalOpen(order)} 
                                            className='px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors'
                                        >
                                            Add Tracking
                                        </button>
                                        <button 
                                            onClick={() => viewemodalOpen(order)} 
                                            className='px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors'
                                        >
                                            View Tracking
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>



                {/* add tracking  */}

                <AddTrackingModal trackingRef={trackingRef} selectedProduct={selectedProduct} />

                {/* view tracking modal */}

                <ViewTrackingModal viewTrackingRef={viewTrackingRef} selectedProduct={selectedProduct} ></ViewTrackingModal>



            </div>

        </div>
    );
};

export default ApprovedOrders;