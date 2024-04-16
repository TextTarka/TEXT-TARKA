import React from 'react'
import {Routes,Route} from 'react-router-dom'

import Landing from './Components/Landing'
import Signup from './Components/Signup'
import Login from './Components/Login'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PdfViewer from './Components/Dashboard'

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/dashboard' element={<PdfViewer />}/>
        <Route path='/landing' element={<Landing />}></Route>
      </Routes>
    </div>
  )
}

export default App