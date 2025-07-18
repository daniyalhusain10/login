import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
export const Login = ()=>{
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting },
  } = useForm()
 const Navigate = useNavigate()
 //caling api or recieving data for log in
   const onSubmit = async (data) =>{
    let res = await fetch('https://login-system-production.up.railway.app/login',
    {method: "POST" ,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  },)

    let mainres = await res.json()
    if(mainres.success === true){
       if (mainres.success === true) {
      toast.success('🎯 Account Logged In Successfuly !', {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
      Navigate('/')
      }
    }
    else if(mainres.noToken === true){
      toast.error('❌ Please SignUp First')
      Navigate('/signup')
    }
    else{
        toast.error('❌ Please Enter Valid Information.!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    
    }
  
   }

  return (
    <div className='main1 flex justify-center items-center flex-col w-full h-screen '>
  <form action="" id='main' onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <h1 className='text-white text-4xl mb-6 mx-auto'>Log In</h1>
      <fieldset className="form-control w-[20rem] mb-2">
        <legend className="label-text">Email</legend>
        <input
          type="email"
          className="loginEmail input input-bordered w-full"
          placeholder="email"
          {...register("email", {required: true, minLength: {value: 8, message: "minimum email length is 8 charachter"}})}   
            
        />
      </fieldset>

      <fieldset className="form-control w-[20rem] mb-1">
        <legend className="label-text">Password</legend>
        <input
          type="password"
          className="password input input-bordered w-full"
          placeholder="password"  
   {...register("password", {required: true, minLength:{value: 8 ,message : <h4 className='mt-4 text-red-400'>password must be 8 character or longer</h4>}})}           />
          {errors.password && errors.password.message}
      </fieldset>
      <Link to="/forget-password" className="text-sm text-white mb-3">
         <span className='underline text-blue-400'>Forget Password?</span> 
      </Link>
      <input type="submit" disabled={isSubmitting} value="submit" className='h-10 rounded-lg cursor-pointer w-[20rem] bg-black text-white mb-4' />

      <Link to="/signup" className="text-sm text-white">
        Don’t have an account? <span className='underline text-blue-400'>Sign up</span> 
      </Link>
    
  </form>
    </div>
  );
}

