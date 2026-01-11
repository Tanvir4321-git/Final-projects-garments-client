/* eslint-disable no-unused-vars */
import React, { use } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Authcontext } from '../../Components/Context/Authcontext';
import { addorUpdateuser, imageUpload } from '../../Components/utlitis';
import { toast } from 'react-toastify';


const Register = () => {
    const navigate=useNavigate()
    const { registerUser, profileUpdate } = use(Authcontext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleRegister = async (data) => {
        try {

            const { name, email, pass,role } = data

            const photo = data.photo[0]
            const photoURL = await imageUpload(photo)
// user create 
            const res = await registerUser( email, pass)
// user add in db
            await addorUpdateuser({ name, email, image: photoURL,role })
            const profile = {
               displayName:name, photoURL
            }
            // user porfile update
            await profileUpdate(profile)
            navigate('/')
            toast('Successfully create a account')
        } catch (error) {
            toast(error.message)
        }






    }


    return (
        <div >
                  <title>Haque Garments- Register Page</title>
            <div className="hero bg-white/5 border-2 rounded-xl border-[#36465c] backdrop-blur-sm  min-h-screen">


                <div className="card   w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body text-white">
                        <form onSubmit={handleSubmit(handleRegister)}>

                            <fieldset className="fieldset text-white text-[18px]">
                                {/* name */}
                                <label className="label">Name</label>
                                <input type="text" {...register('name', { required: 'Name is required' })} className="input bg-transparent" placeholder="Name" />
                                {errors.name && <p className='text-red-600 text-[16px]'>{errors.name.message}</p>}

                                {/* email */}
                                <label className="label">Email</label>
                                <input {...register('email', { required: 'email is required' })} type="email" className="input bg-transparent " placeholder="Email" />
                                {errors.email && <p className='text-red-600 text-[16px]'>{errors.email.message}</p>}

                                {/* photo */}
                                <label className="label">Photo</label>
                                <input {...register('photo', { required: 'image is required' })} type="file" className="file-input bg-transparent" />
                                {errors.photo && <p className='text-red-600 text-[16px]'>{errors.photo.message}</p>}

                                {/* select role */}
                                <label className="label">Select Role</label>
                                <select
                                    {...register('role', { required: 'Select your Role' })}
                                    className="select text-black"
                                    defaultValue=""   // empty string placeholder
                                >
                                    <option value="" disabled>Select your role</option>
                                    <option value="Buyer">Buyer</option>
                                    <option value="Manager">Manager</option>
                                </select>
                                {errors.role && <p className='text-red-600 text-[16px]'>{errors.role.message}</p>}


                                {/* password */}
                                <label className="label">Password</label>
                                <input {...register('pass', {
                                    required: 'Pass is required', minLength: {
                                        value: 6,
                                        message: 'Password must be 6 character'
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                        message: "Password must contain at least one uppercase and one lowercase letter"
                                    }

                                })} type="password" className="input bg-transparent" placeholder="Password" />
                                {errors.pass && <p className='text-red-600 text-[16px]'>{errors.pass.message}</p>}

                                {/* button */}
                                <motion.div

                                    whileTap={{ scale: 0.9, y: 2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}

                                >
                                    <button className=' button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center' >Register  <span className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></span></button>
                                </motion.div>


                            </fieldset>
                            <p>Already have account please <Link to='/login'><span className='font-semibold text-blue-600 underline'>Log in </span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Register;