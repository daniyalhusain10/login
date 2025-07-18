import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
  const res = await fetch("https://login-system-production.up.railway.app/validate", {
    method: "GET",
    credentials: "include", // send cookies
  });

  const data = await res.json(); // get the response JSON
  setLoggedIn(data.loggedIn);    // update state
} catch (error) {
  console.error("Validation failed", error);
  setLoggedIn(false); // optional fallback
}

    };
  checkLoggedIn(); // call it here
  }, []);
  const LogOut = async ()=>{
    const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (!confirmLogout) return; // cancel if user says "No"  

    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "GET",
        credentials: "include", //send cookies
      });
      const data = await res.json();
      if(data.success) 
      setLoggedIn(false)  // update state
    } catch (error) {
      console.error("Lot Out Failed", error);
    }
  }
  return (
    <div className='flex justify-between pt-5'>
      <div>
      <h2>Home Page</h2>
      </div>



      <div>
         {loggedIn ? (
        <button onClick={LogOut} className='bg-red-500 text text-white px-5 py-2 mr-5 rounded-sm cursor-pointer'>LogOut</button>
      ) : (
        <div className='flex gap-3 mr-5'>
          <Link to="/login">
            <p className="text-blue-600 underline">LogIn</p>
          </Link>
          <Link to="/signup">
            <p className="text-blue-600 underline">SignUp</p>
          </Link></div>
      )}
      </div>
     
    </div>
  );
};
