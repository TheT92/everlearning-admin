// hooks/useAuthInterceptor.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EXCLUDE_ROUTERS = ['/login', '/signup']; // 不需要 token 的路由

export const useAuthInterceptor = (auth: any) => {
    const navigate = useNavigate();
    const { logout, checkAuth } = auth;

    useEffect(() => {
        // 请求拦截器
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const url = config.url || '';
                // 判断是否存在token,如果存在将每个页面header添加token
                if (!EXCLUDE_ROUTERS.some(route => url.includes(route))) {
                    const token = localStorage.getItem("token");
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                        // 或者使用你原来的 header 名称
                        // config.headers.token = token;
                    } else {
                        navigate('/login', { replace: true });
                        return Promise.reject(new Error('No token found'));
                    }
                }
                return config;
            },
            error => Promise.reject(error)
        );

        // 响应拦截器
        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            (error) => {
                const status = error.response?.status;
                switch (Number(status)) {
                    case 401: // UNAUTHORIZED
                        logout();
                        navigate('/login', { replace: true });
                        break;
                    case 403: // FORBIDDEN
                        logout();
                        navigate('/login', { replace: true });
                        break;
                    default:
                        return Promise.reject(error);
                }
            }
        );

        // 清理拦截器
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logout]);
};