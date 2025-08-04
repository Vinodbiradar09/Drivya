import React, {useState , useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {userLogin} from "../lib/api";

const UserLogin = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  // const [userData , setUserData] = useState({});

   const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e)=>{
    e.preventDefault();
    const userData = {
      email : email,
      password : password
    };
    const res = await userLogin(userData);
    console.log("ress" , res);
    if(res.statusCode === 200){
      setUser(res.data.user);
      navigate('/home');
    }

    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
           {/* <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" /> */}
        <p className="w-16 mb-10 font-light tracking-wide text-3xl text-gray-800">Drivya</p>

          <form onSubmit={(e)=> {
            submitHandler(e)
          }} >
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}  className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'  placeholder='email@example.com' />

               <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
               <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}    className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'  placeholder='password'/>

                <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

          </form>
            <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>

        </div>
        <div>
          <Link to={'/captain-login'}  className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
            Sign as a Captain
          </Link>
        </div>
    </div>
  )
}

export default UserLogin
