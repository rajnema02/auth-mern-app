import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast , ToastContainer } from 'react-toastify'
import { handleError } from '../utils';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Signup = () => {
    const[signUpInfo, setSignUpInfo] = useState({
        name:"",
        email:"",
        password:"",
    })
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setSignUpInfo((prevInfo)=>({...prevInfo, [name]:value}));
    };
    const handleSignUp = async(e)=>{
      e.preventDefault();
      const {name, email, password} = signUpInfo;
      if(!name ||!email || !password ){
        return handleError("Name,email and password are required");
      }

      try{
        const response = await axios.post("http://localhost:8002/api/auth/signup",signUpInfo);
        toast.success("Sign up Successfull!");
        setTimeout(()=>{
          navigate("/login");
        },1000);
      }
      catch(error){
        const errorMessage = "An unexpected error occur";
        handleError(errorMessage);
      }
    }
  return (
    <>
      <div className='container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
        <div>
            <label htmlFor="name">Name:</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your username"
              value={signUpInfo.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              placeholder="Enter your email"
              value={signUpInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={signUpInfo.password}
            />
          </div>
          <button type="submit">Sign Up</button>
          <span>
            Already have an account?
            <Link to="/login"> Login</Link>
          </span>
        </form>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Signup
