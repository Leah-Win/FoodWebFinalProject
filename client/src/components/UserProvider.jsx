import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  // const [userID, setUserID] = useState();

  //  const updateUserID = () => {
  //   const id = JSON.parse(localStorage.getItem('currentUser')).id;
  //   setUserID(id);
  // };

//A
  const initialUser = JSON.parse(localStorage.getItem("currentUser"))

  const [user, setUser] = useState(initialUser);
  const setCurrentUser = (user) => {
    setUser(user);
  };
  //A
 return (
    <UserContext.Provider value={{ user,  setCurrentUser }}> 
      {children}
    </UserContext.Provider>
  );
  // return (
  //   <UserContext.Provider value={{ userID, updateUserID }}>
  //     {children}
  //   </UserContext.Provider>
  // );
};

export default UserProvider;
