import React, { useRef } from 'react';
import './home.css';

import placeholder1 from '../images/book-cover-placeholder1.jpeg';
import placeholder2 from '../images/book-cover-placeholder2.jpeg';
import placeholder3 from '../images/book-cover-placeholder3.jpeg';
import placeholder4 from '../images/book-cover-placeholder4.jpeg';
import placeholder5 from '../images/book-cover-placeholder5.jpeg';

const genres = [
  { id: 'fiction', title: 'Fiction' },
  { id: 'nonfiction', title: 'Non-Fiction' },
  { id: 'self-help', title: 'Self-Help' },
  { id: 'technology', title: 'Technology' },
];

const books = [
  { image: placeholder1, title: 'Book Title 1', author: 'Author 1' },
  { image: placeholder2, title: 'Book Title 2', author: 'Author 2' },
  { image: placeholder3, title: 'Book Title 3', author: 'Author 3' },
  { image: placeholder4, title: 'Book Title 4', author: 'Author 4' },
  { image: placeholder5, title: 'Book Title 5', author: 'Author 5' },
  { image: placeholder2, title: 'Book Title 6', author: 'Author 6' },
  { image: placeholder1, title: 'Book Title 1', author: 'Author 1' },
  { image: placeholder2, title: 'Book Title 2', author: 'Author 2' },
  { image: placeholder3, title: 'Book Title 3', author: 'Author 3' },
  { image: placeholder4, title: 'Book Title 4', author: 'Author 4' },
  { image: placeholder5, title: 'Book Title 5', author: 'Author 5' },
  { image: placeholder2, title: 'Book Title 6', author: 'Author 6' },
];

const Home = () => {
  const sliderRefs = useRef({});

  const slide = (genre, direction) => {
    const slider = sliderRefs.current[genre];
    if (slider) {
      slider.scrollLeft += direction * 250; // Adjust 250 to control scroll speed
    }
  };

  return (
    <div className='body'>
      {/* Welcome Section */}
      <section className="welcome-section">
        <h2>Welcome to <span className="Title">KitabeXchange</span></h2>
        <p>Your gateway to exchanging books and sharing stories!</p>
        <button id="explore-btn">Explore Now</button>
      </section>

      {/* Genre Display Sections */}
      {genres.map((genre) => (
        <div className="genre-section" id={genre.id} key={genre.id}>
          <h2>{genre.title}</h2>
          <div className="slider-container">
            <button className="slide-arrow prev" onClick={() => slide(genre.id, -1)}>&#10094;</button>
            <div className="slider" ref={(el) => (sliderRefs.current[genre.id] = el)}>
              {books.map((book, index) => (
                <div className="book-card" key={`${genre.id}-${index}`}>
                  <img src={book.image} alt="Book Cover" className="book-cover-details" />
                  <h3>Title: {book.title}</h3>
                  <p>Author: {book.author}</p>
                  <button>Exchange Now</button>
                </div>
              ))}
            </div>
            <button className="slide-arrow next" onClick={() => slide(genre.id, 1)}>&#10095;</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
