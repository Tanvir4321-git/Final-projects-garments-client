/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/refs */
import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import { Authcontext } from '../../../Components/Context/Authcontext';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';
import Loading from '../../../Components/Loading';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from "framer-motion";


const ManageProducts = () => {
    const updateref = useRef()
    const axioshook = useAxiosHook()
    const { user } = use(Authcontext)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [search, setSearch] = useState('')

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-product', user?.email, search],
        queryFn: async () => {
            const res = await axioshook(`/manage-products?email=${user?.email}&search=${search}`)


            return res.data
        }
    })


    const handlemodalOpen = (product) => {
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
            const updateinfo = {
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



    // manager delete ar jonno server a api lage nai.manager ar ta dia hoise.
    const handleDelete = (product) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
              await  axioshook.delete(`/delete/${product._id}`)
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });




    }

    // if (isLoading) return <Loading></Loading>

    return (
        <div className='text-white p-8'>
            <h2 className="text-2xl  font-bold text-white mb-8">
                Manage Products
            </h2>
            <div className='flex items-center md:flex-row flex-col justify-between mb-4'>
                <h3 className="text-lg">Total Products: <span className=" font-bold">{products.length}</span></h3>

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
                        placeholder="Search products..." 
                    />
                </label>
            </div>


            <div className="overflow-x-auto mt-8 rounded-lg border border-slate-700">
                <table className="table w-full">
                    {/* head */}
                    <thead className='text-white bg-slate-800'>
                        <tr className=''>
                            <th className="text-sm font-semibold"> Image </th>
                            <th className="text-sm font-semibold">Product Name</th>
                            <th className="text-sm font-semibold"> Price</th>
                            <th className="text-sm font-semibold">Payment mode</th>
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
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        product.paymentOptions === 'Cash on Delivery'
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                    }`}>
                                        {product.paymentOptions}
                                    </span>
                                </td>
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
                                    <form onSubmit={handleSubmit((data) => handleUpdate(data, selectedProduct._id))}>

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

                                                {/* Short desc */}
                                                <label className="label">Short Description </label>
                                                <input
                                                    defaultValue={selectedProduct?.shortDescription}
                                                    type="text"
                                                    {...register('shortDescription', { required: 'Short Description is required' })}
                                                    className="input w-full bg-amber-50 text-black"
                                                    placeholder="Short Description"
                                                />
                                                {errors.shortDescription && <p className='text-red-600 text-[16px]'>{errors.shortDescription.message}</p>}



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

                                                {/* Available Quantity */}
                                                <label className="label">Available Quantity</label>
                                                <input
                                                    defaultValue={selectedProduct?.availableQuantity}
                                                    type="number"
                                                    {...register('availableQuantity', { required: 'Available quantity required' })}
                                                    className="input w-full bg-amber-50 text-black"
                                                    placeholder="Available Quantity"
                                                />
                                                {errors.availableQuantity && <p className='text-red-600 text-[16px]'>{errors.availableQuantity.message}</p>}


                                            </div>


                                            {/* ////////// */}
                                            <div className='space-y-3'>

                                                {/* Images
                                                <label className="label">Images Upload</label>
                                                <input
                                                    // defaultValue={selectedProduct.image} 
                                                    type="file"
                                                    multiple
                                                    {...register('image', { required: 'Upload images' })}
                                                    className="file-input w-full bg-amber-50 text-black"
                                                />
                                                {errors.image && <p className='text-red-600 text-[16px]'>{errors.image.message}</p>} */}

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

export default ManageProducts;