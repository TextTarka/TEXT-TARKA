import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Landing from './Components/Landing'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/landing' element={<Landing />}></Route>
      </Routes>
    </div>
  )
}

export default App