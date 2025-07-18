import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home'
import { ToastContainer } from 'react-toastify';
import Fpassword from './pages/Fpassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

const App = () => (
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login"  element={<Login />} />
      <Route path="/forget-password"  element={<Fpassword />} />
      <Route path="/reset-password"  element={<ResetPassword />} />
   
      
    </Routes>
  </BrowserRouter>
  <ToastContainer />
  </>

  
);

export default App;
