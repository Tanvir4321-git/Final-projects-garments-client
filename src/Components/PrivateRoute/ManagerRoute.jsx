import React from 'react';
import { use } from 'react';
import { Authcontext } from '../Context/Authcontext';
import useRole from '../CustomHooks/useRole';
import Loading from '../Loading';


const ManagerRoute = ({children}) => {

const {loading}=use(Authcontext)
const {role,roleLoading}=useRole()
console.log(role)

  if (loading || roleLoading) {
        return <Loading></Loading>
    }

if(role.role !== 'manager'){
    return <p className='text-white'>You have no access in this page</p>
}

    return children
};

export default ManagerRoute;