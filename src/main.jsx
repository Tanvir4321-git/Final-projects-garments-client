import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { router } from './Route/Router.jsx'
import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Components/Context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'next-themes'

const queryClient = new QueryClient()




createRoot(document.getElementById('root')).render(

  <StrictMode>
         <ThemeProvider attribute='class' defaultTheme='dark'>
    <QueryClientProvider client={queryClient}>
   
      <AuthProvider>
<RouterProvider router={router} />
      </AuthProvider>
      

    </QueryClientProvider>
   </ThemeProvider>
    <ToastContainer />

 
  </StrictMode>,
)
