import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import { Authcontext } from '../../../Components/Context/Authcontext';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';
import { Link } from 'react-router';
import ViewDetailsModal from './ViewDetailsModal';

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
   await axioshook.delete(`/myorder/${order._id}`)
   refetch()
}

 const handlemodalOpen = (order) => {
        setSelectedProduct(order);
        detailsRef.current.showModal()

    }


    return (
        <div className='text-white p-8'>
            <h2 className="text-2xl  font-bold text-white mb-8">
                My orders
            </h2>
            <h3>Total Orders:{orders.length}</h3>




            <div className="overflow-x-auto mt-8">
                <table className="table bg-">
                    {/* head */}
                    <thead className='text-white  '>
                        <tr className=''>
                            
                            <th>Order ID </th>
                            <th>Product</th>
                            <th>Track your Order</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            orders.map((order, i) => <tr key={i}>
                              
                                <td>{order._id}</td>
                                <td>{order.productname}</td>
                                <td>
                                    <Link to={`/dashboard/order/${order.trackingId}`}>{order.trackingId}</Link>
                                </td>
                                <td>{order.quantity}</td>
                                <td>{order.status}</td>
                                <td>

                                {
                                    order.paymentStatus === 'paid' ? <button className=' text-white   '>Paid</button> :order.paymentStatus === 'Cash on Delivery'?<button className='  text-white   '>Cash on Delivery</button>: <Link onClick={() => handlePay(order)} className='btn bg-[#e45904] text-white'>Pay</Link>
                                }
                                </td>

                               
                                <td><button onClick={() => handlemodalOpen(order)}  className='btn'>View Button</button>
                                {
                                    order.status!=='approved' && <button onClick={()=> handleCancle(order)}  className='btn ml-2'>Cancel</button>
                                }
                               
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