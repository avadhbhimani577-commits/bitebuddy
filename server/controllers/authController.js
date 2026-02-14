const User = require('../models/User');

// User Registration
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};

// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.verifyPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    const userId = req.user.id; // Assumes user ID is stored in req.user
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};