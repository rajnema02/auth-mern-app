import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email:'',
    password:'',
  });
  const navigate = useNavigate();

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setLoginInfo(prevInfo =>({...prevInfo, [name]:value}));
  }

  const handlelogin = async(e)=>{
    e.preventDefault();
    const {email, password} = loginInfo;
    if(!email || !password){
      return toast.error('Email and password are required');
    }

    try{
      const response = await axios.post("http://localhost:8002/api/auth/login",loginInfo);
      const {Token, message} = response.data;

      if(message){
        toast.error(message);
      }
      else if(Token){
        toast.success("Login Successfull");
        localStorage.setItem('token',Token);
        localStorage.setItem('loggedInUser',email);
        setLoginInfo({email:'',password:''});
        setTimeout(()=>{
          navigate('/home');
        },1000);
      }
      else{
        toast.error('login failed, please try again');
      }
    }
    catch(error){
      console.error(error);
      const errorMessage= error.response?.data?.message || "an unexpected error occured";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handlelogin}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input 
              onChange={handleChange}
              type="text"
              name="email"
              autoFocus
              placeholder='Enter your email'
              value={loginInfo.email}
            />
          </div>
          <div>
            <lable htmlFor="password">Password:</lable>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder='Enter your password'
              value={loginInfo.password}
            >
            </input>
          </div>
          <button type="submit">Login</button>
          <span>
            register now?
            <Link to="/SignUp"> signup</Link>
          </span>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    </>
  )
}

export default Login