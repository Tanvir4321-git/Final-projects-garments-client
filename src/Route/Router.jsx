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

import DashAllProducts from '../Pages/Dashboard/DashAllProducts';
import AdminRoute from '../Components/PrivateRoute/AdminRoute';
import ManagerRoute from '../Components/PrivateRoute/ManagerRoute';
import AddProduct from '../Pages/Dashboard/Manager/AddProduct';
import Myorder from '../Pages/Dashboard/Buyer/Myorder';
import PaymentSuccess from '../Pages/Dashboard/PaymentSuccess';
import ManageProducts from '../Pages/Dashboard/Manager/ManageProducts';
import PendingOrder from '../Pages/Dashboard/Manager/PendingOrder';
import ApprovedOrders from '../Pages/Dashboard/Manager/ApprovedOrders';
import TrackYourOrder from '../Pages/Dashboard/Buyer/TrackYourOrder';
import AdAllorder from '../Pages/Dashboard/AdAllorder';



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
        <AdAllorder></AdAllorder>
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
          path:'manage-products',
          element:<ManagerRoute>
            <ManageProducts></ManageProducts>
          </ManagerRoute>
      },
      {
        path:'pending-orders',
        element:<ManagerRoute>
          <PendingOrder></PendingOrder>
        </ManagerRoute>
      },
      {
     path:'approved-orders',
     element:<ManagerRoute>
      <ApprovedOrders></ApprovedOrders>
     </ManagerRoute>
      },
      {
        path:'my-orders',
        Component:Myorder
      },
       {
        path:'order/:trackingId',
        Component:TrackYourOrder
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      }

    ]


  }
]);