import React, { useState } from "react";
import axios from "axios";
import "./SignUpCSS.css";

function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState(""); // For success or error messages

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");  // Clear previous message

        // Validate the data before sending
        if (!formData.username || !formData.email || !formData.password) {
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/signup", formData, {
                headers: {
                    "Content-Type": "application/json"  // Ensure that the request content type is JSON
                }
            });

            setMessage(response.data.message); // Display success message
        } catch (err) {
            setMessage(err.response?.data?.error || "Something went wrong!"); // Display error message
        }
    };

    return (
        <div className="wrapper">
            <div className="title">
                <span>SignUp Form</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="row">
                    <i className="fas fa-envelope"></i>
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
                <div className="row button">
                    <input type="submit" value="Signup" />
                </div>
                {message && <p className="message">{message}</p>} {/* Display message */}
                <div className="signup-link">
                    Already a member? <a href="/login">Login now</a>
                </div>
            </form>
        </div>
    );
}

export default Signup;
