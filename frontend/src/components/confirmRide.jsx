import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div className='max-h-[90vh] overflow-y-auto'>
      <h5 className='p-1 text-center w-full absolute top-0 left-0' onClick={() => {
        props.setConfirmRidePanel(false)
      }}>
        <i className="text-2xl sm:text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      
      <h3 className='text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-0'>Confirm your Ride</h3>

      <div className='flex flex-col items-center'>
        <img className='h-12 sm:h-14 md:h-16 w-auto object-contain mb-3' 
             src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        
        <div className='w-full'>
          <div className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-b-2'>
            <i className="ri-map-pin-user-fill flex-shrink-0 text-green-600 text-sm sm:text-base"></i>
            <div className='min-w-0 flex-1'>
              <h3 className='text-sm sm:text-base font-medium'>562/11-A</h3>
              <p className='text-xs sm:text-sm -mt-1 text-gray-600 truncate'>{props.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-b-2'>
            <i className="text-sm sm:text-base ri-map-pin-2-fill flex-shrink-0 text-red-600"></i>
            <div className='min-w-0 flex-1'>
              <h3 className='text-sm sm:text-base font-medium'>562/11-A</h3>
              <p className='text-xs sm:text-sm -mt-1 text-gray-600 truncate'>{props.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 mb-3'>
            <i className="ri-currency-line flex-shrink-0 text-sm sm:text-base"></i>
            <div className='min-w-0 flex-1'>
              <h3 className='text-sm sm:text-base font-medium'>₹{props.fare[ props.vehicleType ]}</h3>
              <p className='text-xs sm:text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
      
      <button onClick={() => {
        props.setVehicleFound(true)
        props.setConfirmRidePanel(false)
        props.createRide()
      }} className='w-full bg-green-600 text-white font-semibold p-2 sm:p-3 rounded-lg text-sm sm:text-base mt-3'>
        Confirm
      </button>
    </div>
  )
}

export default ConfirmRide
