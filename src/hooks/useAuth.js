import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/services/authService';

export function useAuth() {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check if user is authenticated
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    // Login handler
    const login = useCallback(async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            const response = await authService.login({ email, password });

            if (response.token) {
                localStorage.setItem('token', response.token);
                const userData = response.user || { email };
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('clientName', userData.name || 'Default Client');
                setUser(userData);
                return { success: true };
            } else {
                setError('Login failed. Please check your credentials.');
                return { success: false };
            }
        } catch (err) {
            const errorMessage = err.message || 'Login failed. Please try again.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout handler
    const logout = useCallback(() => {
        authService.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('clientName');
        setUser(null);
        navigate('/');
    }, [navigate]);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        clearError
    };
}