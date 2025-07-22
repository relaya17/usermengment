import { jsx as _jsx } from "react/jsx-runtime";
// src/context/AuthContext.tsx
import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        // טען משתמש אם יש token ב-localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, logout }, children: children }));
};
