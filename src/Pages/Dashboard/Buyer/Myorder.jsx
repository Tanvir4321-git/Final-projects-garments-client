import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import { Authcontext } from '../../../Components/Context/Authcontext';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';
import { Link } from 'react-router';
import ViewDetailsModal from './ViewDetailsModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Myorder = () => {
    const { user } = use(Authcontext)
    const axioshook = useAxiosHook()
 const detailsRef = useRef()
    const [selectedProduct, setSelectedProduct] = useState({});
    const { data: orders = [],refetch } = useQuery({


        queryKey: ['myOrder', user?.email],
        queryFn: async () => {
            const res = await axioshook.get(`/orders?email=${user?.email}`)
            return res.data
        }
    })

    const handlePay=async(order)=>{

          const paymentinfo = {
                cost: order.price,
                parcelId: order._id,
                ParcelName:order.productname,
                Senderemail: order.email,
                trackingId:order.trackingId


            }


     const res = await axioshook.post('/create-checkout-session', paymentinfo)
            window.location.assign(res.data.url)


    }

//   const handleCancle=()  
const handleCancle=async(order)=>{

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Cancel it!"
}).then(async(result) => {
  if (result.isConfirmed) {
 await axioshook.delete(`/myorder/${order._id}`)
   
   refetch()

    Swal.fire({
      title: "Canceled!",
      text: "Your file has been Canceled.",
      icon: "success"
    });
  }
});







  

}

 const handlemodalOpen = (order) => {
        setSelectedProduct(order);
        detailsRef.current.showModal()

    }


    return (
        <div className='text-white p-8'>
                  <title>Haque Garments-Buyer Order Page</title>
            <h2 className="text-2xl  font-bold text-white mb-8">
                My Orders
            </h2>
            <h3 className="text-lg mb-4">Total Orders: <span className=" font-bold">{orders.length}</span></h3>




            <div className="overflow-x-auto mt-8 rounded-lg border border-slate-700">
                <table className="table w-full">
                    {/* head */}
                    <thead className='text-white bg-slate-800'>
                        <tr className=''>
                            <th className="text-sm font-semibold">Order ID </th>
                            <th className="text-sm font-semibold">Product</th>
                            <th className="text-sm font-semibold">Track your Order</th>
                            <th className="text-sm font-semibold">Quantity</th>
                            <th className="text-sm font-semibold">Status</th>
                            <th className="text-sm font-semibold">Payment</th>
                            <th className="text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            orders.map((order, i) => <tr key={i} className="hover:bg-slate-800/50 border-b border-slate-700">
                                <td className="text-sm font-mono">{order._id}</td>
                                <td className="text-sm">{order.productname}</td>
                                <td>
                                    <Link 
                                        to={`/dashboard/order/${order.trackingId}`}
                                        className="text-blue-400 hover:text-blue-300 underline text-sm font-mono"
                                    >
                                        {order.trackingId}
                                    </Link>
                                </td>
                                <td className="text-sm">{order.quantity}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        order.status === 'approved' || order.status === 'Approved'
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
                                {
                                    order.paymentStatus === 'paid' ? 
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">
                                        Paid
                                    </span>
                                    : order.paymentStatus === 'Cash on Delivery' ?
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/30">
                                        Cash on Delivery
                                    </span>
                                    : 
                                    <button 
                                        onClick={() => handlePay(order)} 
                                        className='px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors'
                                    >
                                        Pay Now
                                    </button>
                                }
                                </td>

                               
                                <td>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handlemodalOpen(order)}  
                                            className='px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors'
                                        >
                                            View
                                        </button>
                                        {
                                            order.status!=='approved' && 
                                            <button 
                                                onClick={()=> handleCancle(order)}  
                                                className='px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold transition-colors'
                                            >
                                                Cancel
                                            </button>
                                        }
                                    </div>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
                <ViewDetailsModal order={selectedProduct} detailsRef={detailsRef}/>
            </div>
        </div>
    );
};

export default Myorder;