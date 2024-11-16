import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialUserState = (() => {
        const cookieUser = Cookies.get("jwt");
        const localStorageUser = localStorage.getItem("ChatApp");
        try {
            return cookieUser ? JSON.parse(cookieUser) : localStorageUser ? JSON.parse(localStorageUser) : undefined;
        } catch {
            return undefined;
        }
    })();

    const [authUser, setAuthUser] = useState(initialUserState);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
