import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("rb_user"));
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() =>
        localStorage.getItem("rb_token")
    );

    function login(userData, jwt) {
        setUser(userData);
        setToken(jwt);

        localStorage.setItem("rb_user", JSON.stringify(userData));
        localStorage.setItem("rb_token", jwt);
    }

    function logout() {
        setUser(null);
        setToken(null);

        localStorage.removeItem("rb_user");
        localStorage.removeItem("rb_token");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}