import React from 'react'
import "./home.css"
import { slide } from './scripts';

import placeholder1 from "../images/book-cover-placeholder1.jpeg";
import placeholder2 from "../images/book-cover-placeholder2.jpeg";
import placeholder3 from "../images/book-cover-placeholder3.jpeg";
import placeholder4 from "../images/book-cover-placeholder4.jpeg";
import placeholder5 from "../images/book-cover-placeholder5.jpeg";


const Home = () => {
  return (
   <div className='body'>

    {/* Welcome section */}

    <section class="welcome-section">
      <h2>Welcome to <span className="Title"> KitabeXchange</span></h2>
      <p>Your gateway to exchanging books and sharing stories!</p>
      <button id="explore-btn">Explore Now</button>
    </section>
    {/* Genre-Display Section */}
    <section className="display">
      <div className="genre-container">
        
      </div>
    </section>

    {/* SLIDERS */}

    <div class="genre-section" id="fiction">
    <h2>Fiction</h2>
    <div class="slider-container">
    <button className="slide-arrow prev" onClick={() => slide('fiction', -1)}>&#10094;</button>
        <div class="slider">
            <div class="book-card">
            <img src={placeholder1} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder2} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder3} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder4} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder5} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder2} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>

        </div>
        <button className="slide-arrow next" onClick={() => slide('fiction', 1)}>&#10095;</button>
        </div>
</div>

<div class="genre-section" id="nonfiction">
    <h2>Non-Fiction</h2>
    <div class="slider-container">
        <button class="slide-arrow prev" onclick="slide('nonfiction', -1)">&#10094;</button>
        <div class="slider">
            <div class="book-card">
            <img src={placeholder1} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder2} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder3} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder4} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder5} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder2} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>

        </div>
        <button class="slide-arrow next" onclick="slide('nonfiction', 1)">&#10095;</button>
    </div>
</div>

<div class="genre-section" id="self-help">
    <h2>Self-Help</h2>
    <div class="slider-container">
        <button class="slide-arrow prev" onclick="slide('self-help', -1)">&#10094;</button>
        <div class="slider">
            <div class="book-card">
            <img src={placeholder1} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder2} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder3} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder4} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder5} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder2} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>

        </div>
        <button class="slide-arrow next" onclick="slide('self-help', 1)">&#10095;</button>
    </div>
</div>

<div class="genre-section" id="technology">
    <h2>Technology</h2>
    <div class="slider-container">
        <button class="slide-arrow prev" onclick="slide('technology', -1)">&#10094;</button>
        <div class="slider">
            <div class="book-card">
            <img src={placeholder1} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder2} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder3} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder4} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder5} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>
            <div class="book-card">
            <img src={placeholder2} alt="Book Cover"className="book-cover-details"/>
                <h3>Title: Book Title 1</h3>
                <p>Author: Author 1</p>
                <button>Exchange Now</button>
            </div>

        </div>
        <button class="slide-arrow next" onclick="slide('technology', 1)">&#10095;</button>
    </div>
</div>

<script></script>
   </div>
  )
}

export default Home
