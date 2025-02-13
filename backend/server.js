const express = require('express');
const uploadRoute = require('./routes/upload');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for the React frontend
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
}));

// Parse JSON request bodies
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the upload route for handling profile photo uploads
app.use('/upload', uploadRoute);

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
