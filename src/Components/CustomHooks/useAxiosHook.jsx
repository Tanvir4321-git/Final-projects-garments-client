import axios from 'axios';
import React, { useEffect } from 'react';
import { use } from 'react';

import { useNavigate } from 'react-router';
import { Authcontext } from '../Context/Authcontext';

const axioinstance = axios.create({
  baseURL: 'https://assignment-11-final-project-server.vercel.app',

});


const useAxiosHook = () => {
  const { user, logOut, } = use(Authcontext)
  const navigate = useNavigate()

  useEffect(() => {
    // request intercept
    const requestinterceptor = axioinstance.interceptors.request.use(confiq => {
      confiq.headers.Authorization = `Bearer ${user?.accessToken}`

      return confiq
    })
    // response intercept
    const resinterceptor = axioinstance.interceptors.response.use((response) => {
      return response
    }, (error) => {


      const statuscode = error.response.status
      if (statuscode === 401 || statuscode === 403) {
      
          
            navigate('/')
          
      }


      return Promise.reject(error)
    })


    return () => {
      axioinstance.interceptors.request.eject(requestinterceptor)
      axioinstance.interceptors.response.eject(resinterceptor)
    }


  }, [user, logOut, navigate])



  return axioinstance
};

export default useAxiosHook;