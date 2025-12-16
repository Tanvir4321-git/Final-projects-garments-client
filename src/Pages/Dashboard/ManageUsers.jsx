import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';
import useAxiosHook from '../../Components/CustomHooks/useAxiosHook';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const axioshook = useAxiosHook();
  const [search, setSearch] = useState('')
  const [filter, setfilter] = useState('')
  const feedbackref = useRef()
  const [suspenduser, setsuspenduser] = useState({})
  const [feedback, setFeedback] = useState('');


  const { data: users = [], refetch } = useQuery({
    queryKey: ['all-users', search, filter],
    queryFn: async () => {
      const res = await axioshook(`/users?search=${search}&filter=${filter}`);
      return res.data;
    }
  });

  // update status
  const upadtaStatus = (user, status) => {
    const updateinfo = {
      status: status,
      email: user.email
    };

    axioshook.patch(`/users/${user._id}`, updateinfo)
      .then(res => {
        if (res.data.modifiedCount) {

          refetch();
        }
      });
  };

  const handleapprove = (user) => {
    upadtaStatus(user, 'approved');
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `User approved`,
      showConfirmButton: false,
      timer: 2000
    });
  };
 
  
  const handlefeedback = async () => {
   
if(!feedback.trim()) {

  return toast('Please write a reason')
}
 

    const updateinfo={
      status: 'suspended',
      feedback:feedback
    }

    await axioshook.patch(`/users/${suspenduser._id}`, updateinfo)
       refetch()
    feedbackref.current.close()
    setFeedback('') 
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `User suspended`,
      showConfirmButton: false,
      timer: 2000
    });



  }



  const handlerejecte = (user) => {
    // upadtaStatus(user, 'suspend');

    setsuspenduser(user)
    feedbackref.current.showModal()
  };


  return (
    <div className='text-white p-4 md:p-8'>
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">
        Manage Users
      </h2>
      <div className='flex items-center justify-between md:flex-row  flex-col  mb-6'>
        <h3 className="mb-4  w-full md:w-1/2">Total Users: {users.length}</h3>
        <div className='flex gap-3 items-center md:flex-row flex-col w-full md:w-1/2'>
          <label className="input  input-bordered flex items-center gap-2 bg-slate-800 border-slate-600">
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
              placeholder="Search orders..."
            />
          </label>


          <select onChange={(e) => setfilter(e.target.value)} defaultValue="filter" className="select bg-slate-800 border-slate-600 text-white">
            <option value="filter" disabled>
              Filter
            </option>
            <option value="all">All</option>
            <option value="Buyer">Buyer</option>
            <option value="Manager">Manager</option>

          </select>



        </div>
      </div>

      {/* ================= MOBILE VIEW (CARD) ================= */}
      <div className="md:hidden space-y-4">
        {users.map((user, i) => (
          <div
            key={i}
            className="border border-slate-700 rounded-lg p-4 bg-slate-800/50"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{user.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'approved'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : user.status === 'suspended'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}
              >
                {user.status}
              </span>
            </div>

            <p className="text-xs mb-1"><b>Email:</b> {user.email}</p>
            <p className="text-xs mb-3"><b>Role:</b> {user.role}</p>

            <div className="flex gap-2">
              <button
                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white flex-1"
                disabled={user.status === 'approved'}
                onClick={() => handleapprove(user)}
              >
                Approve
              </button>
              <button
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white flex-1"
                disabled={user.status === 'suspended'}
                onClick={() => handlerejecte(user)}
              >
                Suspend
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW (TABLE) ================= */}
      <div className="hidden md:block overflow-x-auto mt-8 rounded-lg border border-slate-700">
        <table className="table w-full">
          <thead className='text-white bg-slate-800'>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="hover:bg-slate-800/50">
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'approved'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : user.status === 'suspended'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>{user.role}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                      disabled={user.status === 'approved'}
                      onClick={() => handleapprove(user)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                      disabled={user.status === 'suspended'}
                      onClick={() => handlerejecte(user)}
                    >
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

    




        <dialog ref={feedbackref} className="modal">
          <div className="modal-box bg-slate-800 border border-slate-600">
            <h3 className="font-bold text-lg text-white mb-4">Send Feedback</h3>
            <p className="text-slate-300 mb-4">Why is this user being suspended?</p>

            <textarea
            required
              className="textarea w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Write your reason here..."
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button onClick={handlefeedback} className="btn bg-green-600 hover:bg-green-700 text-white border-none">
                  Submit
                </button>

              <button className="btn bg-red-600 hover:bg-red-700 text-white border-none">
                Close
              </button>
              </form>
            </div>
          </div>
        </dialog>








      </div>
    </div>
  );
};

export default ManageUsers;
