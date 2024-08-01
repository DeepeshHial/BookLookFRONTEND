import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import {authAction} from '../store/auth'
import {useDispatch} from 'react-redux'

import axios from "axios"
const Login = () => {
  const [Values,setValues] = useState({
   email:"",password:"",
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const change= (e)=>{
    const {name ,value} = e.target;
    setValues({...Values,[name]: value});
  };

  const submit= async (e)=>{
    e.preventDefault();
   try {
    if( Values.email ==="" || Values.password === "" ){
      alert("All field are required")
    }
    else{
      const response = await axios.post("https://booklook-wzjh.onrender.com/api/v1/login",Values);
      // console.log(response.data)

      dispatch(authAction.login())
      dispatch(authAction.changeRole(response.data.role))
      localStorage.setItem("id", response.data.id)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("role", response.data.role)
      navigate("/profile")
    }
    
   } catch (error) {
    // alert(error.response.data.message)
    console.log(error)
   }
  }
  return (
 

    <div className="flex items-center justify-center min-h-screen ">
    <div className="w-full max-w-md p-8 ">
      <h2 className="mb-6 text-3xl font-bold text-center ">Login</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
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

        <div>
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md group hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={submit}>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login
