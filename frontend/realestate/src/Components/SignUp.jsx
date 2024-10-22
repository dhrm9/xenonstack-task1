import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [auth,setAuth]=useAuth('');
  const navigate=useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const signUpData={
        name:name,
        email:email,
        password:password,
        confirmPassword:confirmPassword,
      }
      //console.log("signUpData= ",signUpData);
      try {
        //console.log("formValues= ",formValues);
        // setData(signUpData);
        console.log(process.env.REACT_APP_API)
        const res=await axios.post(`https://xenonstack-task1-ul2d.onrender.com/api/v1/signup`,
        {name,email,password});
        console.log(res);
        if(res.data.success)
        {
          toast.success(res.data.message);
          navigate("/");
        }
        else
        {
          toast.warning(res.data.message);
        }
      } catch (error) {
        toast.warning(error);
      }
    
  };



  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Sign Up</button>
        </form>

        <div className="text-center mt-3">
          <p>Already have an account? <a href="/login" className="text-primary">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
