import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ 
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    memberID: Cookies.get('memberID') || null 
  });

  const login = (accessToken, refreshToken, memberID) => {
    Cookies.set('accessToken', accessToken, { expires : 1/48, path: '/' });
    Cookies.set('refreshToken', refreshToken, { expires : 2, path: '/' });
    Cookies.set('memberID', memberID, { expires : 2, path: '/' });
    setAuth({ accessToken: accessToken, refreshToken: refreshToken, memberID: memberID });
  };

  const refreshToken = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/refresh', {
        headers: {
          'Authorization' : `Bearer: ${auth.accessToken}`
        }
      });
      const { accessToken } = res;
      Cookies.set('accessToken', accessToken, { expires: 1/48});
      setAuth(prev => ({ ...prev, accessToken }));
    } catch(error) {
      console.log("Error refreshing token: ", error);
    }
  }

  const getToken = () => {
    const token = Cookies.get("accessToken");
    return token;
  }

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('memberID');
    localStorage.clear();
    setAuth({ accessToken: null, refreshToken: null, memberID: null });
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      if(auth.accessToken && auth.refreshToken) {
        localStorage.clear();
        refreshToken();
      }
    }, 1000 * 60 * 28);
    return () => clearInterval(interval);
  }, [auth.accessToken, auth.refreshToken]);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
