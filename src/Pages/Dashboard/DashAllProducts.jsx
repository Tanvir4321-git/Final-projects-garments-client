import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosHook from '../../Components/CustomHooks/useAxiosHook';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2'
const DashAllProducts = () => {
    const axioshook = useAxiosHook()
    const updateref=useRef()
    const [added,setadded]=useState([])

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
            Swal.fire("Added to home!")
          }

        setadded([...added, product._id])
    }

// const handleUpdate=()=>{

// }

    
    if (isLoading) return <Loading></Loading>





    return (
        <div className='text-white p-8'>
            <h2 className="text-2xl  font-bold text-white mb-8">
                All Products
            </h2>
            <h3>Total Orders:{products.length}</h3>




            <div className="overflow-x-auto mt-8">
                <table className="table bg-">
                    {/* head */}
                    <thead className='text-white  '>
                        <tr className=''>
                            <th> Image </th>
                            <th>Product Name</th>
                            <th> Price</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Show on Home</th>
                            <th>Update</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            products.map((product, i) => <tr key={i}>
                                <th><img className='w-10 rounded' src={product.image} alt="" /></th>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.createdBy}</td>

                                {
                                      added.includes(product._id)?<p className='text-white'>Added to the home </p>: <td>
                                    Show 
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCheck(e, product)}
                                    />
                                </td>
                                }
                               
                                <td><button className='btn'>Update</button></td>
                                <td className='btn'><button onClick={() => handleDelete(product)}>Delete</button></td>
                            </tr>)
                        }
<dialog ref={updateref} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Riders available:</h3>

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

                    </tbody>
                </table>


 

            </div>
        </div>
    );
};

export default DashAllProducts;