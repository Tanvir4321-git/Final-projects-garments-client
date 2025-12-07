import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import ErrorPage from '../Components/ErrorPage';
import Home from '../Pages/Home/Home';
import About from '../Pages/About';
import MoreDetails from '../Pages/Home/MoreDetails';
import AuthLayout from '../Layout/AuthLayout';
import Register from '../Pages/Authentication/Register';
import Login from '../Pages/Authentication/Login';

 export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   errorElement:<ErrorPage></ErrorPage>,
   children:[
    {
        index: true,
        Component:Home
    },
    {
      path:'/about',
      Component: About
    },
    {
      path:'/more-details/:id',
      Component:MoreDetails
    }
   ]
  },
  {
    path:'/',
    Component:AuthLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'/register',
        Component:Register
      },
      {
        path:'/login',
        Component:Login

      }
    ]
    
  }
]);