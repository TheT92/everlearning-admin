import { Suspense, lazy, type ReactNode } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import HomePage from '../pages/index.tsx';
import PageHeader from '../components/pageHeader.tsx';
import { useAuthInterceptor } from '../apis/interceptor.ts';
import { useAuth } from '../hooks/useAuth.ts';
import type { MenuProps } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

const Login = lazy(() => import('../pages/login.tsx'));
const Problems = lazy(() => import('../pages/problems.tsx'));
const Problem = lazy(() => import('../pages/problem.tsx'));
const AddProblem = lazy(() => import('../pages/add-problem.tsx'));
const Courses = lazy(() => import('../pages/courses.tsx'));

interface ProtectedRouteProps {
    children: ReactNode;
}



function AppRouter() {
    const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    const menu: MenuProps['items'] = [
        {
            key: `Categories`,
            icon: React.createElement(LaptopOutlined),
            label: `Category`,
            children: Array.from({ length: 4 }).map((_, j) => {
                const subKey = `Category` + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        },
        {
            key: `Problems`,
            icon: React.createElement(NotificationOutlined),
            label: `Problems`,
            children: [
                {
                    key: 'problems',
                    label: (<Link to="/problems">Problems List</Link>),
                }
            ],
        }
    ]
    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,
                children: Array.from({ length: 4 }).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,
                    };
                }),
            };
        },
    );

    const MainLayout = () => {
        return (
            <Layout>
                <Header className='page-header'>
                    <Link className='logo' to="/">EverLearning-Admin</Link>
                    <Link className='login fs-1' to="/login">Sign In/ Sign Up</Link>
                </Header>
                {/* <PageHeader/> */}
                <Layout className='page-content'>
                    <Sider width={200} style={{background: '#2563EB'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderInlineEnd: 0, background: '#2563EB' }}
                            items={menu}
                        />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb
                            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                            style={{ margin: '16px 0' }}
                        />
                        <Content>
                            <Outlet /> {/* 渲染子路由页面 */}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    };



    const AppRoutes = () => {
        const auth = useAuth();

        // 使用拦截器，传入 auth 对象
        useAuthInterceptor(auth);

        // 路由守卫组件
        const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
            const { isAuthenticated, loading } = useAuth();
            const location = useLocation();

            if (loading) {
                return <div>Loading...</div>;
            }

            if (!isAuthenticated) {
                // 只传递路径，而不是整个 location 对象
                return <Navigate to="/login" replace state={{ from: location.pathname }} />;
            }

            return <>{children}</>;
        };

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path='/problems' element={<ProtectedRoute><Problems /></ProtectedRoute>} />
                        <Route path='/problem/addProblem' element={<ProtectedRoute><AddProblem /></ProtectedRoute>} />
                        <Route path='/problem/:id' element={<ProtectedRoute><Problem /></ProtectedRoute>} />
                        <Route path='/courses' element={<ProtectedRoute><Courses /></ProtectedRoute>} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Suspense>
        )
    }
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}
export default AppRouter;

