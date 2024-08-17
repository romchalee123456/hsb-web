const { decodeToken: decodeToken } = require('../utils/token');
const authorization = (req, res, next) => {
  
    const authHeader = req.headers['authorization'];
  
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('UnAuthorization')
    } 
   var decode =  decodeToken(token)

    if(decode == false){
        return res.status(401).send('UnAuthorization')
    }
    console.log(decode);
    next();

    }; 

module.exports = authorization;