import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';
import { Authcontext } from '../../../Components/Context/Authcontext';
import { toast } from 'react-toastify';
import OrderDetailsModal from './OrderDetailsModal';

const PendingOrder = () => {
    const axioshook = useAxiosHook()
    const { user } = use(Authcontext)
    const detailsRef = useRef()
    const [selectedProduct, setSelectedProduct] = useState({});

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
        await statusUpdate(order, 'approved')
        toast('Order Accepted')
        refetch()
    }

    const hadlereject = async (order) => {
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
            <h3>Total Pending Orders: {orders.length}</h3>

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
                            <th>Order Date</th>
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
                                <td>
                                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </td>



                                <td><button onClick={() => hadleapprove(order)} className='bg-white p-2 text-black rounded'>Approve</button><button onClick={() => hadlereject(order)} className=' ml-2 bg-white p-2 text-black rounded'>Reject</button><button onClick={() => handlemodalOpen(order)} className=' ml-2 bg-white p-2 text-black rounded'>Details</button></td>
                            </tr>)
                        }


                    </tbody>
                </table>

<OrderDetailsModal order={selectedProduct} detailsRef={detailsRef}/>

                



            </div>


        </div>
    );
};

export default PendingOrder;