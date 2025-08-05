import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className='max-h-[90vh] overflow-y-auto'>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setWaitingForDriver(false)
      }}><i className="text-2xl sm:text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='mt-6 sm:mt-0'>
        <div className='flex items-center justify-between mb-4'>
          <img className='h-10 sm:h-12 flex-shrink-0' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
          <div className='text-right min-w-0 flex-1 ml-3'>
            <h2 className='text-sm sm:text-lg font-medium capitalize truncate'>{props.ride?.captain.firstname}</h2>
            <h4 className='text-lg sm:text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
            <p className='text-xs sm:text-sm text-gray-600'>Maruti Suzuki Alto</p>
            <h1 className='text-sm sm:text-lg font-semibold'>OTP: {props.ride?.otp}</h1>
          </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-3 sm:mt-5'>
            <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
              <i className="ri-map-pin-user-fill flex-shrink-0 text-sm sm:text-base"></i>
              <div className='min-w-0 flex-1'>
                <h3 className='text-sm sm:text-lg font-medium'>562/11-A</h3>
                <p className='text-xs sm:text-sm -mt-1 text-gray-600 truncate'>{props.ride?.pickup}</p>
              </div>
            </div>
            <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
              <i className="text-sm sm:text-lg ri-map-pin-2-fill flex-shrink-0"></i>
              <div className='min-w-0 flex-1'>
                <h3 className='text-sm sm:text-lg font-medium'>562/11-A</h3>
                <p className='text-xs sm:text-sm -mt-1 text-gray-600 truncate'>{props.ride?.destination}</p>
              </div>
            </div>
            <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3'>
              <i className="ri-currency-line flex-shrink-0 text-sm sm:text-base"></i>
              <div className='min-w-0 flex-1'>
                <h3 className='text-sm sm:text-lg font-medium'>₹{props.ride?.fare}</h3>
                <p className='text-xs sm:text-sm -mt-1 text-gray-600'>Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
