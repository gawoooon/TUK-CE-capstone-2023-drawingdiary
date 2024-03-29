import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance, { setAuthToken } from '../../axios/axisoInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, memberID: null });

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedMemberID = localStorage.getItem('memberID');

        if (storedToken && storedMemberID) {
            setAuthToken(storedToken);
            setAuth({ token: storedToken, memberID: storedMemberID });
        }
    }, []);

    const login = (token, memberID) => {
        setAuthToken(token);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('memberID', memberID);
        setAuth({ token, memberID });
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('memberID');
        setAuth({ token: null, memberID: null });
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
