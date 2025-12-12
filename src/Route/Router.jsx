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
import PrivateROute from '../Components/PrivateRoute/PrivateROute';
import DashboardLayout from '../Layout/DashboardLayout';
import DashboardHome from '../Pages/Dashboard/DashboardHome';

import OrderFrom from '../Pages/OrderForm';
import AllProducts from '../Pages/AllProducts';
import ManageUsers from '../Pages/Dashboard/ManageUsers';
import AllOrders from '../Pages/Dashboard/AllOrders';
import DashAllProducts from '../Pages/Dashboard/DashAllProducts';
import AdminRoute from '../Components/PrivateRoute/AdminRoute';
import ManagerRoute from '../Components/PrivateRoute/ManagerRoute';
import AddProduct from '../Pages/Dashboard/Manager/AddProduct';
import Myorder from '../Pages/Dashboard/Buyer/Myorder';
import PaymentSuccess from '../Pages/Dashboard/PaymentSuccess';


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/more-details/:id',
        element: <PrivateROute>
          <MoreDetails></MoreDetails>
        </PrivateROute>

      },
      {
        path: '/all-products',
        Component: AllProducts
      },
      {
        path: '/order',
        Component: OrderFrom
      }

    ]
  },
  {
    path: '/',
    Component: AuthLayout,

    children: [
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/login',
        Component: Login

      }
    ]

  },
  {
    path: 'dashboard',
    element: <PrivateROute>
      <DashboardLayout></DashboardLayout>
    </PrivateROute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'manage-users',
       element:<AdminRoute>
        <ManageUsers></ManageUsers>
       </AdminRoute>
      },

      {
        path: 'all-orders',
       element:<AdminRoute>
        <AllOrders></AllOrders>
       </AdminRoute>
      },

      {
        path: 'dash-all-products',
        element:<AdminRoute>
        <DashAllProducts></DashAllProducts>
       </AdminRoute>
      },
      {
        path:'add-products',
        element:<ManagerRoute>
          <AddProduct></AddProduct>
        </ManagerRoute>
      },
      {
        path:'my-orders',
        Component:Myorder
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      }

    ]


  }
]);