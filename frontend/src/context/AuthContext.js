'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        // Build this robustly later. For now, check if token exists.
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('https://tetane2.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            // Redirect based on role
            if (data.user.role === 'admin') router.push('/dashboard/admin');
            else if (data.user.role === 'instructor') router.push('/dashboard/instructor');
            else router.push('/dashboard/student');

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async ({ name, email, password, role }) => {
        try {
            const res = await fetch('https://tetane2.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Registration failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            // Redirect based on role
            if (data.user.role === 'admin') router.push('/dashboard/admin');
            else if (data.user.role === 'instructor') router.push('/dashboard/instructor');
            else router.push('/dashboard/student');

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
