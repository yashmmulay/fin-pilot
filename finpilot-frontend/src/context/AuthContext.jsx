import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const login = (response) => {

        localStorage.setItem("token", response.token);

        localStorage.setItem(
            "user",
            JSON.stringify({
                id: response.userId,
                fullName: response.fullName,
                email: response.email,
                role: response.role
            })
        );

        setToken(response.token);

        setUser({
            id: response.userId,
            fullName: response.fullName,
            email: response.email,
            role: response.role
        });
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;