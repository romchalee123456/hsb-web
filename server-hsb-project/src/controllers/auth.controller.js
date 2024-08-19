const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generateAccessToken: generateAccessToken,refreshAccessToken:refreshAccessToken ,generateRefreshToken:generateRefreshToken} = require('../utils/token');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.signup = async(req, res) => {
    const { firstname, lastname, email, password,role,tameName,phoneNumber } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword,role,tameName.trim(),phoneNumber.trim(), );

    const result = await prisma.user.create({
        data: {
          firstname:firstname.trim(),
          lastname:lastname.trim(),
           email: email.trim(),
           password: hashedPassword.trim(),
           role: role,
           TameName: tameName.trim(),
           PhoneNumber: phoneNumber.trim(),
        
        },
      })

        if (!result) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                
                    result
                }
            });
        }
    
};

exports.signin = async(req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
          email: email
        },
      })

      if(user){
        if (comparePassword(password.trim(), user.password)) {
            if (comparePassword(password.trim(), user.password)) {
                const token = generateAccessToken(user.id);
                const refreshToken = generateRefreshToken(user.id);
                res.status(200).send({
                    status: 'success',
                    data: { 
                        token,
                        refreshToken,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
      }else{
                        res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
      }
}

exports.update = async(req, res) => {
    const { firstname, lastname, email,role,tameName,phoneNumber } = req.body;
    const { id } = req.params;

    // const user = new User(firstname.trim(), lastname.trim(), email.trim(),'',role,tameName.trim(),phoneNumber.trim());
    const result = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          firstname : firstname.trim(),
          lastname : lastname.trim(),
          email : email.trim(),
          role:role,
          TameName:tameName.trim(),
          password:phoneNumber.trim(),

        },
      })

      if (!result) {
                res.status(500).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: "success",
                    data: {
                        result
                    }
                });
            }

};

exports.findAllUser = async(req, res) => {

    const data = await prisma.user.findMany();
        if (!data) {
            res.status(500).send({
                status: "error",
                // message: err.message
            });
        } else {

            res.status(201).send({
                status: "success",
                data: 
                    data
                
            });
        }
    
}

exports.findUserById = async(req, res) => {
    const { id } = req.params;

    const data = await prisma.user.findUnique({
        where: { id: Number(id) },
    })
    
    if (!data) {
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

}

exports.deleteUserId = async(req, res) => {
    const { id } = req.params;

    const data = await prisma.user.delete({
        where: { id: Number(id) },
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