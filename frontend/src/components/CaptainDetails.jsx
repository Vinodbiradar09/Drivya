import React , {useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
    const {captain} = useContext(CaptainDataContext);
    
  return (
    <div className='p-3 sm:p-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-2 sm:gap-3 min-w-0 flex-1'>
                    <img className='h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover flex-shrink-0' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                    <h4 className='text-sm sm:text-lg font-medium capitalize truncate'>{captain.firstName + " " + captain.lastName}</h4>
                </div>
                <div className='text-right flex-shrink-0'>
                    <h4 className='text-lg sm:text-xl font-semibold'>₹295.20</h4>
                    <p className='text-xs sm:text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-2 sm:p-3 mt-4 sm:mt-8 bg-gray-100 rounded-xl justify-center gap-3 sm:gap-5 items-start'>
                <div className='text-center flex-1'>
                    <i className="text-xl sm:text-3xl mb-1 sm:mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-sm sm:text-lg font-medium'>10.2</h5>
                    <p className='text-xs sm:text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center flex-1'>
                    <i className="text-xl sm:text-3xl mb-1 sm:mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-sm sm:text-lg font-medium'>10.2</h5>
                    <p className='text-xs sm:text-sm text-gray-600'>Speed Avg</p>
                </div>
                <div className='text-center flex-1'>
                    <i className="text-xl sm:text-3xl mb-1 sm:mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-sm sm:text-lg font-medium'>10.2</h5>
                    <p className='text-xs sm:text-sm text-gray-600'>Trips</p>
                </div>
            </div>
        </div>
  )
}

export default CaptainDetails
