import React, { useState } from 'react';
import "./bookAdding.css";

const BookAdding = () => {
  const [books, setBooks] = useState([{ id: 1 }]);

  // Function to handle adding a new book entry
  const addBookEntry = () => {
    setBooks([...books, { id: books.length + 1 }]);
  };

  // Function to handle removing a specific book entry
  const removeBookEntry = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  // Function to preview the image for a specific book entry
  const previewImage = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById(`previewImage${id}`).src = reader.result;
        document.getElementById(`previewImage${id}`).style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      document.getElementById(`previewImage${id}`).src = '';
      document.getElementById(`previewImage${id}`).style.display = 'none';
    }
  };

  return (
    <div className="container">
      <h1>Add Your Books to Sell or Exchange</h1>
      <p>You can add multiple books at once using the form below:</p>
      <form className="book-form">
        <div className="book-fields">
          {books.map((book) => (
            <div className="book-entry" key={book.id}>
              <h2>Book {book.id}</h2>
              <div className="form-group">
                <label htmlFor={`bookTitle${book.id}`}>Book Title:</label>
                <input type="text" id={`bookTitle${book.id}`} placeholder="Enter the book title" required />
              </div>
              <div className="form-group">
                <label htmlFor={`authorName${book.id}`}>Author Name:</label>
                <input type="text" id={`authorName${book.id}`} placeholder="Enter the author's name" required />
              </div>
              <div className="form-group">
                <label htmlFor={`bookCondition${book.id}`}>Condition:</label>
                <select id={`bookCondition${book.id}`} required>
                  <option value="new">New</option>
                  <option value="used">Used - Good</option>
                  <option value="used-fair">Used - Fair</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={`price${book.id}`}>Price (₹):</label>
                <input type="number" id={`price${book.id}`} placeholder="Set your price" required />
              </div>
              <div className="form-group">
                <label htmlFor={`exchangeOption${book.id}`}>Interested in Exchange?</label>
                <select id={`exchangeOption${book.id}`} required>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={`description${book.id}`}>Description:</label>
                <textarea id={`description${book.id}`} rows="4" placeholder="Add a brief description of the book (Optional)" />
              </div>
              <div className="form-group">
                <label htmlFor={`bookImage${book.id}`}>Upload Book Image:</label>
                <label className="custom-file-upload">
                  <input type="file" id={`bookImage${book.id}`} accept="image/*" onChange={(e) => previewImage(e, book.id)} />
                  Choose Image
                </label>
                <img id={`previewImage${book.id}`} className="image-preview" alt="Image Preview" style={{ display: 'none' }} />
              </div>
              <button type="button" onClick={() => removeBookEntry(book.id)} className="remove-book-btn">Remove Book</button>
              <hr />
            </div>
          ))}
        </div>
        <button type="button" onClick={addBookEntry} className="btn-add-book">Add Another Book</button>
        <button type="submit" className="btn-submit">Submit Books</button>
      </form>
    </div>
  );
};

export default BookAdding;
