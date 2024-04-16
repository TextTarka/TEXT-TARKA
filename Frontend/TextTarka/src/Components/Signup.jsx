

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import { Card } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox
} from 'mdb-react-ui-kit';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  margin: theme.spacing(5),
}));

function Signup() {
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
      const headers = {
        'Content-Type': 'application/json'
      }
      await axios.post('http://localhost:8080/signup', { formData }, { headers });

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
    <div className="bg-dark" style={{ minHeight: '100vh' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <StyledCard className='text-black m-5'>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size='lg' />
                    <MDBInput
                      placeholder='Username'
                      id='form1'
                      type='text'
                      className='w-100'
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg' />
                    <MDBInput
                      placeholder='Email'
                      id='form2'
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg' />
                    <MDBInput
                      id='form3'
                      placeholder='Password'
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className='mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='I agree all statements in Terms of service' required />
                  </div>
                  <button type="submit" className="btn btn-secondary mt-4 justify-content-center" style={{ backgroundColor: 'black', color: 'white' }}>Register</button>
                </form>
                <div className='mt-3 text-center'>
                  <p className='mb-0'>Already registered ?</p>
                  <Link to="/login" className='text-decoration-none'>Login here</Link>
                </div>
              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>

            </MDBRow>
          </MDBCardBody>
        </StyledCard>
      </div>
    </div>
  );
}

export default Signup;







// import React, { useState } from 'react';
// import axios from 'axios';
// import {useNavigate,Link} from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { styled } from '@mui/system';
// import { Card } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   MDBBtn,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBCardImage,MDBInput,MDBIcon,MDBCheckbox
// } from 'mdb-react-ui-kit';

// const StyledCard = styled(Card)(({ theme }) => ({
//   borderRadius: theme.spacing(3),
//   margin: theme.spacing(5),
// }));


// function Signup() {
//   const navigate= useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const headers={
//         'Content-Type':'application/json'
//       }
//       await axios.post('http://localhost:8080/signup', {formData},{headers});
      
//       setFormData({
//         username: '',
//         email: '',
//         password: ''
//       });
//       toast.success('User registered successfully!!!');
//       navigate('/login');
//     } 
//     catch (error) {
//       if (error.response) {
//         console.error('Server Error:', error.response.data);
//         console.error('Status Code:', error.response.status);
//         toast.error(error.response.data, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       } else if (error.request) {
//         console.error('No Response Received:', error.request);
//       } else {
//         console.error('Error:', error.message);
//       }
//     }
    
//   };

//   return (
//     <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
//       <StyledCard className='text-black m-5'>
//         <MDBCardBody>
//           <MDBRow>
//             <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

//               <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

//               <form onSubmit={handleSubmit}>
//                 <div className="d-flex flex-row align-items-center mb-4 ">
//                   <MDBIcon fas icon="user me-3" size='lg'/>
//                   <MDBInput  
//                     placeholder='Username'
//                     id='form1' 
//                     type='text' 
//                     className='w-100' 
//                     name='username'
//                     value={formData.username} 
//                     onChange={handleChange} 
//                     required 
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <MDBIcon fas icon="envelope me-3" size='lg'/>
//                   <MDBInput 
//                     placeholder='Email' 
//                     id='form2' 
//                     type='email' 
//                     name='email'
//                     value={formData.email} 
//                     onChange={handleChange} 
//                     required 
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <MDBIcon fas icon="lock me-3" size='lg'/>
//                   <MDBInput 
//                     id='form3' 
//                     placeholder='Password'
//                     type='password' 
//                     name='password'
//                     value={formData.password} 
//                     onChange={handleChange} 
//                     required 
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-secondary mt-4 justify-content-center" style={{backgroundColor:'black' ,color:'white'}}>Register</button>
//               </form>
//                 <div className='mt-3 text-center'>
//                   <p className='mb-0'>Already registered ?</p>
//                   <Link to="/login" className='text-decoration-none'>Login here</Link>
//                 </div>
//             </MDBCol>

//             <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
//               <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
//             </MDBCol>

//           </MDBRow>
//         </MDBCardBody>
//       </StyledCard>
//     </MDBContainer>
//   );
  
  
// }
  

// export default Signup;
