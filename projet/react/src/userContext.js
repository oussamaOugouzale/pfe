import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(false);

    return (
        <UserContext.Provider value={{ userLogin, setUserLogin }}>
            {children}
        </UserContext.Provider>
    );
};
