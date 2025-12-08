/* eslint-disable no-unused-vars */
import React, { use } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Authcontext } from '../../Components/Context/Authcontext';
import { addorUpdateuser } from '../../Components/utlitis';
import { toast } from 'react-toastify';
const Login = () => {
    const navigate = useNavigate()
    const { login, GoglleLogin, } = use(Authcontext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handlelogin = async (data) => {
        try {

            const { email, pass } = data

            const { user } = await login(email, pass)
            await addorUpdateuser({ name: user?.displayName, email: user?.email, image: user?.photoURL })
            navigate('/')
            toast('successfuly log in')
        } catch (err) {
            if (err.code === 'auth/invalid-credential') {
                toast('Invalid email or password. Please check and try again.')
            }
            else if (err.code === 'auth/missing-password') {
                toast('Enter password')
            }
            else if (err.code === 'auth/invalid-email') {
                toast('NO email found')
            }

            else {
                toast(err.message)
            }


        }

    }

    const handlegoogle = async () => {
        try {


            const { user } = await GoglleLogin()
            await addorUpdateuser({ name: user?.displayName, email: user?.email, image: user?.photoURL, role: 'Buyer' })
            navigate('/')
            toast('successfuly log in')
        }
        catch (err) {

            toast(err?.message)
        }
    }

    return (
        <div >
            <div className="hero bg-white/5 border-2 rounded-xl border-[#36465c] backdrop-blur-sm  min-h-screen">


                <div className="card   w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body text-white">
                        <form onSubmit={handleSubmit(handlelogin)}>

                            <fieldset className="fieldset text-white text-[18px]">

                                {/* email */}
                                <label className="label">Email</label>
                                <input {...register('email')} type="email" className="input bg-transparent " placeholder="Email" />
                                {/* {errors.email && <p className='text-red-600 text-[16px]'>{errors.email.message}</p>} */}



                                {/* password */}
                                <label className="label">Password</label>
                                <input {...register('pass')}

                                    type="password" className="input bg-transparent" placeholder="Password" />
                                {/* {errors.pass && <p className='text-red-600 text-[16px]'>{errors.pass.message}</p>} */}

                                {/* button */}
                                <motion.div

                                    whileTap={{ scale: 0.9, y: 2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}

                                >
                                    <button className=' button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center' >Log in  <span className='arrow py-2 px-3 '><FaArrowRight className='size-2 md:size-3' /></span></button>
                                </motion.div>




                            </fieldset>

                        </form>
                        {/* Google */}
                        <button onClick={handlegoogle} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                        <p>Don't have account please <Link to='/register'><span className='font-semibold text-blue-600 underline'>Register </span></Link></p>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Login;