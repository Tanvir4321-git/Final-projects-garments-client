import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import ErrorPage from '../Components/ErrorPage';
import Home from '../Pages/Home/Home';
import About from '../Pages/About';

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
    }
   ]
  },
]);