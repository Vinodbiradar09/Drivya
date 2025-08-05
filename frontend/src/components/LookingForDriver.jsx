import React from 'react'

const LookingForDriver = (props) => {
 return (
        <div className='max-h-[90vh] overflow-y-auto'>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}><i className="text-2xl sm:text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            
            <h3 className='text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-5 mt-6 sm:mt-0'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-16 sm:h-20 object-contain' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-3 sm:mt-5'>
                    <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill flex-shrink-0 text-sm sm:text-base"></i>
                        <div className='min-w-0 flex-1'>
                            <h3 className='text-sm sm:text-lg font-medium'>562/11-A</h3>
                            <p className='text-xs sm:text-sm -mt-1 text-gray-600 truncate'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
                        <i className="text-sm sm:text-lg ri-map-pin-2-fill flex-shrink-0"></i>
                        <div className='min-w-0 flex-1'>
                            <h3 className='text-sm sm:text-lg font-medium'>562/11-A</h3>
                            <p className='text-xs sm:text-sm -mt-1 text-gray-600 truncate'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3'>
                        <i className="ri-currency-line flex-shrink-0 text-sm sm:text-base"></i>
                        <div className='min-w-0 flex-1'>
                            <h3 className='text-sm sm:text-lg font-medium'>₹{props.fare[ props.vehicleType ]} </h3>
                            <p className='text-xs sm:text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver
