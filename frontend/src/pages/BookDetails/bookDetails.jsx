
import "./bookDetails.css"
import placeholder1 from "../images/book-cover-placeholder1.jpeg";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function BookDetails() {

    const { id } = useParams(); // Fetch the book ID from the route params
    const [book, setBook] = useState(null); // State for book details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [exchangers, setExchangers] = useState([]); // For exchanger details
    const [exchangerCount, setExchangerCount] = useState(0);

    // Fetch book details from Google Books API
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
                const data = response.data.volumeInfo;

                // Format book details
                const bookDetails = {
                    title: data.title || "Title Not Available",
                    author: data.authors ? data.authors.join(", ") : "Unknown Author",
                    genre: data.categories ? data.categories.join(", ") : "Unknown Genre",
                    cover_url: data.imageLinks?.thumbnail || placeholder1,
                    description: data.description || "Description not available.",
                };

                setBook(bookDetails);
                setLoading(false);
                console.log(bookDetails);
            } catch (err) {
                setError("Failed to fetch book details.");
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    useEffect(() => {
        const fetchExchangers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/books/${id}/exchangers`);
                setExchangers(response.data.exchangers);
                setExchangerCount(response.data.exchanger_count);
            } catch (err) {
                console.error("Error fetching exchangers:", err);
            }
        };

        fetchExchangers();
    }, [id]);

    if (loading) {
        return <p>Loading book details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="wrap-shrink" > <main>
                <section id="book-details">
                    <div className="details-container">
                        <div className="left-column">
                            <img src={book.cover_url} alt="Book Cover"
                                 className="book-cover-details"/>
                            <div className="details-text">
                                <h2>{book.title}</h2>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Genre:</strong> {book.genre}</p>
                                <p><strong>Available Copies:</strong> {exchangerCount} Exchangers</p>
                                {/*<button className="exchange-btn">Request Exchange</button>*/}
                            </div>
                        </div>
                        <hr />
                        <div className="right-column">
                            <h3>Available Exchangers</h3>
                            <div className="exchanger-list">
                                {exchangers.length > 0 ? (
                                    exchangers.map((exchanger, index) => (
                                        <div className="exchanger-card" key={index}>
                                            <h4>{exchanger.username}</h4>
                                            <p>Location: {exchanger.location || "Not specified"}</p>
                                            <p>Condition: {exchanger.book_condition}</p>
                                            <button className="message-btn">Message</button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No exchangers available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

                <section id="book-description">
                    <h3>Book Description</h3>
                    <p>{book.description}</p>
                </section>

                <section id="reviews">
                    <h3>User Reviews</h3>
                    <div className="userReviews">
                        <div className="review">
                            <p>A mind-bending narrative that changed how I view the universe. Highly recommended!</p>
                            <h4>- Ananya</h4>
                        </div>
                        <div className="review">
                            <p>Gripping from start to finish. Perfect for anyone who loves deep space fiction!</p>
                            <h4>- Rohan</h4>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}


export default BookDetails;