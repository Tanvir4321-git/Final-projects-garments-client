import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { Authcontext } from './Context/Authcontext';
import Loading from './Loading';

const PrivateROute = ({ children }) => {

    const { user, loading } = use(Authcontext)
    const location = useLocation()

    if (loading) {
        return <Loading></Loading>
    }

    if (user && user.email) {
        return children
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateROute;