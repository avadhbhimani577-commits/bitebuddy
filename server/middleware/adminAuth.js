const jwt = require('jsonwebtoken');

// Middleware to protect admin routes
const adminAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Check if the user is an admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. You are not an admin.' });
        }
        // Store user info in request object for future middleware/routes
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = adminAuth;