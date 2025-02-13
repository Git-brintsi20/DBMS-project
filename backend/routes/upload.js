const express = require('express');
const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const router = express.Router();

// Multer configuration for handling uploads
const storage = multer.memoryStorage(); // Use memory storage for processing in-memory
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2 MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
    },
});

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Harshita',
    database: 'book_exchange',
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('Connected to MySQL');
});

// POST route to upload and update profile photo as Base64
router.post('/profile', upload.single('profilePhoto'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded or invalid file type' });
    }

    const userId = req.body.userId; // Assuming userId is sent from the frontend
    const base64Image = req.file.buffer.toString('base64'); // Convert image buffer to Base64
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`; // Construct Base64 URL

    // Get the current profile photo of the user
    const getCurrentPhotoQuery = 'SELECT profile_photo FROM users WHERE id = ?';
    db.query(getCurrentPhotoQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching current photo:', err);
            return res.status(500).send('Error fetching current photo');
        }

        // Update the profile photo in the database
        const updatePhotoQuery = 'UPDATE users SET profile_photo = ? WHERE id = ?';
        db.query(updatePhotoQuery, [imageUrl, userId], (err) => {
            if (err) {
                console.error('Error updating photo:', err);
                return res.status(500).send('Error updating profile photo');
            }

            res.json({ imageUrl }); // Respond with the new Base64 image URL
        });
    });
});

module.exports = router;
