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
       
        if (order.paymentStatus === 'Unpaid') {
            return toast('This buyer has not paid yet')
        }
        setSelectedProduct(order);
        trackingRef.current.showModal()

    }
    // view tracking modal
    const viewemodalOpen = (order) => {
        console.log(order)
        setSelectedProduct(order);
        viewTrackingRef.current.showModal()
        

    }
console.log(selectedProduct)
if(loading)return<Loading></Loading>
console.log(selectedProduct?.
trackingId)

    return (
        <div className='text-white p-8'>
            <h2 className="text-2xl  font-bold text-white mb-8">
                Approved Orders
            </h2>
            <h3>Total Approved Orders Orders: {orders.length}</h3>

            <div className="overflow-x-auto mt-8">
                <table className="table ">
                    {/* head */}
                    <thead className='text-white  '>
                        <tr className=''>

                            <th>Order ID </th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>

                            <th>Order Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            orders.map((order, i) => <tr key={i} >

                                <td>{order.
trackingId}</td>
                                <td>{order.email}</td>
                                <td>{order.productname}</td>
                                <td>{order.quantity}</td>

                                <td>
                                    {new Date(order.timestamp).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </td>
                                <td>

                                    <button onClick={() => handlemodalOpen(order)} className=' ml-2 bg-white p-2 text-black rounded'>Add Tracking</button>

                                    <button onClick={() => viewemodalOpen(order)} className=' ml-2 bg-white p-2 text-black rounded'>View Tracking</button>
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