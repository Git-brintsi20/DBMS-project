import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css"; // Import your CSS file for styling

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", formData);
            const { token } = response.data;

            // Store the JWT token in localStorage
            localStorage.setItem("token", token);

            // Navigate to the home page
            navigate("/");
        } catch (err) {
            // Display error message
            setError(err.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className="wrapper">
            <div className="title">
                <span>Login Form</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email or Phone"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="row">
                    <i className="fas fa-lock"></i>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="pass">
                    <a href="#">Forgot password?</a>
                </div>
                <div className="row button">
                    <input type="submit" value="Login" />
                </div>
                {error && <p className="error">{error}</p>} {/* Display error message */}
                <div className="signup-link">
                    Not a member? <a href="#">Signup now</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
