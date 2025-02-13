const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require("cors");
const {get} = require("axios");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email already exists
    const emailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(emailQuery, [email], async (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password before storing it in the database
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash with 10 salt rounds

            // Insert new user into the database
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ error: 'Error inserting user' });
                }

                return res.status(201).json({ message: 'User registered successfully' });
            });
        } catch (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Error hashing password' });
        }
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    });
});

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

// Protected Home Route
app.get("/home", authenticateToken, (req, res) => {
    res.json({ message: "Welcome to the protected home route!" });
});

// Add a Book Route
app.post('/books', authenticateToken, (req, res) => {
    const { isbn, title, author, book_condition, cover_url } = req.body;
    const userId = req.user.id;

    if (!isbn || !title || !book_condition) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    const query = `INSERT INTO books (user_id, isbn, title, author, book_condition, cover_url) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [userId, isbn, title, author, book_condition, cover_url], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
    });
});

//addbooks
app.post('/books', authenticateToken, (req, res) => {
    const { isbn, title, author, book_condition, cover_url } = req.body;
    const userId = req.user.id;

    if (!isbn || !title || !book_condition) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    const query = `INSERT INTO books (user_id, isbn, title, author, book_condition, cover_url) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [userId, isbn, title, author, book_condition, cover_url], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
    });
});

// Complete Exchange Request
app.post('/complete-exchange', authenticateToken, (req, res) => {
    const { book_id, requested_by } = req.body;
    const exchanged_with = req.user.id;

    if (!book_id || !requested_by) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `INSERT INTO completed_orders (book_id, requested_by, exchanged_with) 
                   VALUES (?, ?, ?)`;

    db.query(query, [book_id, requested_by, exchanged_with], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        res.status(201).json({ message: 'Exchange completed successfully' });
    });
});


app.post('/exchange/request', authenticateToken, (req, res) => {
    const { book_id } = req.body;
    const requested_by = req.user.id;

    const query = `INSERT INTO requests (book_id, requested_by) VALUES (?, ?)`;
    db.query(query, [book_id, requested_by], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        res.status(201).json({ message: 'Exchange request sent successfully' });
    });
});


app.post('/exchange/approve', authenticateToken, (req, res) => {
    const { book_id, requested_by } = req.body;
    const exchanged_with = req.user.id;

    const query = `
        INSERT INTO completed_orders (book_id, requested_by, exchanged_with) 
        VALUES (?, ?, ?)`;
    db.query(query, [book_id, requested_by, exchanged_with], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        // Optionally, delete from requests table after approval
        const deleteQuery = 'DELETE FROM requests WHERE book_id = ? AND requested_by = ?';
        db.query(deleteQuery, [book_id, requested_by]);

        res.status(201).json({ message: 'Exchange approved successfully' });
    });
});


app.get('/exchange/completed', authenticateToken, (req, res) => {
    const userId = req.user.id;

    const query = `
        SELECT completed_orders.*, books.title AS book_title, users.name AS partner_name 
        FROM completed_orders 
        JOIN books ON completed_orders.book_id = books.id 
        JOIN users ON (completed_orders.requested_by = users.id OR completed_orders.exchanged_with = users.id)
        WHERE completed_orders.requested_by = ? OR completed_orders.exchanged_with = ?`;

    db.query(query, [userId, userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        res.status(200).json(results);
    });
});


app.get('/books/search', async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Search title is required' });
    }

    try {
        // Step 1: Search in the database
        const dbQuery = `
            SELECT 
                books.id,
                books.title,
                books.author,
                books.cover_url,
                COUNT(exchange_requests.id) AS issue_count
            FROM 
                books
            LEFT JOIN 
                exchange_requests ON books.id = exchange_requests.book_id
            WHERE 
                books.title LIKE ?
            GROUP BY 
                books.id`;

        const dbResults = await new Promise((resolve, reject) => {
            db.query(dbQuery, [`%${title}%`], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        // Step 2: Search in Google Books API
        const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

        const googleBooksResults = await get(googleBooksUrl);
        const googleBooks = googleBooksResults.data.items || [];

        // Step 3: Format Google Books API results
        const formattedGoogleBooks = googleBooks.map((book) => ({
            id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown',
            cover_url: book.volumeInfo.imageLinks?.thumbnail || null,
            issue_count: 0, // Not in the database, so no requests
        }));

        // Step 4: Combine results from database and Google Books API
        const combinedResults = [...dbResults, ...formattedGoogleBooks];

        // Return combined results
        res.status(200).json(combinedResults);
    } catch (err) {
        console.error('Error searching for books:', err);
        res.status(500).json({ error: 'Server error' });
    }
});



// Define the route
app.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;

    // Function to fetch book details from database
    const fetchBookDetails = () => {
        return new Promise((resolve, reject) => {
            const bookQuery = `
               SELECT books.id, books.title, books.author, books.condition, books.cover_url, books.description
FROM books
WHERE books.isbn = ?
`;

            db.query(bookQuery, [bookId], (err, results) => {
                if (err) {
                    reject(err); // Reject if there's an error
                } else {
                    resolve(results[0]); // Resolve with the first book result
                }
            });
        });
    };

    // Function to fetch exchangers from database
    const fetchExchangers = () => {
        return new Promise((resolve, reject) => {
            const exchangersQuery = `
                SELECT users.username, users.location, requests.book_condition
                FROM requests
                JOIN users ON requests.user_id = users.id
                WHERE requests.book_id = ?
                ORDER BY FIELD(requests.book_condition, 'New', 'Like New', 'Good', 'Fair', 'Poor')`;

            db.query(exchangersQuery, [bookId], (err, results) => {
                if (err) {
                    reject(err); // Reject if there's an error
                } else {
                    resolve(results); // Resolve with the exchangers list
                }
            });
        });
    };

    try {
        let book = await fetchBookDetails(); // Fetch book from database

        // Check if the book exists in the database
        if (!book) {
            return res.status(404).json({ error: 'Book not found in database' });
        }

        const exchangers = await fetchExchangers(); // Fetch exchangers for the book
        res.json({ book, exchangers }); // Send response with both book and exchangers

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching book details or exchangers.' });
    }
});
// GET /books/:id/exchangers
app.get("/books/:id/exchangers", async (req, res) => {
    const bookId = req.params.id;

    const exchangersQuery = `
        SELECT 
            users.name AS username,
            users.email,
            books.book_condition AS book_condition
        FROM books
        JOIN exchange_requests ON books.id = exchange_requests.book_id
        JOIN users ON exchange_requests.requested_by = users.id
        WHERE books.id = ?
        AND exchange_requests.status = 'Pending'`;

    const countQuery = `
        SELECT COUNT(*) AS exchanger_count
        FROM exchange_requests
        WHERE book_id = ? AND status = 'Pending'`;

    try {
        // Fetch exchangers information
        const exchangers = await new Promise((resolve, reject) => {
            db.query(exchangersQuery, [bookId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        // Fetch count of exchangers
        const countResult = await new Promise((resolve, reject) => {
            db.query(countQuery, [bookId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0].exchanger_count);
            });
        });

        res.status(200).json({
            exchanger_count: countResult,
            exchangers,
        });
    } catch (error) {
        console.error("Error fetching exchangers:", error);
        res.status(500).json({ error: "Database error" });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
