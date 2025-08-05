import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerCaptainAccount } from '../lib/api';
const CaptainSignUp = () => {
  const navigate = useNavigate();
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [vehicleColor , setVehicleColor] = useState('');
  const [vehiclePlate , setVehiclePlate] =useState('');
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
  const [phoneNumber , setPhoneNumber] = useState('');

  const submitHandler = async (e)=>{
    e.preventDefault();
    const captainData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      vehicle : {
        color : vehicleColor,
        plate : vehiclePlate,
        capacity : vehicleCapacity,
        vehicleType : vehicleType
      }
    }
    const res = await registerCaptainAccount(captainData);
    // console.log('res cap' ,res)
    if(res.statusCode === 200){
      navigate('/captain-login');
    }


  }
  return (

    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
        <div>
          {/* <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" /> */}
           <p className="w-20 mb-3 font-light tracking-wide text-3xl text-gray-800">Drivya</p>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
              <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
              <div className='flex gap-4 mb-7'>
                <input type="text" required value={firstName} onChange={(e)=> setFirstName(e.target.value)}   placeholder='First name'  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base' />

                <input type="text" required value={lastName} onChange={(e)=> setLastName(e.target.value)} placeholder='Last name' className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'/>
              </div>

                <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
                <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}    placeholder='email@example.com'   className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' />
                 <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                 <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}    placeholder='password'   className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' />
                   <h3 className='text-lg font-medium mb-2'>Enter Number</h3>
                   <input type="number" required value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} 
                   placeholder='9999999999' className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                   />

                <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                <div className='flex gap-4 mb-7'>
                  <input type="text" required value={vehicleColor} onChange={(e)=>setVehicleColor(e.target.value)}    placeholder='Vehicle Color'   className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' />

                  <input type="text" required value={vehiclePlate} onChange={(e)=>setVehiclePlate(e.target.value)}
                    className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'    placeholder='Vehicle Plate'
                  />

                </div>

                <div className='flex gap-4 mb-7'>
                  <input type="number" required value={vehicleCapacity} onChange={(e)=>setVehicleCapacity(e.target.value)}    placeholder='Vehicle Capacity'   className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'/>

                  <select required    className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                    value={vehicleType} onChange={(e)=> setVehicleType(e.target.value)}
                  >
                    <option value="" disabled>Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="moto">Moto</option>
                  </select>
                </div>
                 <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain Account</button>
          </form>
          <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>

        </div>
         <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignUp
