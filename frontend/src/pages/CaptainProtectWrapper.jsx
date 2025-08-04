import React, {useState , useContext , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { currentCaptain } from '../lib/api'
const CaptainProtectWrapper = ({children}) => {
  const navigate = useNavigate();
  const {setCaptain} = useContext(CaptainDataContext);
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    const fetchCaptain = async()=>{
      try {
         const response = await currentCaptain();

      if(response && response.data  && response.data.captain){
        setCaptain(response.data.captain);
      } else {
         console.error('Invalid response structure:', response);
         navigate('/captain-login');
        return;
      }
        setIsLoading(false)
      } catch (error) {
         console.error("Error fetching user profile:", error);
        setIsLoading(false);
        navigate('/captain-login');
      }
    }
    fetchCaptain();
  }, [])
   if (isLoading) {
        return <div>Loading...</div>
    }
  

  return <>{children}</>
}

export default CaptainProtectWrapper
