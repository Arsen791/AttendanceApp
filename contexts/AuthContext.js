import { createContext, useContext, useState } from "react";
import React from 'react'; 
import { View, Text } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null); 
  const [userData, setUserData] = useState(null);

  const setUserProfile = (profileData) => {
    setUserData(profileData);
  };

  // Передаем setAuth в контекст
  return (
    <AuthContext.Provider value={{ auth, setAuth, userData, setUserProfile }}>
      {React.Children.map(children, child => 
        typeof child === 'string' ? <Text>{child}</Text> : child
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
