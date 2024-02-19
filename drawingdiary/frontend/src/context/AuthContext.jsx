import React, { createContext, useContext, useState } from 'react';
import axiosInstance, { setAuthToken } from '../axios/axisoInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (accessToken) => {
        setAuthToken(accessToken);
        setUser({ accessToken });
        console.log("token: ", accessToken);
    };

    const logout = () => {
        setAuthToken(null);
        // 추가적인 로그아웃 처리 로직이 필요하면 여기에 작성
    };

    return (
        <AuthContext.Provider value={{ user, login }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
