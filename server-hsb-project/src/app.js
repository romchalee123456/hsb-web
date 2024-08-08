const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { decode: decodeToken } = require('./utils/token');
const authRoute = require('./routes/auth.route');

const { httpLogStream } = require('./utils/logger');

const middleware = (req, res, next) => {
  
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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());

app.use('/api/auth', authRoute);

app.get('/', middleware,(req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;