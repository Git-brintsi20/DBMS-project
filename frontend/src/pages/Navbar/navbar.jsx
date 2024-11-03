import React from 'react'
import"./navbar.css" ;
// images import
import user from "../images/user.jpg";
import cart from "../images/cart.jpeg";

const Navbar = () => {
  return (
   
      
    <nav className="navbar">
        <div className="navlogo">
           <span>KitabeXchange</span>
        </div>
        
        <div className="nav-links">
            <ul>
            <li className="dropdown">
                <a href="#" className="dropbtn">Books</a>
                <div className="dropdown-content">
                    <div className="dropdown-column">
                        <h4>Fiction</h4>
                        <a href="#">Literary Fiction</a>
                        <a href="#">Historical Fiction</a>
                        <a href="#">Science Fiction</a>
                    </div>
                    <div className="dropdown-column">
                        <h4>Non-Fiction</h4>
                        <a href="#">Biographies</a>
                        <a href="#">Self-Help</a>
                        <a href="#">Health</a>
                    </div>
                    <div className="dropdown-column">
                        <h4>Other Genres</h4>
                        <a href="#">Mystery</a>
                        <a href="#">Fantasy</a>
                        <a href="#">Romance</a>
                    </div>
                    <div className="dropdown-column">
                        <h4>Self-Help</h4>
                        <a href="#">Self Discovery</a>
                        <a href="#">Self Improvement</a>
                        <a href="#">Subconscious Mind</a>  
                    </div>
                    <div className="dropdown-column">
                        <h4>Technology</h4>
                        <a href="#">Science</a>
                        <a href="#">Computers</a>
                        <a href="#">Cyber world</a>  
                    </div>
                </div>
            </li>
        </ul>
        </div>
        <div className="Navsearch-container">
            <input type="text" placeholder="Search books..." className="Navsearch-bar"></input>
            <button className="search-btn">Search</button>
        </div>
        <div>
        <ul className="nav-links">
          <li><a href="#">Sign Up</a></li>
          <li><a href="#">Login</a></li>
        </ul>
        </div>
        <div className="Navicons">
            <a href="#" className="Navicon"><img src={user} alt="Profile" className="navicon-img"></img></a>
             <a href="#" className="Navicon"><img src={cart} alt="Cart" className="navicon-img"></img></a>
        </div>
   
</nav>
  )
}

export default Navbar