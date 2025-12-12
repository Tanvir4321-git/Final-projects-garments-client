/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { use } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { useForm, useWatch } from 'react-hook-form';
import Swal from 'sweetalert2'
// import { toast } from 'react-toastify';
import { Authcontext } from '../Components/Context/Authcontext';
import useAxiosHook from '../Components/CustomHooks/useAxiosHook';
import { useState } from 'react';
import { useEffect } from 'react';



const OrderForm = () => {
    const axioshook=useAxiosHook()
    const navigate=useNavigate()
    const location = useLocation();
    const product = location.state;

    const [totalamount,settotalamount]=useState(0)

    const { user,loading } = use(Authcontext)
    const { register, handleSubmit, control, formState: { errors } } = useForm()
    const quantity = useWatch({
        name: "quantity",
        control: control
    }) || 1;
    
    useEffect(()=>{
  if(product.price || quantity){
      const totalPrice = quantity * product.price

settotalamount(totalPrice)
//  setValue('price', totalPrice);

  }

},[product,quantity])

    const handleorder = (data, e) => {
const newData={...data,price:totalamount,trackingId:product.trackingId}
    const action = e.nativeEvent.submitter.value; 
  

    if (action === "cod") {
    
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, confirm!"
}).then((result) => {
  if (result.isConfirmed) {
  const info={
    ...newData,paymentStatus:'Cash on Delivery'
  }
 
    axioshook.post('/delivery',info)
    .then(()=>{

        navigate('/dashboard/my-orders')

        Swal.fire({
          title: "Confirm!",
          text: "Your order has been submited.",
          icon: "success",
         
        });
    })


  }
});


    } else if (action === "online") {
     Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Confirm!"
}).then((result) => {
  if (result.isConfirmed) {
const info={
    ...newData,paymentStatus:'Unpaid'
  }
 axioshook.post('/delivery',info)
    .then(async()=>{
        Swal.fire({
          title: "Confirm!",
          text: "GO for pay.",
          icon: "success"
        });

        navigate('/dashboard/my-orders')


    })

  }
});

    }
}

if(loading)return <p>Loading..</p>


// console.log(totalamount)
// console.log(product.price)

    return (
        <div className='w-11/12 mx-auto  flex lg:flex-row flex-col items-center gap-10 md:gap-20 py-20'>
            <div className='lg:w-[40%] w-full'>
                <motion.h2 initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, }} className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
                    Place Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"> Order</span>
                </motion.h2>
                <p className='text-[20px] text-center font-semibold text-gray-400'>Join Fill in the details below to complete your purchase

                </p>
                <div className='p-4 mt-5 border-2 border-[#36465c] rounded-xl bg-white/5 backdrop-blur-sm '>
                    <p className='text-white text-center text-[18px]' >✓ Secure Checkout <span className=' text-transparent bg-clip-text   bg-linear-to-r from-orange-500 to-red-500'><br />Your data is protected</span>
                    </p>
                </div>
                <div className='p-4 mt-5 border-2 border-[#36465c] rounded-xl bg-white/5 backdrop-blur-sm '>
                    <p className='text-white text-center text-[18px]' >✓ Fast Delivery <span className=' text-transparent bg-clip-text   bg-linear-to-r from-orange-500 to-red-500'><br />Within 10-14 business days</span>
                    </p>
                </div>
                <div className='p-4 mt-5 border-2 border-[#36465c] rounded-xl bg-white/5 backdrop-blur-sm '>
                    <p className='text-white text-center text-[18px]' >✓ Easy Returns<span className=' text-transparent bg-clip-text   bg-linear-to-r from-orange-500 to-red-500'><br />7 days return policy</span>
                    </p>
                </div>

            </div>
            <div className='lg:w-[50%] w-full'>

                <div className="hero bg-white/5 border-2 rounded-xl border-[#36465c] backdrop-blur-sm  min-h-screen">


                    <div className="card   w-full  shrink-0 shadow-2xl">
                        <div className="card-body  ">
                            <form onSubmit={handleSubmit(handleorder)}>

                                <fieldset className="fieldset   text-white text-[18px]">

                                    {/* email */}
                                    <label className="label">Email</label>
                                    <input {...register('email')} type="email" className="input w-full bg-amber-50 text-black" defaultValue={user?.email} readOnly />

                                    {/*product  name */}
                                    <label className="label">Product Title</label>
                                    <input type="text" {...register('productname')} className="input w-full  bg-amber-50 text-black" defaultValue={product?.productName} readOnly/>


                                    {/*Payment Info */}

                                    <label className="label">Payment Info</label>
                                    <input type="text" {...register('payment')} className="input w-full  bg-amber-50 text-black" defaultValue={product?.paymentOptions} readOnly/>


                                    {/* first name */}
                                    <label className="label">First Name</label>
                                    <input type="text" {...register('firstname', { required: 'FirstName is required' })} className="input w-full  bg-amber-50 text-black" placeholder='First Name' />
                                    {errors.firstname && <p className='text-red-600 text-[16px]'>{errors.firstname.message}</p>}

                                    {/* Last name */}
                                    <label className="label">Last Name</label>
                                    <input type="text" {...register('lastname')} className="input w-full  bg-amber-50 text-black" placeholder='Last Name' />

                                    {/* order quantity */}
                                    <label className="label">Order Quantity</label>
                                    <input
                                        type="number"
                                        {...register('quantity', {
                                            required: 'Quantity is required',
                                            min: {
                                                value: product.minimumOrder,
                                                message: `You have to buy at least ${product.minimumOrder}`
                                            },

                                            max: {
                                                value: product.availableQuantity,
                                                message: `You can't buy more than ${product.availableQuantity}`
                                            }
                                        })}

                                        className="input w-full bg-amber-50 text-black"
                                        placeholder='Quantity'
                                    />

                                    {errors.quantity && (
                                        <p className='text-red-600 text-[16px]'>{errors.quantity.message}</p>
                                    )}

                                    {/* price */}
                                    <label className="label">Total price</label>
                                    <input type="text" readOnly className="input w-full  bg-amber-50 text-black" value={totalamount}  />

                                    {/* number */}
                                    <label className="label">Contact Number
                                    </label>
                                    <input type="number" {...register('contactnumber', { required: 'Contact Number is required' })} className="input w-full  bg-amber-50 text-black" placeholder='Contact Number' />
                                    {errors.contactnumber && <p className='text-red-600 text-[16px]'>{errors.contactnumber.message}</p>}

                                    {/* Address */}
                                    <label className="label">Delivery Address</label>
                                    <input type="text" {...register('address', { required: 'Delivery Address is required' })} className="input w-full  bg-amber-50 text-black" placeholder='Delivery Address' />
                                    {errors.address && <p className='text-red-600 text-[16px]'>{errors.address.message}</p>}

                                    <label className="label">Additional Notes  </label>
                                    <textarea   rows={4}  className="w-full rounded  bg-amber-50 text-black" {...register('notes')} placeholder="Additional Notes / Instructions"></textarea>




                                       {
                                        product.paymentOptions==='Cash on Delivery'?  <motion.div

                                        whileTap={{ scale: 0.9, y: 2 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}

                                    >
                                       <button value='cod' className=' button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center' >Cofirm Your Order  <span className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></span></button>
                                    </motion.div>:<motion.div

                                        whileTap={{ scale: 0.9, y: 2 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}

                                    >
                                        <button value='online'  className=' button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center' >Cofirm and Go for Pay  <span className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></span></button>
                                    </motion.div>
                                       }
                                    {/* button */}
                                  


                                </fieldset>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default OrderForm;