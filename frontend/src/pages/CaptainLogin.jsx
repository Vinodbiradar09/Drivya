import React,{useState , useContext} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import { captainLogin } from '../lib/api';
const CaptainLogin = () => {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = { email, password };
    const res = await captainLogin(captainData);
    
    if (res.statusCode === 200) {
      setCaptain(res.data.captain); 
      navigate('/captain-home');
    }
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
           {/* <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/Drivya-driver.svg" alt="" /> */}
              <p className="w-20 mb-3 font-light tracking-wide text-3xl text-gray-800">Drivya</p>
           <form onSubmit={(e)=>{
            submitHandler(e)
           }}>
              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
              <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}   className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'  placeholder='email@example.com' />

              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
              <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}     className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'   placeholder='password'
              />
                <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

           </form>
             <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>

        </div>
      <div>
         <Link to={'/login'}   className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
        Sign as a User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
