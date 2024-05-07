import axios from 'axios';
import React from 'react';
export const UserContext = React.createContext();
export default function App() {
    const loadDate = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/statistic',
            {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                }
            });
        } catch(error) {
            console.log("error!");
        }
    };
    return (
        // <UserContext.Provider value={}>

        // </UserContext.Provider>
    )
};

function Date() {
    const value = React.useContext(UserContext);
    return ();
}