import { Link } from "react-router-dom";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import { apiUserLogin } from "../apis/user";
import Tab from "../components/tab";

import '../styles/login.scss';
import Button from "../components/button";

export default function Login() {
    const navigate = useNavigate();
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            email: (e.target as any)[0].value,
            password: (e.target as any)[1].value,
        };
        console.log("Login data:", data);
        try {
            const response = await apiUserLogin(data);
            console.log("Login successful:", response.data);
            const { token, prefix } = response.data
            localStorage.setItem('token', token);
            navigate('/', { replace: true })
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="page-container login-page">
            <div className="login-box pt-8">
                <h2 className="text-center text-primary">EverLearning</h2>
                <h3 className="mb-8 text-center text-primary">Admin Panel</h3>
                <form onSubmit={handleLogin}>
                    <Input type="text" placeholder="Email" /><br />
                    <Input type="password" placeholder="Password" /><br />
                    <Button className="mt-8" size="lg" type="submit">Login</Button>
                </form>
            </div>
        </div>

    );
}