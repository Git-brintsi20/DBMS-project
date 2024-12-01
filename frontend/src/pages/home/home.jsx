import { useEffect, useRef, useState } from 'react';
import './home.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const genres = [
    { id: 'fiction', title: 'Fiction' },
    { id: 'nonfiction', title: 'Science' },
    { id: 'self-help', title: 'Mathematics' },
    { id: 'technology', title: 'Cooking' },
];

const Home = () => {
    const sliderRefs = useRef({});
    const [allBooks, setAllBooks] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const allFetchedBooks = [];
        const uniqueBookIds = new Set();

        for (const genre of genres) {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre.title}&key=AIzaSyBax7oG81H6xe2QJvhJpx9WrDT0xySwko4`);
                const books = response.data.items || [];

                books.forEach((book) => {
                    if (!uniqueBookIds.has(book.id)) {
                        uniqueBookIds.add(book.id);
                        allFetchedBooks.push(book);
                    }
                });
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }

        setAllBooks(allFetchedBooks);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                await axios.get("http://localhost:3000/home", {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (err) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        checkAuth();
    }, [navigate]);

    const slide = (genre, direction) => {
        const slider = sliderRefs.current[genre];
        if (slider) {
            slider.scrollLeft += direction * 250;
        }
    };

    const handleExchangeClick = (bookId) => {
        navigate(`/book-details/${bookId}`); // Redirect to the BookDetails page
    };

    return (
        <div className='body'>

            <section className="welcome-section">
                <h2>Welcome to <span className="Title">KitabeXchange</span></h2>
                <p>Your gateway to exchanging books and sharing stories!</p>
                <button id="explore-btn">Explore Now</button>
            </section>

            {genres.map((genre) => (
                <div className="genre-section" id={genre.id} key={genre.id}>
                    <h2>{genre.title}</h2>
                    <div className="slider-container">
                        <button className="slide-arrow prev" onClick={() => slide(genre.id, -1)}>&#10094;</button>
                        <div className="slider" ref={(el) => (sliderRefs.current[genre.id] = el)}>
                            {allBooks.filter((book) => book.volumeInfo?.categories?.includes(genre.title))
                                .slice(0, 15)
                                .map((book, index) => (
                                    <div className="book-card" key={`${genre.id}-${index}`}>
                                        {book.volumeInfo && (
                                            <>
                                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Book Cover" className="book-cover-details" />
                                                <h3>Title: {book.volumeInfo.title}</h3>
                                                <p>Author: {book.volumeInfo.authors?.[0]}</p>
                                                <button onClick={() => handleExchangeClick(book.id)}>Exchange Now</button>
                                            </>
                                        )}
                                        {!book.volumeInfo && (
                                            <p>No book information available.</p>
                                        )}
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
