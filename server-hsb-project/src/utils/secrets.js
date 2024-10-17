require('dotenv/config');

const { logger } = require('./logger');

const {
    JWT_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY,
    LINE_TK,
    APPROVER_ID
} = process.env;

const requiredCredentials = [
    'JWT_SECRET_KEY',
    'JWT_REFRESH_SECRET_KEY',
    'LINE_TK',
    'APPROVER_ID'
];

for (const credential of requiredCredentials) {
    if (process.env[credential] === undefined) {
        logger.error(`Missing required crendential: ${credential}`);
        process.exit(1);
    }
}

module.exports = { 
    JWT_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY,
    LINE_TK,
    APPROVER_ID,
};
