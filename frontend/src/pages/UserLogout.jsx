import React from 'react'
import { logoutUser } from '../lib/api';
import { useNavigate} from 'react-router-dom';

const UserLogout = () => {
 
   const navigate = useNavigate();
  const response = logoutUser()
  .then((res)=>{
     if(res.statusCode === 200){
      navigate('/login');
     }
  })
  .catch((err)=>{
     console.log(err);
     navigate('/login');
  })

  response
 
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout
