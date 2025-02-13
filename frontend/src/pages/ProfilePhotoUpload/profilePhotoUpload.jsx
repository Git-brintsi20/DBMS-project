import React, { useState } from 'react';
import axios from 'axios';
import './profilePhoto.css';

const ProfilePhotoUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [userId, setUserId] = useState(1); // Replace with dynamic user ID if available

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file!');
            return;
        }

        const formData = new FormData();
        formData.append('profilePhoto', file);
        formData.append('userId', userId);

        try {
            const response = await axios.post('http://localhost:5000/upload/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Update the UI with the Base64 URL
            setImageUrl(response.data.imageUrl);
            setMessage('Photo uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading photo. Please try again.');
            console.error('Error during upload:', error);
        }
    };

    return (
        <div className="photo-upload">
            <h2>Upload Profile Photo</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
            {imageUrl && <img src={imageUrl} alt="Uploaded profile" />}
        </div>
    );
};

export default ProfilePhotoUpload;
