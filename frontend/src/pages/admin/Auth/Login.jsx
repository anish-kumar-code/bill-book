import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { adminLogin } = useAuth();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post('/api/admin/login', values);
            if (res.data.status) {
                adminLogin(res.data.data.user, res.data.token);
                message.success('Login successful!');
                navigate('/admin');
            } else {
                message.error('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Left side - Logo */}
                <div className="hidden lg:flex w-1/2 justify-center items-center bg-blue-50">
                    <img
                        src="/logo.png"
                        alt="BillBook Logo"
                        className="w-3/4"
                    />
                </div>

                {/* Right side - Form card */}
                <div className="flex w-full lg:w-1/2 justify-center items-center px-4 sm:px-6 py-12">
                    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 transform transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Admin Login</h2>
                        <p className="text-sm text-gray-500 text-center mb-8">Sign in to your admin dashboard</p>

                        <Form
                            name="login"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                                className="mb-4"
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter your email"
                                    className="rounded-lg"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                className="mb-6"
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Enter your password"
                                    className="rounded-lg"
                                />
                            </Form.Item>

                            <Form.Item className="mb-0">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    size="large"
                                    loading={loading}
                                    className="bg-blue-600 hover:bg-blue-700 rounded-lg"
                                >
                                    Log In
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
