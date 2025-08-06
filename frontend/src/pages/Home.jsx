import React, {useEffect , useRef , useState} from 'react'
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPannel';
import VehiclePannel from '../components/VehiclePannel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { handleSuggestions } from '../lib/api';
import { getFare } from '../lib/api';
import { createRideApi } from '../lib/api';
import { logoutUser } from '../lib/api';
const Home = () => {
  const [pickup , setPickup] = useState('');
  const [destination , setDestination] = useState('');
  const [panelOpen , setPanelOpen] = useState(false);
  const vehiclePanelRef =  useRef(null);
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel , setVehiclePanel] = useState(false);
  const [confirmRidePanel , setConfirmRidePanel] = useState(false);
  const [vehicleFound , setVehicleFound] = useState(false);
  const [waitingForDriver , setWaitingForDriver] = useState(false);
  const [pickupSuggestions , setPickupSuggestions] = useState([]);
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)

  const navigate = useNavigate();
  const {user} = useContext(UserDataContext);
  const {socket} = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join" , {userType : 'user' , userId : user._id})
  }, [user])

  socket.on('ride-confirmed' , ride =>{
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started' , ride =>{
     console.log("ride")
     setWaitingForDriver(false)
     navigate('/riding' , {state : {ride}})
  })

  const handlePickupChange = async(e)=>{
    setPickup(e.target.value);
    try {
      const res = await handleSuggestions({
        params : {input : e.target.value}
      });
      setPickupSuggestions(res.data);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

const handleDestinationChange = async(e)=>{
  setDestination(e.target.value);
  try {
    const res = await handleSuggestions({
      params : { input : e.target.value },
    });
    setDestinationSuggestions(res.data);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const handleLogout = async ()=>{
  const response = await logoutUser()
    .then((res)=>{
       if(res.statusCode === 200){
        console.log('fire');
        navigate('/login');
       }
    })
    .catch((err)=>{
       console.log(err);
       navigate('/login');
    })
}

const submitHandler = (e)=>{
  e.preventDefault();
}

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])

      useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

     useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])

    async function findTrip() {
      setVehiclePanel(true);
      setPanelOpen(false)
      const res = await getFare({
        params : {pickup , destination},
      })
      console.log('fare' , res.data);
      setFare(res.data);
    }

    async function createRide() {
      const res = await createRideApi(pickup , destination , vehicleType)
      console.log("res" , res);
      console.log("p" ,pickup);
      console.log('de' , destination);
      console.log('ve' , vehicleType);
    }

  return (
    <div className='h-screen relative overflow-hidden'>
       <img className='w-12 sm:w-16 absolute left-3 sm:left-5 top-3 sm:top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

       <button 
         onClick={handleLogout}
         className="absolute right-3 sm:right-3 top-3 sm:top-15 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
         aria-label="Logout"
       >
         <i className="ri-logout-circle-r-line text-xl text-gray-700"></i>
       </button>
       
       <div className='h-screen w-screen'>
        <LiveTracking />
       </div>
       
       <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
          <div className='h-[30%] p-4 sm:p-6 bg-white relative'>
             <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-4 sm:right-6 top-4 sm:top-6 text-xl sm:text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>

                      <h4 className='text-xl sm:text-2xl font-semibold'>Find a trip</h4>

                      <form className='relative py-2 sm:py-3' onSubmit={(e)=>{
                        submitHandler(e)
                      }}>

                          <div className="line absolute h-12 sm:h-16 w-1 top-[50%] -translate-y-1/2 left-4 sm:left-5 bg-gray-700 rounded-full"></div>

                          <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-8 sm:px-12 py-2 text-sm sm:text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />

                          <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-8 sm:px-12 py-2 text-sm sm:text-lg rounded-lg w-full mt-2 sm:mt-3'
                            type="text"
                            placeholder='Enter your destination' />

                      </form>

                      <button onClick={findTrip} className='bg-black text-white px-4 py-2 rounded-lg mt-2 sm:mt-3 w-full text-sm sm:text-base'>
                        Find Trip
                      </button>
          </div>

          <div ref={panelRef} className='bg-white h-0'>
                <LocationSearchPanel
                suggestions={ activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                 setPanelOpen={setPanelOpen}
                 setVehiclePanel={setVehiclePanel}
                 setPickup={setPickup}
                 setDestination={setDestination}
                 activeField={activeField}
                />
          </div>
       </div>

         <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-3 pt-4 h-[80vh]'>
                <VehiclePannel
                    selectVehicle={setVehicleType}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>

             <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-3 pt-4 h-[80vh]'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            
              <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-3 pt-4 h-[80vh]'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>
            
            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-3 pt-4 h-[80vh]'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
    </div>
  )
}

export default Home