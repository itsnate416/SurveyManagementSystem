const express = require('express');
const User = require('../models/User'); // Ensure this path points to your User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
        console.log('Registration Request Body:', req.body); // Log the request body

        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            console.log('Missing fields in registration'); // Log missing fields
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists with email:', email); // Log existing user
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword); // Log the hashed password

        // Save the new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        console.log('User registered successfully:', user); // Log successful registration
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error); // Log any errors
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// User Login (Bypass Password Authentication for Testing)
router.post('/login', async (req, res) => {
    try {
        console.log('Login Request Body:', req.body); // Log the request body

        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            console.log('Missing email or password'); // Log missing fields
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        console.log('User found in database:', user); // Log the user data

        if (!user) {
            console.log(`User not found with email: ${email}`); // Log if user is not found
            return res.status(404).json({ message: 'User not found' });
        }

        // For testing, skip password validation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log('Generated JWT Token:', token); // Log the generated token

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error); // Log any errors
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;



