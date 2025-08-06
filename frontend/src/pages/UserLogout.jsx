import React from 'react'
import { logoutUser } from '../lib/api';
import { useNavigate} from 'react-router-dom';

const UserLogout = () => {
   const navigate = useNavigate();
  const logout = async ()=>{
  
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
   console.log('res' ,response);
  }

 
 
  return (
    <div>
      <button className='p-2 m-2' onClick={logout}>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </button>
    </div>
  )
}

export default UserLogout
