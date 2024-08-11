const db = require('../config/db.config');
const { createNewUser: createNewUserQuery,
     findUserByEmail: findUserByEmailQuery,
     findAllUser:findAllUserQuery ,
     findUserById:findUserByIdQuery,
     deleteUserId:deleteUserIdQuery,
     updateUser:updateUserQuery

} = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(firstname, lastname, email, password,role,tameName,phoneNumber) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.tameName = tameName;
        this.phoneNumber = phoneNumber;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery, 
            [
                newUser.firstname, 
                newUser.lastname, 
                newUser.email, 
                newUser.password,
                newUser.role,
                newUser.tameName,
                newUser.phoneNumber,
                
                
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email,
                    password: newUser.password,
                    role: newUser.role,
                    tameName: newUser.tameName,
                    phoneNumber: newUser.phoneNumber,
                });
        });
    }

    static update(newUser,id, cb) {
 
        db.query(updateUserQuery, 
            [
                newUser.firstname, 
                newUser.lastname, 
                newUser.email, 
                newUser.role,
                newUser.tameName,
                newUser.phoneNumber,
                id,
                
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
               res
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static findAllUser( cb) {
        db.query(findAllUserQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static findUserById(id, cb) {
        db.query(findUserByIdQuery, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
    static deleteUserId(id, cb) {
        db.query(deleteUserIdQuery, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;