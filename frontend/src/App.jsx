import React from 'react'
import Start from './pages/Start'
import UserLogin from "./pages/UserLogin";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import UserSignup from "./pages/UserSignUp";
import Captainlogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignUp";
import { Route, Routes } from 'react-router-dom'
import CaptainLogin from './pages/CaptainLogin';

const App = () => {
  return (
    <div>
     {/* <Routes>
      <Route path='/' element = {<Start/>} />
      <Route path='/login' element = {<UserLogin />} />
      <Route path='/riding' element = {<Riding />} />
      <Route path='/captain-riding' element = {<CaptainRiding />} />

       <Route path='/signup' element={<UserSignup />} />
       <Route path='/captain-login' element={<Captainlogin />} />
       <Route path='/captain-signup' element={<CaptainSignup />} />
     </Routes> */}
     <CaptainLogin />
    </div>
  )
}

export default App
