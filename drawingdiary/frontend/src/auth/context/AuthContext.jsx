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
    localStorage.clear();
    Cookies.set('accessToken', accessToken, { path: '/' });
    Cookies.set('refreshToken', refreshToken, { path: '/' });
    Cookies.set('memberID', memberID, { path: '/' });
    setAuth({ accessToken, refreshToken, memberID });
  };

  const refreshToken = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/refresh', {
        headers: {
          'Authorization': `Bearer ${auth.refreshToken}`
        }
      });
      const accessToken = res;
      Cookies.set('accessToken', accessToken, { path: '/' });
      setAuth(prev => ({ ...prev, accessToken }));
      return accessToken;
    } catch (error) {
      console.log("Error refreshing token: ", error);
      alert("로그인이 만료되었습니다!")
      logout();
    }
  };

  const getToken = () => {
    return auth.accessToken;
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("memberID");
    localStorage.clear();
    setAuth({ accessToken: null, refreshToken: null, memberID: null });
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async (error) => {
        if (error.response.status === 401 && !error.config._retry) {
          error.config._retry = true;
          const newAccessToken = await refreshToken();
          login(newAccessToken, newAccessToken, auth.memberID);
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    );

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