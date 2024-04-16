import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import { toast } from 'react-toastify';


function Signup() {
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers={
        'Content-Type':'application/json'
      }
      await axios.post('http://localhost:8080/signup', {formData},{headers});
      
      setFormData({
        username: '',
        email: '',
        password: ''
      });
      toast.success('User registered successfully!!!');
      navigate('/login');
    } 
    catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (error.request) {
        console.error('No Response Received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
    
  };

  return (
    <div className='container'>
      <div style={{ marginLeft: '35%', marginTop: '5%' }}>
        <h1 className=''>SignUp Form</h1>
        <div className='card shadow bg-dark text-light p-2' style={{ width: '25rem' }}>
          <form onSubmit={handleSubmit} >
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">Username:</label>
              <input type="text" className="form-control" id="UserName" placeholder='User Name' name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address:</label>
              <input type="email" className="form-control" id="email" placeholder='abc@gmail.com' name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" name="password" id="password" placeholder='********' value={formData.password} onChange={handleChange} required />
            </div>
            
            <button type="submit" className="btn btn-outline-warning mt-4 justify-content-center">Register</button>
          </form>
          <div className='mt-3 text-center'>
              <p className='mb-0'>Already registered ?</p>
              <Link to="/login" className='text-decoration-none'>Login here</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
