import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import {  useNavigate } from 'react-router-dom'
import { currentUser } from '../lib/api';
const UserProtectWrapper = ({children}) => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserDataContext);
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
   const fetchUser = async()=>{
     try {
      const response = await currentUser();
     console.log('User profile response:', response);
      if(response && response.data && response.data.user){
          setUser(response.data.user);
      } else {
         console.error('Invalid response structure:', response);
         navigate('/login');
        return;
      }
    
       setIsLoading(false)
     } catch (err) {
      console.error("Error fetching user profile:", err);
        setIsLoading(false);
        navigate('/login');
     }
   }
    fetchUser();
  }, [])



    if (isLoading) {
        return <div>Loading...</div>
    }
  

  return <>{children}</>
}

export default UserProtectWrapper
