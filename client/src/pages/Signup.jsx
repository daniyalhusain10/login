import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
export const Signup = ()=>{
  const {
    register,
    handleSubmit, 
    watch,
    formState: { errors ,isSubmitting },
  } = useForm()
      const navigate = useNavigate()

   const onSubmit = async (data) =>{
    let res = await fetch('https://login-system-production.up.railway.app/signup', 
       {method: "POST" ,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  },);
    let signupresponse = await res.json()
    if(signupresponse.success === true){
       setTimeout(() => {
       toast.success('🎯 Account Created Successfuly !', {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      navigate('/')
    },1000)
    }else{
       toast.error('❌ Please enter valid credentials.!', {
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
   };


  return (
    <div className='flex justify-center items-center flex-col w-full h-screen main1'>
  <form action="" id='main' onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <h1 className='text-white text-4xl mb-3 mx-auto '>Sign Up</h1>

<fieldset className="form-control w-[20rem] mb-3">
        <legend className="label-text">Username</legend>
        <input
          type="username"
          className="username input input-bordered w-full"
          placeholder="username"
          {...register("username", {required: true, minLength: {
            value: 5, message: "minimum username length is 5 charachter"
          }})}   
             
          
        />
      </fieldset>

      <fieldset className="form-control w-[20rem] mb-3 ">
        <legend className="label-text">Email</legend>
        <input
          type="email"
          className="loginEmail input input-bordered w-full"
          placeholder="email"
          {...register("email", {required: true, minLength: {
            value: 8, message: "minimum email length is 8 charachter"
          }})}   
             
          
        />
      </fieldset>

      <fieldset className="form-control w-[20rem]  mb-1">
        <legend className="label-text">Password</legend>
        <input
          type="password"
          className="password input input-bordered w-full"
          placeholder="password"  
          {...register("password", {required: true, minLength:{value: 8 ,message : <h4 className='mt-4 text-red-400'>password must be 8 character or longer</h4>}})}   
        />
          {errors.password && errors.password.message}
      </fieldset>

      <input type="submit" value="submit" className='mt-6 h-10 rounded-lg cursor-pointer w-[20rem] bg-black text-white mb-4' />

      <Link to="/login" className="text-sm text-white">
        Already have an account? <span className='underline text-blue-400'>Login</span> 
      </Link>
  </form>
    
    </div>
  );
}

