import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

 const ResetPassword = ()=>{
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting },
  } = useForm()
 const Navigate = useNavigate()
 //caling api or recieving data for log in
   const onSubmit = async (data) =>{
    let res = await fetch('https://login-system-production.up.railway.app/api/reset-password',
    {method: "POST" ,
    body: JSON.stringify({
    code: data.code,
    password: data.password}),
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  },)

    let mainres = await res.json()
    if(mainres.updatedPassword === true){
      toast.success('🎯 Account Logged In Successfuly !', {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
      Navigate('/login')
    }
    else if(mainres.noToken === true){
      toast.error('❌ Please SignUp First !')
      Navigate('/login')
    }
    else if(mainres.notUpdated === false){
      toast.error('❌ User Not Updated Please Try Again. !')
    }
    else if(mainres.noUser === true){
      toast.error('❌ User Not Exist. !')
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
    <div className=' flex justify-center items-center flex-col w-full h-screen '>
  <form action="" id='main' onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <h1 className='text-white text-4xl mb-6 mx-auto'>Forget Password</h1>
      <fieldset className="form-control w-[20rem] mb-5">
    <legend className="varification-CODE">Verification Code</legend>
    <input
        className="loginCode input input-bordered w-full"
        placeholder="Enter Code"
        {...register("code", {
        required: true,
        minLength: { value: 8, message: "Minimum token length is 8 characters" },
        })}
    />
    </fieldset>

        <fieldset className="form-control w-[20rem] mb-5">
        <legend className="label-text">Update Password</legend>
        <input
            type="password"
            className="loginEmail input input-bordered w-full"
            placeholder="Enter a New Password"
            {...register("password", {
            required: true,
            minLength: { value: 8, message: "Minimum password length is 8 characters" },
            })}
        />
        </fieldset>
      <input type="submit" disabled={isSubmitting} value="Update" className='h-10 rounded-lg cursor-pointer w-[20rem] bg-blue-400 text-white mb-4' />

      <Link to="/signup" className="text-sm text-white">
        Don’t have an account? <span className='underline text-blue-400'>Sign up</span> 
      </Link>
    
  </form>
    </div>
  );
}

export default ResetPassword;
