import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div className='h-full flex flex-col pb-4'>
      <h5 className='p-1 text-center w-full flex-shrink-0' onClick={() => {
        props.setConfirmRidePanel(false)
      }}>
        <i className="text-2xl sm:text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      
      <div className='flex-1 flex flex-col min-h-0 px-2 pb-2'>
        <h3 className='text-lg sm:text-xl md:text-2xl font-semibold mb-3 flex-shrink-0'>Confirm your Ride</h3>

        <div className='flex-1 flex flex-col overflow-hidden'>
          <div className='flex flex-col items-center mb-3 flex-shrink-0'>
            <img className='h-10 sm:h-12 md:h-14 w-auto object-contain' 
                 src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
          </div>
          
          <div className='flex-1 overflow-y-auto min-h-0'>
            <div className='w-full'>
              <div className='flex items-center gap-2 sm:gap-3 p-2 border-b-2'>
                <i className="ri-map-pin-user-fill flex-shrink-0 text-green-600 text-sm sm:text-base"></i>
                <div className='min-w-0 flex-1'>
                  <h3 className='text-sm sm:text-base font-medium'>562/11-A</h3>
                  <p className='text-xs sm:text-sm text-gray-600 truncate'>{props.pickup}</p>
                </div>
              </div>
              <div className='flex items-center gap-2 sm:gap-3 p-2 border-b-2'>
                <i className="text-sm sm:text-base ri-map-pin-2-fill flex-shrink-0 text-red-600"></i>
                <div className='min-w-0 flex-1'>
                  <h3 className='text-sm sm:text-base font-medium'>562/11-A</h3>
                  <p className='text-xs sm:text-sm text-gray-600 truncate'>{props.destination}</p>
                </div>
              </div>
              <div className='flex items-center gap-2 sm:gap-3 p-2'>
                <i className="ri-currency-line flex-shrink-0 text-sm sm:text-base"></i>
                <div className='min-w-0 flex-1'>
                  <h3 className='text-sm sm:text-base font-medium'>₹{props.fare[props.vehicleType]}</h3>
                  <p className='text-xs sm:text-sm text-gray-600'>Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className='flex-shrink-0 pt-3 pb-8'>
            <button onClick={() => {
              props.setVehicleFound(true)
              props.setConfirmRidePanel(false)
              props.createRide()
            }} className='w-full bg-green-600 text-white font-semibold p-3 rounded-lg text-base'>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRide