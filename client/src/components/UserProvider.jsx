import React, { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(JSON.parse(Cookies.get("currentUser") || null));
 return (
    <UserContext.Provider value={{ user,  setCurrentUser }}> 
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
