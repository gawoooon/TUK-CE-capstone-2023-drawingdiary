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
    Cookies.set('accessToken', accessToken, { path: '/' });
    Cookies.set('refreshToken', refreshToken, { path: '/' });
    Cookies.set('memberID', memberID, { path: '/' });
    setAuth({ accessToken: accessToken, refreshToken: refreshToken, memberID: memberID });
  };

  const refreshToken = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/refresh');
      const { accessToken } = res;
      Cookies.set('accessToken', accessToken, { path: '/'});
      setAuth(prev => ({ ...prev, accessToken }));
      return accessToken;
    } catch(error) {
      // refresh token도 만료되면 다시 로그인.
      console.log("Error refreshing token: ", error);
      logout();
    }
  }

  const getToken = () => {;
    return auth.accessToken;
  }

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('memberID');
    localStorage.clear();
    setAuth({ accessToken: null, refreshToken: null, memberID: null });
  };
  
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async (error) => {
        if(error.response.status === 401) {
          alert("로그인이 만료되었습니다.");
          localStorage.clear();
          const newAccessToken = await refreshToken();
          console.log("newAccessToken: ", newAccessToken);
          console.log("newToken : ");
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    )
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [auth.accessToken, auth.refreshToken]);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
