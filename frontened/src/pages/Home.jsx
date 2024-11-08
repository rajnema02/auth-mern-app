import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const user = localStorage.getItem('loggedInUser');
    if(user){
      setLoggedInUser(user);
    }
    else{
      navigate('/login');
    }
  },[navigate])

  const handleLoggedOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('user logged Out');
    setTimeout(()=>{
      navigate('/login');
    },1000);
  }
  return (
    <div>
      <h1>Welcome , {loggedInUser}</h1>
      <button onClick={handleLoggedOut}>Log Out</button>
    </div>
  )
}

export default Home
