import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
// Images import
import user from "../images/user.jpg";
import cart from "../images/cart.jpeg";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route

    // Check for JWT token in localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set to true if token exists
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove JWT token
        setIsLoggedIn(false); // Update state
        navigate("/login"); // Redirect to login page
    };

    // Determine if search bar should be hidden
    const hideSearchBar = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <nav className="navbar">
            <div className="navlogo">
                <span>KitabeXchange</span>
            </div>

            {!hideSearchBar && (
                <div className="Navsearch-container">
                    <input type="text" placeholder="Search books..." className="Navsearch-bar" />
                    <button className="search-btn">Search</button>
                </div>
            )}

            <div>
                <ul className="nav-links">
                    {!isLoggedIn ? (
                        <>
                            <li>
                                <a href="/signup">Sign Up</a>
                            </li>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {isLoggedIn && (
                <div className="Navicons">
                    <a href="#" className="Navicon">
                        <img src={user} alt="Profile" className="navicon-img" />
                    </a>
                    <a href="#" className="Navicon">
                        <img src={cart} alt="Cart" className="navicon-img" />
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
