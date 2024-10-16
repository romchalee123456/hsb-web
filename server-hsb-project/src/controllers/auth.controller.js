const {
  hash: hashPassword,
  compare: comparePassword,
} = require("../utils/password");
const {
  generateAccessToken: generateAccessToken,
  refreshAccessToken: refreshAccessToken,
  generateRefreshToken: generateRefreshToken,
} = require("../utils/token");
const { decodeTokenForId: decodeTokenForId } = require("../utils/token");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    role,
    teamName,
    phoneNumber,
    userLineNotificationsid,
  } = req.body;
  const hashedPassword = hashPassword(password.trim());

  const result = await prisma.user.create({
    data: {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      password: hashedPassword.trim(),
      role: role,
      teamName: teamName.trim(),
      phoneNumber: phoneNumber,
      userLineNotificationsid: userLineNotificationsid,
    },
  });

  if (!result) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: {
        result,
      },
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // If the user does not exist, return a 404 response
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: `User with email ${email} was not found`,
      });
    }

    // Check if the password is correct
    const isPasswordValid = comparePassword(password.trim(), user.password);
    if (!isPasswordValid) {
      // If password is incorrect, return a 401 response
      return res.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }

    // Generate access and refresh tokens
    const token = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Return the success response with tokens and user info
    return res.status(200).send({
      status: "success",
      data: {
        token,
        refreshToken,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    // Catch any errors and return a 500 response
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.update = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    role,
    teamName,
    phoneNumber,
    userLineNotificationsid,
  } = req.body;
  const { id } = req.params;

  // const user = new User(firstname.trim(), lastname.trim(), email.trim(),'',role,tameName.trim(),phoneNumber.trim());
  const result = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      role: role,
      teamName: teamName.trim(),
      phoneNumber: phoneNumber.trim(),
      userLineNotificationsid: userLineNotificationsid,
    },
  });

  if (!result) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: {
        result,
      },
    });
  }
};

exports.findAllUser = async(req, res) => {
    try {
        const data = await prisma.user.findMany({
            orderBy: {
                id: 'desc'  // Order by id in descending order
            }
        });

        res.status(201).send({
            status: "success",
            data: data
        });

    } catch (err) {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
}


exports.findUserById = async(req, res) => {
    const { id } = req.params;

  const data = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!data) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: data,
    });
  }
};

exports.findUserDefult = async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("UnAuthorization");
  }
  var decode = decodeTokenForId(token);

  const data = await prisma.user.findUnique({
    where: { id: Number(decode.id) },
  });

  if (!data) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: data,
    });
  }
};

exports.findUserById = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!data) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: data,
    });
  }
};

exports.deleteUserId = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.user.delete({
    where: { id: Number(id) },
  });
};

exports.refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  // Refresh the access token using the provided refresh token
  const newAccessToken = refreshAccessToken(refreshToken);

  if (newAccessToken) {
    res.json({ accessToken: newAccessToken });
  } else {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

exports.searchUserByFirstname = async (req, res) => {
  const { firstname } = req.query; // Get the project code from query parameters

      const data = await prisma.user.findMany({
          where: {
              firstname: {
                  contains: firstname, // Use contains for a substring search
              },
          },
          orderBy: {
              id: 'desc', // Optional: order by project ID
          },
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
};
