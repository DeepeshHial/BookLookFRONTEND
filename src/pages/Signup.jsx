import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"


const Signup = () => {
  const [Values,setValues] = useState({
    username:"",email:"",password:"",address:"",
  })
  const navigate = useNavigate()
  
  const change= (e)=>{
    const {name ,value} = e.target;
    setValues({...Values,[name]: value});
  };

  const submit= async (e)=>{
    e.preventDefault();
   try {
    if(Values.username === "" || Values.email ==="" || Values.password === "" || Values.address ===""){
      alert("All field are required")
    }
    else{
      const response = await axios.post("https://booklook-wzjh.onrender.com/api/v1/sign-up",Values);
      console.log(response)
      alert(response.data.message)
      navigate("/login")
    }
    
   } catch (error) {
    alert(error.response.data.message)
   }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen ">
    <div className="w-full max-w-md p-8 rounded-lg ">
      <h2 className="mb-6 text-3xl font-bold text-center ">Sign Up</h2>
      <form className="space-y-6">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium ">
            Username
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={Values.username}
              onChange={change}
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium ">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={Values.email}
              onChange={change}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium ">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={Values.password}
              onChange={change}
            />
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium ">
            Address
          </label>
          <div className="mt-1">
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="address"
              required
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Address"
              value={Values.address}
              onChange={change}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md group hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
            onClick={submit}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup
