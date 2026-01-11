/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';

const AllProductsSkeleton = ({ limit = 8 }) => {
    return (
        <div className='w-11/12 mx-auto py-20'>
            <h2 className="text-5xl text-center font-bold text-black dark:text-white mb-14">
                All <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">Products</span>
            </h2>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                {[...Array(limit)].map((_, index) => (
                    <motion.div
                        key={index}
                        className='border-2 rounded-lg border-[#1c5cbd] p-3 animate-pulse relative bg-gray-700 overflow-hidden'
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    >
                        <div className='h-[300px] w-full rounded-lg bg-gray-600 mb-4 relative'>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 opacity-50 animate-[shine_1.5s_infinite]"></div>
                        </div>
                        <div className='flex items-center justify-between mb-2'>
                            <div className='h-5 w-3/4 bg-gray-500 rounded'></div>
                            <div className='h-5 w-1/4 bg-gray-500 rounded'></div>
                        </div>
                        <div className='h-4 w-1/2 bg-gray-500 rounded mb-2'></div>
                        <div className='h-4 w-1/3 bg-gray-500 rounded mb-5'></div>
                        <div className='h-10 w-full bg-gray-500 rounded'></div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
                @keyframes shine {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-[shine_1.5s_infinite] {
                    background-size: 200% 100%;
                    animation: shine 1.5s linear infinite;
                }
            `}</style>
        </div>
    )
}

const AllProducts = () => {
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState('');
    const [priceSort, setPriceSort] = useState('none')
    const [filter, setfilter] = useState('');
    const limit = 8;
    const [currentpage, setcurrentPage] = useState(0);

    // ================== React Query ==================
    const { data = [], isLoading } = useQuery({
        queryKey: ['all-products', search, filter, priceSort, currentpage],
        queryFn: async () => {
            const res = await axios(`https://assignment-11-final-project-server.vercel.app/all-products?search=${search}&filter=${filter}&sort=${priceSort}&limit=${limit}&skip=${currentpage * limit}`)
            return res.data;
        },
        keepPreviousData: true
    });

    const products = data.result || [];
    const totalporducts = data.totalporduct || 0;
    const totalPage = Math.ceil(totalporducts / limit);

    // ================== Search Handler ==================
    const handlesearch = (e) => {
        e.preventDefault();
        setSearch(searchText);
        setcurrentPage(0);
    }

    if (isLoading) return <AllProductsSkeleton limit={limit} />;

    return (
        <div className='w-11/12 mx-auto py-20 '>
            <title>Haque Garments- All Products</title>
            <h2 className="text-5xl text-center font-bold text-black dark:text-white mb-14">
                All <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">Products</span>
            </h2>

            {/* Search + Filter + sort*/}
            <div className='flex flex-col md:flex-row gap-4 items-center my-8'>
                <div className='flex-1'>
                    {/* Price Sort */}
                    <select
                        onChange={(e) => setPriceSort(e.target.value)}
                        value={priceSort}
                        className="select bg-slate-800 border-slate-600 text-white"
                    >
                        <option value="none">Sort by Price</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>

                </div>
                <div className='flex  gap-4 flex-col items-end flex-1'>
                    <form onSubmit={handlesearch} className="flex gap-2 ">
                        <label className="  input input-bordered flex items-center gap-2 bg-slate-800 border-slate-600 flex-1">
                            <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                name='search'
                                value={searchText}                 // 👈 Controlled input
                                onChange={(e) => setSearchText(e.target.value)}
                                className='text-white bg-transparent '
                                type="search"
                                placeholder="Search Products"
                            />
                        </label>
                        <button type="submit" className="btn bg-blue-600 text-white px-4">Search</button>
                    </form>

                    <select
                        onChange={(e) => setfilter(e.target.value)}
                        defaultValue="filter"
                        className="select  bg-slate-800 border-slate-600 text-white"
                    >
                        <option value="filter" disabled>Filter</option>
                        <option value="all">All</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                {products.map((product, index) => (
                    <motion.div
                        key={product._id}
                        className='border-2 rounded-lg border-[#1c5cbd] p-3 relative'
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    >
                        <motion.img
                            className='h-[300px] w-full rounded-lg object-cover'
                            src={product.image}
                            alt=""
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className='flex items-center justify-between text-white '>
                            <h2 className='text-[20px] font-semibold my-5'>{product.productName}</h2>
                            <h3 className='font-semibold'>Price: {product.price}</h3>
                        </div>
                        <p className='text-gray-400'>Category: {product.category}</p>
                        <p className='text-gray-400 text-sm leading-relaxed mb-5'>Quantity: {product.availableQuantity}</p>
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className='flex justify-center'
                        >
                            <Link to={`/more-details/${product._id}`} className='button py-2 px-4 text-[16px] gap-2 w-full justify-center'>
                                More Details
                                <motion.button
                                    className='arrow py-2 px-3'
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaArrowRight size={12} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className='flex gap-4 justify-center mt-8'>
                {currentpage > 0 && <button onClick={() => setcurrentPage(currentpage - 1)} className="btn">Prev</button>}
                {[...Array(totalPage).keys()].map(i => (
                    <button key={i} onClick={() => setcurrentPage(i)} className={`btn ${i === currentpage && 'bg-blue-600'}`}>{i + 1}</button>
                ))}
                {currentpage < totalPage - 1 && <button onClick={() => setcurrentPage(currentpage + 1)} className="btn">Next</button>}
            </div>
        </div>
    );
};

export default AllProducts;
