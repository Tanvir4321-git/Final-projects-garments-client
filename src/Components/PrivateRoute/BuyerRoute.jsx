import React, { use } from 'react';
import { Authcontext } from '../Context/Authcontext';
import useRole from '../CustomHooks/useRole';
import Loading from '../Loading';

const BuyerRoute = ({children}) => {
    const {loading}=use(Authcontext)
const {role,roleLoading}=useRole()
console.log(role)

  if (loading || roleLoading) {
        return <Loading></Loading>
    }

if(role.role !== 'Buyer'){
    return <p className='text-white'>You have no access in this page</p>
}

    return children
};

export default BuyerRoute;