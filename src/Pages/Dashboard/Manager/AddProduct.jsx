/* eslint-disable no-unused-vars */
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import { Authcontext } from '../../../Components/Context/Authcontext';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';
import { imageUpload } from '../../../Components/utlitis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useRole from '../../../Components/CustomHooks/useRole';
const AddProduct = () => {
    const { user } = use(Authcontext)
    const axioshook = useAxiosHook()
    const navigate = useNavigate()
    const { role, status } = useRole()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleAddProduct = async (data) => {
        try {

            const images = data.image;

            const imageURLs = await Promise.all(
                [...images].map(async (img) => await imageUpload(img))
            );


            const productInfo = {
                ...data, image: imageURLs, createdBy: user?.email
            }
            await axioshook.post('/products', productInfo)
            navigate('/dashboard/manage-products')
            toast('Successfullly add product')
        } catch (err) {
            console.log(err)
        }


    }

    return (
        <div className='p-8'>



            <h2 className="text-2xl text-center  font-bold text-white mb-14">
                Add New Products
            </h2>

            <div className="hero  bg-white/5 border-2 rounded-xl border-[#36465c] backdrop-blur-sm ">

                <div className="card w-full shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleAddProduct)}>

                            <fieldset className="fieldset flex lg:flex-row flex-col gap-20  text-white text-[18px]">
                                <div className='space-y-3'>
                                    {/* Product Name */}
                                    <label className="label">Product Name </label>
                                    <input
                                        type="text"
                                        {...register('productName', { required: 'Product name is required' })}
                                        className="input w-full bg-amber-50 text-black"
                                        placeholder="Product Name"
                                    />
                                    {errors.productName && <p className='text-red-600 text-[16px]'>{errors.productName.message}</p>}

                                    {/* Short desc */}
                                    <label className="label">Short Description </label>
                                    <input
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
                                        defaultValue=""
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
                                        type="number"
                                        {...register('price', { required: 'Price is required' })}
                                        className="input w-full bg-amber-50 text-black"
                                        placeholder="Price"
                                    />
                                    {errors.price && <p className='text-red-600 text-[16px]'>{errors.price.message}</p>}

                                    {/* Available Quantity */}
                                    <label className="label">Available Quantity</label>
                                    <input
                                        type="number"
                                        {...register('availableQuantity', { required: 'Available quantity required' })}
                                        className="input w-full bg-amber-50 text-black"
                                        placeholder="Available Quantity"
                                    />
                                    {errors.availableQuantity && <p className='text-red-600 text-[16px]'>{errors.availableQuantity.message}</p>}

                                    {/* MOQ */}
                                    <label className="label">Minimum Order Quantity (MOQ)</label>
                                    <input
                                        type="number"
                                        {...register('minimumOrder', { required: 'MOQ is required' })}
                                        className="input w-full bg-amber-50 text-black"
                                        placeholder="Minimum Order Quantity"
                                    />
                                    {errors.minimumOrder && <p className='text-red-600 text-[16px]'>{errors.minimumOrder.message}</p>}

                                </div>


                                {/* ////////// */}
                                <div className='space-y-3'>

                                    {/* Images */}
                                    <label className="label">Images Upload</label>
                                    <input
                                        type="file"
                                        multiple
                                        {...register('image', { required: 'Upload images' })}
                                        className="file-input w-full bg-amber-50 text-black"
                                    />
                                    {errors.image && <p className='text-red-600 text-[16px]'>{errors.image.message}</p>}

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
                                        defaultValue=""
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
                                    ></textarea>
                                    {errors.description && <p className='text-red-600 text-[16px]'>{errors.description.message}</p>}

                                    {/* Button */}
                                    {
                                        role.role === 'Manager' && role.status !== 'suspend' ? <motion.div
                                            whileTap={{ scale: 0.9, y: 2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        >
                                            <button className='button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center'>
                                                 Add Product
                                                <span className='arrow py-2 px-3 '>
                                                    <FaArrowRight className='size-2 md:size-3' />
                                                </span>
                                            </button>
                                        </motion.div> : <motion.div
                                            whileTap={{ scale: 0.9, y: 2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        >
                                            <button disabled className='button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center'>
                                              You can't Add Product
                                                <span className='arrow py-2 px-3 '>
                                                    <FaArrowRight className='size-2 md:size-3' />
                                                </span>
                                            </button>
                                        </motion.div>
                                    }
                                </div>





                            </fieldset>

                        </form>
                    </div>
                </div>

            </div>





        </div>
    );
};

export default AddProduct;