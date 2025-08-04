import React from 'react'
import Start from './pages/Start'
import UserLogin from "./pages/UserLogin";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import UserSignup from "./pages/UserSignUp";
import Captainlogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignUp";
import { Route, Routes } from 'react-router-dom'
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Home from "./pages/Home";
import UserLogout from "./pages/UserLogout";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainHome from "./pages/CaptainHome";
const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/' element = {<Start/>} />
      <Route path='/login' element = {<UserLogin />} />
      <Route path='/riding' element = {<Riding />} />
      <Route path='/captain-riding' element = {<CaptainRiding />} />

       <Route path='/signup' element={<UserSignup />} />
       <Route path='/captain-login' element={<Captainlogin />} />
       <Route path='/captain-signup' element={<CaptainSignup />} />
       <Route path='/home' element= {<UserProtectWrapper><Home /></UserProtectWrapper>} />
       <Route path='/user/logout' element={<UserProtectWrapper><UserLogout /></UserProtectWrapper>} />

       <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>} />
       <Route path='/captain/logout' element={<CaptainProtectWrapper> <CaptainLogout /></CaptainProtectWrapper>} />
     </Routes>
   
    </div>
  )
}

export default App
