'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config'); // Path to your config file

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;