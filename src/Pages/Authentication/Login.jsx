/* eslint-disable no-unused-vars */
import React, { use } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Authcontext } from '../../Components/Context/Authcontext';
import { addorUpdateuser } from '../../Components/utlitis';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, GoglleLogin } = use(Authcontext)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm()

    /* ================= Credentials ================= */
    const credentials = {
        admin: {
            email: "sign@user.com",
            pass: "123456As"
        },
        manager: {
            email: "manager@gmail.com",
            pass: "123456As"
        },
        buyer: {
            email: "buyer@gmail.com",
            pass: "123456As"
        }
    }

    const fillCredentials = (role) => {
        setValue("email", credentials[role].email)
        setValue("pass", credentials[role].pass)
    }

    /* ================= Email Login ================= */
    const handlelogin = async (data) => {
        try {
            const { email, pass } = data
            const { user } = await login(email, pass)

            await addorUpdateuser({
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL
            })

            if (location.state) {
                navigate(location.state)
            } else {
                navigate('/')
            }

            toast('Successfully logged in')
        } catch (err) {
            if (err.code === 'auth/invalid-credential') {
                toast('Invalid email or password')
            } else if (err.code === 'auth/missing-password') {
                toast('Enter password')
            } else if (err.code === 'auth/invalid-email') {
                toast('Invalid email')
            } else {
                toast(err.message)
            }
        }
    }

    /* ================= Google Login ================= */
    const handlegoogle = async () => {
        try {
            const { user } = await GoglleLogin()

            await addorUpdateuser({
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                role: 'Buyer'
            })

            navigate('/')
            toast('Successfully logged in')
        } catch (err) {
            toast(err?.message)
        }
    }

    return (
        <div>
            <title>Haque Garments - Login Page</title>

            <div className="hero bg-white/5 border-2 rounded-xl border-[#36465c] backdrop-blur-sm min-h-screen">
                <div className="card w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body text-white">

                        {/* ===== Role Credential Buttons ===== */}
                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                            <button
                                type="button"
                                onClick={() => fillCredentials("admin")}
                                className="btn btn-sm bg-red-600 text-white"
                            >
                                Admin
                            </button>

                            <button
                                type="button"
                                onClick={() => fillCredentials("manager")}
                                className="btn btn-sm bg-blue-600 text-white"
                            >
                                Manager
                            </button>

                            <button
                                type="button"
                                onClick={() => fillCredentials("buyer")}
                                className="btn btn-sm bg-green-600 text-white"
                            >
                                Buyer
                            </button>
                        </div>

                        {/* ===== Login Form ===== */}
                        <form onSubmit={handleSubmit(handlelogin)}>
                            <fieldset className="fieldset text-white text-[18px]">

                                {/* Email */}
                                <label className="label">Email</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="input bg-transparent"
                                    placeholder="Email"
                                />

                                {/* Password */}
                                <label className="label">Password</label>
                                <input
                                    {...register('pass')}
                                    type="password"
                                    className="input bg-transparent"
                                    placeholder="Password"
                                />

                                {/* Login Button */}
                                <motion.div
                                    whileTap={{ scale: 0.9, y: 2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                    <button className="button my-4 py-2 px-2 md:px-4 text-[14px] w-full md:text-[17px] gap-2 flex justify-center">
                                        Log in
                                        <span className="arrow py-2 px-3">
                                            <FaArrowRight className="size-2 md:size-3" />
                                        </span>
                                    </button>
                                </motion.div>

                            </fieldset>
                        </form>

                        {/* ===== Google Login ===== */}
                        <button
                            onClick={handlegoogle}
                            className="btn bg-white text-black border-[#e5e5e5]"
                        >
                            <svg aria-label="Google logo" width="16" height="16" viewBox="0 0 512 512">
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff" />
                                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                                </g>
                            </svg>
                            Login with Google
                        </button>

                        <p>
                            Don't have account?
                            <Link to="/register">
                                <span className="font-semibold text-blue-600 underline"> Register</span>
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
