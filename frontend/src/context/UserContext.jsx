import React, {useState , createContext} from 'react'
export const UserDataContext = createContext();


const UserContext = ({children}) => {
    const [user , setUser]= useState({
        email : '',
        firstName : '',
        lastName : '',
    });
  return (
    <div>
        <div>
            <UserDataContext.Provider value={{user, setUser}}>
                {children}
            </UserDataContext.Provider>
        </div>
    </div>
  )
}

export default UserContext
