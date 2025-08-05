import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { registerUserAccount } from '../lib/api';
const UserSignUp = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  
  const navigate = useNavigate();

  const submitHandler = async (e)=>{
    e.preventDefault();
    const userData = {
      firstName,
      lastName ,
      email,
      password
    }
    const res = await registerUserAccount(userData);
    if(res.statusCode === 200){
      navigate('/login');
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
              {/* <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" /> */}
                  <p className="w-16 mb-10 font-light tracking-wide text-3xl text-gray-800">Drivya</p>
              <form onSubmit={(e)=>{
                submitHandler(e)
              }}>
                <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
                <div className='flex gap-4 mb-7'>
                  <input type="text" required value={firstName} onChange={(e)=> setFirstName(e.target.value)}    placeholder='First name'   className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base' />

                  <input type="text" required value={lastName} onChange={(e)=> setLastName(e.target.value)}    placeholder='Last name'    className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base' />
                </div>

                 <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                  <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}  placeholder='email@example.com'    className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'/>

                 <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                 <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}   placeholder='password'   className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'/>


            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>
              </form>

                 <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>

        </div>
         <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>

      </div>
    </div>
  )
}

export default UserSignUp
