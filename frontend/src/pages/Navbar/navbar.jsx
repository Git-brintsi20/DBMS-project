import React from 'react'
import"./navbar.css" ;
// images import
import user from "../images/user.jpg";
import cart from "../images/cart.jpeg";

const Navbar = () => {
  return (
   
      
    <nav class="navbar">
        <div class="navlogo">
           <span>KitabeXchange</span>
        </div>
        
        <div class="nav-links">
            <ul>
            <li class="dropdown">
                <a href="#" class="dropbtn">Books</a>
                <div class="dropdown-content">
                    <div class="dropdown-column">
                        <h4>Fiction</h4>
                        <a href="#">Literary Fiction</a>
                        <a href="#">Historical Fiction</a>
                        <a href="#">Science Fiction</a>
                    </div>
                    <div class="dropdown-column">
                        <h4>Non-Fiction</h4>
                        <a href="#">Biographies</a>
                        <a href="#">Self-Help</a>
                        <a href="#">Health</a>
                    </div>
                    <div class="dropdown-column">
                        <h4>Other Genres</h4>
                        <a href="#">Mystery</a>
                        <a href="#">Fantasy</a>
                        <a href="#">Romance</a>
                    </div>
                    <div class="dropdown-column">
                        <h4>Self-Help</h4>
                        <a href="#">Self Discovery</a>
                        <a href="#">Self Improvement</a>
                        <a href="#">Subconscious Mind</a>  
                    </div>
                    <div class="dropdown-column">
                        <h4>Technology</h4>
                        <a href="#">Science</a>
                        <a href="#">Computers</a>
                        <a href="#">Cyber world</a>  
                    </div>
                </div>
            </li>
        </ul>
        </div>
        <div class="Navsearch-container">
            <input type="text" placeholder="Search books..." class="Navsearch-bar"></input>
            <button class="search-btn">Search</button>
        </div>
        <div>
        <ul class="nav-links">
          <li><a href="#">Sign Up</a></li>
          <li><a href="#">Login</a></li>
        </ul>
        </div>
        <div class="Navicons">
            <a href="#" class="Navicon"><img src={user} alt="Profile" class="navicon-img"></img></a> 
             <a href="#" class="Navicon"><img src={cart} alt="Cart" class="navicon-img"></img></a> 
        </div>
   
</nav>
  )
}

export default Navbar