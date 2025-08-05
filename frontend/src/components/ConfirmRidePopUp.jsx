import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { axiosInstances } from '../lib/axios'

const ConfirmRidePopUp = (props) => {
  const [otp , setOtp] = useState('');
  const navigate = useNavigate();
  
  const submitHander = async(e)=>{
    e.preventDefault();
    const response = await axiosInstances.get('/ride/start-ride' , {
      params : {
        rideId : props.ride._id,
        otp : otp,
      },
    });
    if(response.status === 200){
      props.setConfirmRidePopupPanel(false),
      props.setRidePopupPanel(false),
      navigate('/captain-riding', { state: { ride: props.ride } })
    }
  }

  return (
    <div className='max-h-[90vh] overflow-y-auto'>
      <h5 className='p-1 text-center w-full absolute top-0 left-0' onClick={() => {
        props.setRidePopupPanel(false)
      }}>
        <i className="text-2xl sm:text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-xl sm:text-2xl font-semibold mb-4 sm:mb-5 mt-6 sm:mt-0'>Confirm this ride to Start</h3>
      
      <div className='flex items-center justify-between p-2 sm:p-3 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-2 sm:gap-3 min-w-0 flex-1'>
          <img className='h-10 sm:h-12 rounded-full object-cover w-10 sm:w-12 flex-shrink-0' 
               src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
          <h2 className='text-base sm:text-lg font-medium capitalize truncate'>{props.ride?.user.firstName}</h2>
        </div>
        <h5 className='text-base sm:text-lg font-semibold flex-shrink-0'>2.2 KM</h5>
      </div>
      
      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-3 sm:mt-5'>
          <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
            <i className="ri-map-pin-user-fill flex-shrink-0"></i>
            <div className='min-w-0 flex-1'>
              <h3 className='text-base sm:text-lg font-medium'>562/11-A</h3>
              <p className='text-xs sm:text-sm -mt-1 text-gray-600 truncate'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
            <i className="text-base sm:text-lg ri-map-pin-2-fill flex-shrink-0"></i>
            <div className='min-w-0 flex-1'>
              <h3 className='text-base sm:text-lg font-medium'>562/11-A</h3>
              <p className='text-xs sm:text-sm -mt-1 text-gray-600 truncate'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3'>
            <i className="ri-currency-line flex-shrink-0"></i>
            <div className='min-w-0 flex-1'>
              <h3 className='text-base sm:text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-xs sm:text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-4 sm:mt-6 w-full'>
          <form onSubmit={submitHander}>
            <input 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              type="text" 
              className='bg-[#eee] px-4 sm:px-6 py-3 sm:py-4 font-mono text-base sm:text-lg rounded-lg w-full' 
              placeholder='Enter OTP' 
            />

            <button className='w-full mt-3 sm:mt-5 text-base sm:text-lg flex justify-center bg-green-600 text-white font-semibold p-2 sm:p-3 rounded-lg'>
              Confirm
            </button>
            <button onClick={() => {
              props.setConfirmRidePopupPanel(false)
              props.setRidePopupPanel(false)
            }} className='w-full mt-2 bg-red-600 text-base sm:text-lg text-white font-semibold p-2 sm:p-3 rounded-lg'>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
