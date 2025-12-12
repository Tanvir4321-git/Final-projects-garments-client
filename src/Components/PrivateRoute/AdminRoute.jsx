import React from 'react';
import { use } from 'react';
import { Authcontext } from '../Context/Authcontext';
import useRole from '../CustomHooks/useRole';
import Loading from '../Loading';


const AdminRoute = ({children}) => {

const {loading}=use(Authcontext)
const {role,roleLoading}=useRole()
console.log(role)

  if (loading || roleLoading) {
        return <Loading></Loading>
    }

if(role.role !== 'admin'){
    return <p className='text-white'>FOrbiden your area a thief</p>
}

    return children
};

export default AdminRoute;