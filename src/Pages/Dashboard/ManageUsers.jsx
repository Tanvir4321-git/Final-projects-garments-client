import { useQuery } from '@tanstack/react-query';
import React from 'react';

import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';
import useAxiosHook from '../../Components/CustomHooks/useAxiosHook';

const ManageUsers = () => {
  const axioshook = useAxiosHook()

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axioshook('/users')
      return res.data
    }
  })

  // update status

  const upadtaStatus = (user, status) => {
    const updateinfo = {
      status: status,
      email: user.email
    }
    axioshook.patch(`/users/${user._id}`, updateinfo)
      .then(res => {
        if (res.data.modifiedCount) {
          console.log(res.data)

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `you are ${status}`,
            showConfirmButton: false,
            timer: 2000
          })
          refetch()


        }
      })
  }
  const handleapprove = (user) => {

    upadtaStatus(user, 'approved')
  }

  const handlerejecte = (user) => {
    upadtaStatus(user, 'suspend')
  }


  if (isLoading) return <Loading></Loading>
  return (
    <div className='text-white p-8'>
      <h2 className="text-2xl  font-bold text-white mb-8">
        Manage Users
      </h2>
      <h3>Total Users:{users.length}</h3>




      <div className="overflow-x-auto mt-8">
        <table className="table bg-">
          {/* head */}
          <thead className='text-white  '>
            <tr className=''>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              users.map((user, i) => <tr key={i}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.role}</td>
                <td> <button
                  className="btn"
                  disabled={user.status === 'approved'}
                  onClick={() => handleapprove(user)}
                >
                  Approve
                </button>  <button
                  className="btn"
                  disabled={user.status === 'suspend'}
                  onClick={() => handlerejecte(user)}
                >
                    Suspend
                  </button> </td>
              </tr>)
            }


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;