import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';
import { Authcontext } from '../../../Components/Context/Authcontext';
import { toast } from 'react-toastify';
import OrderDetailsModal from './OrderDetailsModal';
import useRole from '../../../Components/CustomHooks/useRole';
import Swal from 'sweetalert2'
const PendingOrder = () => {
    const axioshook = useAxiosHook()
    const { user } = use(Authcontext)
    const detailsRef = useRef()
    const [selectedProduct, setSelectedProduct] = useState({});
     const { role,status } = useRole()

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['pending-orders', user?.email,],
        queryFn: async () => {
            const res = await axioshook(`/pending-orders?email=${user?.email}`)


            return res.data
        }
    })


    const statusUpdate = async (order, status) => {
        const info = {
            status: status,
            trackingId: order.trackingId

        }

        await axioshook.patch(`/order-approved/${order._id}`, info)
    }

    const hadleapprove = async (order) => {
        if( role.role!=='Manager' || role.status ==='suspended' ){
            return toast('You are suspended, you can not Approve')
        }
        if(order.payment==='PayFirst' && order.paymentStatus==='Unpaid'){
            Swal.fire({
  title: "Are you sure?",
  text: "This Buyer is not Paid yet!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes Go Ahead!"
}).then(async(result) => {
  if (result.isConfirmed) {
  await statusUpdate(order, 'approved')
        toast('Order Accepted')
        refetch()

    Swal.fire({
      title: "Confirm!",
      text: "Your Order has been Accepted.",
      icon: "success"
    });
  }
});
        }
      
    }

    const hadlereject = async (order) => {
        if( role.role!=='Manager' || role.status ==='suspended' ){
            return toast('You are suspended, you can not Reject')
        }
        await statusUpdate(order, 'reject')
        toast('Order Rejected')
        refetch()

    }

    const handlemodalOpen = (order) => {
        setSelectedProduct(order);
        detailsRef.current.showModal()

    }


    return (
        <div className='text-white p-8'>
            <h2 className="text-2xl  font-bold text-white mb-8">
                Pending Orders
            </h2>
            <h3 className="text-lg mb-4">Total Pending Orders: <span className=" font-bold">{orders.length}</span></h3>

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
                            <th className="text-sm font-semibold">Order Date</th>
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
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="text-sm">
                                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => hadleapprove(order)} 
                                            className='px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition-colors'
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => hadlereject(order)} 
                                            className='px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold transition-colors'
                                        >
                                            Reject
                                        </button>
                                        <button 
                                            onClick={() => handlemodalOpen(order)} 
                                            className='px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors'
                                        >
                                            Details
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>

                <OrderDetailsModal order={selectedProduct} detailsRef={detailsRef} />

            </div>


        </div>
    );
};

export default PendingOrder;