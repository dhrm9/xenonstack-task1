import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import backgroundImage from '../Images/house_login.jpg';

function LoginPage() {

  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('auth');
    
    if (token) {
      navigate('/home')  // Redirect to login page
    }
  },[])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth,setAuth]=useAuth('');

  const handleLogin = (e) => {
    e.preventDefault();
    
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
        console.log(process.env.REACT_APP_API)
      const res = await axios.post(
        `https://xenonstack-task1-ul2d.onrender.com/api/v1/login`,
        {email,password} 
      );

      if (res && res.data.success) {
            toast.success("Logged in successfully");
            
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
      
              });
              navigate("/home");
              localStorage.setItem('auth',JSON.stringify(res.data));
      } else {
        
            alert("not logged in")
      }
    } catch (erorr) {
        toast.warning("Something went wrong");    
    }
  };
  


  

  return (
    <div 
    className="container vh-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundImage: {backgroundImage}, // Replace with your image URL
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Login</button>
          {/* <div className="text-center mt-3">
            <a href="#" className="text-primary">Forgot Password?</a>
          </div> */}
        </form>

        <div className="text-center mt-3">
          <p>Don't have an account? <a href="/signup" className="text-primary">Sign Up</a></p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
