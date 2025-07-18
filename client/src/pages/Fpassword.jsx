import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

 const Fpassword = ()=>{
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting },
  } = useForm()
 const Navigate = useNavigate()
 //caling api or recieving data for log in
   const onSubmit = async (data) =>{
    let res = await fetch('https://login-system-production.up.railway.app/forget-password',
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
      Navigate('/reset-password')
      }
    }
    else if(mainres.noToken === true){
      toast.error('❌ Please SignUp First')
      Navigate('/signup')
    }
    else if(mainres.noExist === false){
         toast.error('❌ User Not Exist.!', {
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
     else if(mainres.codeSend === true){
         toast.error('🎯 User Exist.!', {
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
        Navigate('/reset-password')
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
        <legend className="label-text">Email</legend>
        <input
          type="email"
          className="loginEmail input input-bordered w-full"
          placeholder="email"
          {...register("email", {required: true, minLength: {value: 8, message: "minimum email length is 8 charachter"}})}   
        />
      </fieldset>
      <input type="submit" disabled={isSubmitting} value="verify" className='h-10 rounded-lg cursor-pointer w-[20rem] bg-blue-400 text-white mb-4' />

      <Link to="/signup" className="text-sm text-white">
        Don’t have an account? <span className='underline text-blue-400'>Sign up</span> 
      </Link>
    
  </form>
    </div>
  );
}

export default Fpassword;
