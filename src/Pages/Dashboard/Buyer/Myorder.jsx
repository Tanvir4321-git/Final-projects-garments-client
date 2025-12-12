import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { Authcontext } from '../../../Components/Context/Authcontext';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';
import { Link } from 'react-router';

const Myorder = () => {
    const { user } = use(Authcontext)
    const axioshook = useAxiosHook()

    const { data: orders = [] } = useQuery({


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
                            <th>No</th>
                            <th>Order ID </th>
                            <th>Product</th>
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
                                <th>{i + 1}</th>
                                <td>{order._id}</td>
                                <td>{order.productname}</td>
                                <td>{order.quantity}</td>
                                <td>{order.status}</td>
                                <td>

                                {
                                    order.paymentStatus === 'paid' ? <button className=' text-white   '>Paid</button> :order.paymentStatus === 'Cash on Delivery'?<button className='  text-white   '>Cash on Delivery</button>: <Link onClick={() => handlePay(order)} className='btn bg-[#e45904] text-white'>Pay</Link>
                                }
                                </td>

                               
                                <td>cancel</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myorder;