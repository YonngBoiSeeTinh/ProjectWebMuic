import React, { useState } from "react";
import { Link } from "react-router-dom";
import './log.scss';

const Register = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Cập nhật giá trị các trường form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Hàm xử lý khi nhấn "Sign up"
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Gửi request tới API backend
        try {
            const response = await fetch('http://localhost:3001/api/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    phone: formData.phone
                })
            });

            const result = await response.json();

            if (result.status === 'OK') {
                setSuccess('User registered successfully!');
                setError('');
                // Chuyển đến màn hình đăng nhập
                props.handleOpenLogin();
            } else {
                setError(result.message);
                setSuccess('');
            }
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="login-container signup-container">
            <h2>ĐĂNG KÝ</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group-log">
                    <label htmlFor="name">Họ và Tên:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nhập tên của bạn" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Nhập email của bạn" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        placeholder="Nhập số điện thoại của bạn" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Nhập mật khẩu của bạn" 
                        required 
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Xác nhận mật khẩu" 
                        required 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
            <p>
                Already have an account?{' '}
                <Link to="#" onClick={props.handleOpenLogin}>
                    Sign in here
                </Link>
            </p>
        </div>
    );
}

export default Register;
