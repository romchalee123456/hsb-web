const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

// Generate Access Token
const generateAccessToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '60m' }); // 1 day expiry
};

// Generate Refresh Token
const generateRefreshToken = (id) => {

    return jwt.sign({ id }, JWT_REFRESH_SECRET_KEY, { expiresIn: '5h' }); // 7 days expiry
};

// Decode Access or Refresh Token
const decodeToken = (token, isRefreshToken = false) => {
    console.log("decodeToken");

 console.log(token);
    try {
        const secret = isRefreshToken ? JWT_REFRESH_SECRET_KEY : JWT_SECRET_KEY;
        return jwt.verify(token, secret);
    } catch (error) {
        logger.error('Token verification failed', error);
        return false;
    }
};

const decodeTokenForId = (token, isRefreshToken = false) => {
    console.log("decodeTokenForId");
    
    console.log(token);
 
    try {
        const secret = isRefreshToken ? JWT_REFRESH_SECRET_KEY : JWT_SECRET_KEY;
        return jwt.decode(token, secret);
    } catch (error) {
        logger.error('Token verification failed', error);
        return false;
    }
};
 
// Refresh Token Function
const refreshAccessToken = (refreshToken) => {
    try {
    const decoded = decodeToken(refreshToken, true);
    if (!decoded) {
        return null; // Invalid refresh token
    }

    const newAccessToken = generateAccessToken(decoded.id);

    return newAccessToken;
} catch (error) {
    logger.error('Token verification failed', error);
    
    res.status(403).json({ message: 'Invalid refresh token' });
}
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    decodeToken,
    refreshAccessToken,
    decodeTokenForId
};
