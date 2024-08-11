const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, NOW(),?,?,?)
`;

const updateUser = `
UPDATE users SET firstname = ?, lastname = ?, email = ?, role = ?, TameName = ?, PhoneNumber = ? WHERE users.id = ?;
; `

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

const findAllUser = `
SELECT * FROM users
`;
const findUserById = `
SELECT * FROM users WHERE id = ?
`;
const deleteUserId = `
DELETE FROM users WHERE users.id = ?
`;
 
const alterUser = `ALTER TABLE users ADD role INT(10) NULL AFTER created_on, ADD TameName INT NULL AFTER role, ADD PhoneNumber INT NULL AFTER TameName;`

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
    alterUser,
    findAllUser,
    findUserById,
    deleteUserId,
    updateUser
};
