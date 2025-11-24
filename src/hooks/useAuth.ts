// hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // 检查认证状态
    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('token');
        // 这里可以添加更复杂的 token 验证逻辑
        const authenticated = !!token;
        setIsAuthenticated(authenticated);
        return authenticated;
    }, []);

    useEffect(() => {
        // 组件加载时检查认证状态
        checkAuth();
        setLoading(false);
    }, [checkAuth]);

    const login = useCallback((token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }, []);

    return {
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuth
    };
};