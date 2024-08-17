const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generateAccessToken: generateAccessToken,refreshAccessToken:refreshAccessToken ,generateRefreshToken:generateRefreshToken} = require('../utils/token');

exports.signup = (req, res) => {
    const { firstname, lastname, email, password,role,tameName,phoneNumber } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword,role,tameName.trim(),phoneNumber.trim(), );

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        } 
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateAccessToken(data.id);
                const refreshToken = generateRefreshToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: { 
                        token,
                        refreshToken,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

 

}

exports.update = (req, res) => {
    const { firstname, lastname, email,role,tameName,phoneNumber } = req.body;
    const { id } = req.params;

    const user = new User(firstname.trim(), lastname.trim(), email.trim(),'',role,tameName.trim(),phoneNumber.trim());

    User.update(user,id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
};

exports.findAllUser = (req, res) => {
    
    User.findAllUser((err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {

            res.status(201).send({
                status: "success",
                data: 
                    data
                
            });
        }
    })
}

exports.findUserById = (req, res) => {
    const { id } = req.params;

    User.findUserById(id,(err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {

            res.status(201).send({
                status: "success",
                data: 
                    data
                
            });
        }
    })
}

exports.deleteUserId = (req, res) => {
    const { id } = req.params;

    User.deleteUserId(id,(err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: 
                    data
                
            });
        }
    })
}

exports.refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;

    // Refresh the access token using the provided refresh token
    const newAccessToken = refreshAccessToken(refreshToken);

    if (newAccessToken) {
        res.json({ accessToken: newAccessToken });
    } else {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
}