import React from 'react'

const VehiclePannel = (props) => {
  return (
    <div className='h-full max-h-[85vh] flex flex-col'>
      <h5 className='p-1 text-center w-full flex-shrink-0' onClick={() => {
        props.setVehiclePanel(false)
      }}>
        <i className="text-2xl sm:text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      
      <div className='flex-1 flex flex-col min-h-0 px-2'>
        <h3 className='text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 flex-shrink-0'>Choose a Vehicle</h3>
        
        <div className='flex-1 overflow-y-auto space-y-2'>
          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('car')
          }} className='flex border-2 active:border-black rounded-xl w-full p-2 sm:p-3 items-center justify-between'>
            <img className='h-8 sm:h-10 flex-shrink-0' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
            <div className='ml-2 flex-1 min-w-0'>
              <h4 className='font-medium text-sm sm:text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
              <h5 className='font-medium text-xs sm:text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600 truncate'>Affordable, compact rides</p>
            </div>
            <h2 className='text-sm sm:text-lg font-semibold flex-shrink-0 ml-2'>₹{props.fare.car}</h2>
          </div>
          
          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('moto')
          }} className='flex border-2 active:border-black rounded-xl w-full p-2 sm:p-3 items-center justify-between'>
            <img className='h-8 sm:h-10 flex-shrink-0' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
            <div className='ml-2 flex-1 min-w-0'>
              <h4 className='font-medium text-sm sm:text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
              <h5 className='font-medium text-xs sm:text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600 truncate'>Affordable motorcycle rides</p>
            </div>
            <h2 className='text-sm sm:text-lg font-semibold flex-shrink-0 ml-2'>₹{props.fare.moto}</h2>
          </div>
          
          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('auto')
          }} className='flex border-2 active:border-black rounded-xl w-full p-2 sm:p-3 items-center justify-between'>
            <img className='h-8 sm:h-10 flex-shrink-0' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
            <div className='ml-2 flex-1 min-w-0'>
              <h4 className='font-medium text-sm sm:text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
              <h5 className='font-medium text-xs sm:text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600 truncate'>Affordable Auto rides</p>
            </div>
            <h2 className='text-sm sm:text-lg font-semibold flex-shrink-0 ml-2'>₹{props.fare.auto}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehiclePannel