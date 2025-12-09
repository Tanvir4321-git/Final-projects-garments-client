
import React from 'react';
import { use } from 'react';
import { Authcontext } from '../Context/Authcontext';
import useAxiosHook from './useAxiosHook';
import { useQuery } from '@tanstack/react-query';



const useRole = () => {
    const {user,loading}=use(Authcontext)
    const axioshook=useAxiosHook()

 const {data:role='user',isLoading:roleLoading}=useQuery({
   enabled:!loading && !!user?.email,
    queryKey:['user-role',user?.email],
    queryFn:async()=>{
        const res=await axioshook.get(`/users/${user?.email}/role`)
       console.log(res.data?.role,res.data?.status)
         return {
        role: res.data?.role,
        status: res.data?.status,
      };
    }
 })




    return (
       {roleLoading,role}
    );
};

export default useRole;