/* eslint-disable react-hooks/refs */
/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosHook from '../../Components/CustomHooks/useAxiosHook';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';


const DashAllProducts = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const axioshook = useAxiosHook()
    const updateref=useRef()
    // const [added,setadded]=useState([])
     const { register, handleSubmit,  formState: { errors } } = useForm()

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axioshook('/all-products')
            return res.data
        }
    })


    const handleDelete = (product) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axioshook.delete(`/delete/${product._id}`)
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });




    }

    const handleCheck=async(e,product)=>{
          if (e.target.checked){
            
           await axioshook.post('/our-products',product)
           refetch()
            Swal.fire("Added to home!")
          }

        // setadded([...added, product._id])
    }

const handlemodalOpen=(product)=>{
    setSelectedProduct(product);
updateref.current.showModal()

}

const handleUpdate = async (data, id) => {
     const {
    productName,
    category,
    price,
    video,
    paymentOptions,
    description
  } = data;
  try {
    const updateinfo={
 productName,
    category,
    price,
    video,
    paymentOptions,
    description
    }
    await axioshook.patch(`/product-update/${id}`, updateinfo);
   
    refetch()
    Swal.fire("Product updated!");
        updateref.current.close();
    
  } catch (error) {
    Swal.fire("Error updating product");
  }
}
    
    if (isLoading) return <Loading></Loading>





    return (
        <div className='text-white p-8'>
            <h2 className="text-2xl  font-bold text-white mb-8">
                All Products
            </h2>
            <h3>Total Products: {products.length}</h3>




            <div className="overflow-x-auto mt-8 rounded-lg border border-slate-700">
                <table className="table w-full">
                    {/* head */}
                    <thead className='text-white bg-slate-800'>
                        <tr className=''>
                            <th className="text-sm font-semibold"> Image </th>
                            <th className="text-sm font-semibold">Product Name</th>
                            <th className="text-sm font-semibold"> Price</th>
                            <th className="text-sm font-semibold">Category</th>
                            <th className="text-sm font-semibold">Created By</th>
                            <th className="text-sm font-semibold">Show on Home</th>
                            <th className="text-sm font-semibold">Update</th>
                            <th className="text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            products.map((product, i) => <tr key={i} className="hover:bg-slate-800/50 border-b border-slate-700">
                                <th><img className='w-12 h-12 rounded object-cover' src={product.image} alt="" /></th>
                                <td className="text-sm">{product.productName}</td>
                                <td className="text-sm">{product.price}</td>
                                <td className="text-sm">{product.category}</td>
                                <td className="text-sm">{product.createdBy}</td>

                                {
                                      product.showonHome==='added'?<td><span className='px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30'>Added to home</span></td>: <td>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheck(e, product)}
                                            className="checkbox checkbox-success checkbox-sm"
                                        />
                                        <span className="text-xs text-slate-400">Show</span>
                                    </label>
                                </td>
                                }
                               
                                <td>
                                    <button 
                                        onClick={() => handlemodalOpen(product)} 
                                        className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors'
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(product)}
                                        className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors'
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>

<dialog ref={updateref} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box  bg-white/5 border-2 rounded-xl border-[#36465c] backdrop-blur-sm">
    <div className="hero  ">

   <div className="card w-full shrink-0 shadow-2xl">
                      <div className="card-body">
                          <form onSubmit={handleSubmit((data)=>handleUpdate(data, selectedProduct._id))}>
  
                              <fieldset className="fieldset  text-white text-[18px]">
                                  <div className='space-y-3'>
                                      {/* Product Name */}
                                      <label className="label">Product Name </label>
                                      <input
                                          type="text"
                                          {...register('productName', { required: 'Product name is required' })}
                                          className="input w-full bg-amber-50 text-black"
                                         defaultValue={selectedProduct?.productName} placeholder="Product Name"
                                      />
                                      {errors.productName && <p className='text-red-600 text-[16px]'>{errors.productName.message}</p>}
  
                                     
  
  
  
                                      {/* Category */}
                                      <label className="label">Category</label>
                                      <select
                                          {...register('category', { required: 'Select category' })}
                                          className="select w-full bg-amber-50 text-black"
                                            defaultValue={selectedProduct?.category} 
                                      >
                                          <option value="" disabled>Select Category</option>
                                          <option value="Shirt">Shirt</option>
                                          <option value="Pant">Pant</option>
                                          <option value="Jacket">Jacket</option>
                                          <option value="Accessories">Accessories</option>
                                      </select>
                                      {errors.category && <p className='text-red-600 text-[16px]'>{errors.category.message}</p>}
  
                                      {/* Price */}
                                      <label className="label">Price</label>
                                      <input
                                        defaultValue={selectedProduct?.price} 
                                          type="number"
                                          {...register('price', { required: 'Price is required' })}
                                          className="input w-full bg-amber-50 text-black"
                                          placeholder="Price"
                                      />
                                      {errors.price && <p className='text-red-600 text-[16px]'>{errors.price.message}</p>}
  
                                    
                                     
  
                                  </div>
  
  
                                  {/* ////////// */}
                                  <div className='space-y-3'>
  
                                     
  
                                      {/* Demo Video */}
                                      <label className="label">Demo Video Link (Optional)</label>
                                      <input
                                          type="text"
                                          {...register('video')}
                                          className="input w-full bg-amber-50 text-black"
                                          placeholder="https://youtube.com/..."
                                      />
  
                                      {/* Payment Options */}
                                      <label className="label">Payment Options</label>
                                      <select
                                          {...register('paymentOptions', { required: 'Select payment method' })}
                                          className="select w-full bg-amber-50 text-black"
                                           defaultValue={selectedProduct?.paymentOptions} 
                                      >
                                          <option value="" disabled>Select Payment Method</option>
                                          <option value="Cash on Delivery">Cash on Delivery</option>
                                          <option value="PayFirst">PayFirst</option>
                                      </select>
                                      {errors.paymentOptions && <p className='text-red-600 text-[16px]'>{errors.paymentOptions.message}</p>}
  
                                      {/* Description */}
                                      <label className="label">Product Description</label>
                                      <textarea
                                          {...register('description', { required: 'Description is required' })}
                                          rows={4}
                                          className="w-full rounded bg-amber-50 text-black p-2"
                                          placeholder="Write product details..."
                                            defaultValue={selectedProduct?.description} 
                                      ></textarea>
                                      {errors.description && <p className='text-red-600 text-[16px]'>{errors.description.message}</p>}
  
                                      {/* Button */}
                                      <motion.div
                                          whileTap={{ scale: 0.9, y: 2 }}
                                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                      >
                                          <button className='button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center'>
                                            Product Updated
                                              <span className='arrow py-2 px-3 '>
                                                  <FaArrowRight className='size-2 md:size-3' />
                                              </span>
                                          </button>
                                      </motion.div>
                                  </div>
  
  
  
  
  
                              </fieldset>
  
                          </form>
                      </div>
                  </div>
    </div>
    <div className="overflow-x-auto">
 
</div>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
 

            </div>
        </div>
    );
};

export default DashAllProducts;