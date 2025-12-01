import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import Home from './_root/pages/Home';
import RootLayout from './_root/RootLayout';
import './globals.css';
import {Routes,Route,useNavigate} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { AUTH_FAILURE_EVENT } from "@/lib/react-query/axiosInstance";
import { useEffect } from 'react';
import Explore from './_root/pages/Explore';
import Profile from './_root/pages/Profile';

const queryClient = new QueryClient();

const App = () => {
  const navigate = useNavigate();

  useEffect(()=> {
    const handleAuthFailure = ()=> {
      navigate("/sign-in")

    }
    window.addEventListener(AUTH_FAILURE_EVENT,handleAuthFailure)

    return() => {
      window.removeEventListener(AUTH_FAILURE_EVENT,handleAuthFailure)
    }
  },[navigate]);


  return (
    <main className='flex h-screen'>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* public Route */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/sign-up' element={<SignUpForm />} /> 
          </Route>
          


          {/* private Route */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

        </Routes>
      </QueryClientProvider>

    </main>

  )
}

export default App

