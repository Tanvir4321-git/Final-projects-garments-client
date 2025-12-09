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
import PrivateROute from '../Components/PrivateROute';
import DashboardLayout from '../Layout/DashboardLayout';
import DashboardHome from '../Pages/Dashboard/DashboardHome';
import AllProducts from '../Pages/Dashboard/AllProducts';


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
      element:<PrivateROute>
        <MoreDetails></MoreDetails>
      </PrivateROute>
      
    },
      {
        path:'/all-products',
        Component:AllProducts
      },
     
   ]
  },
  {
    path:'/',
    Component:AuthLayout,
   
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
    
  },
  {
    path:'dashboard',
    element: <PrivateROute>
      <DashboardLayout></DashboardLayout>
    </PrivateROute>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        Component:DashboardHome
      },
    
    ]

    
  }
]);