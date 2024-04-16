import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {
  const navigate = useNavigate();
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
      const response=await axios.post('http://localhost:8080/login', {formData},{headers});
      if (response.data.msg === "Login Successfull") {
        localStorage.setItem(
          "user",
          JSON.stringify({ username:response.data.data.userData.username, password: "" })
        );
        toast.success('User Login successfully!!!');
        navigate('/dashboard');
    }
      // if(response.ok){
      //   const res_data=await response.json();
      //   localStorage("token",res_data);
      //   toast.success('User Login successfully!!!');
      //   navigate('/dashboard');
      // }
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

  useEffect(() => {
    if (localStorage.getItem("user")) {

      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div>
      <div className='container'>
        <div style={{ marginLeft: '35%', marginTop: '5%' }}>
          <h1 className=''>Login Form</h1>
          <div className='card shadow bg-dark text-light p-2' style={{ width: '25rem' }}>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor="exampleInput1" className="form-label">Username:</label>
                <input type="text" className="form-control" id="exampleInput1" placeholder='Username' name='username' value={formData.username} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleEmail" placeholder='abc@gmail.com' name='email' value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='********' name='password' value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-outline-warning mt-2 justify-content-center">Login</button>
            </form>
            <div className='mt-3 text-center'>
              <p className='mb-0'>Not registered yet?</p>
              <Link to="/signup" className='text-decoration-none'>Signup here</Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
