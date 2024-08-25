const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoute = require('./routes/auth.route');
const projectRoute = require('./routes/project.route');
const customerRoute = require('./routes/customer.route');


const { httpLogStream } = require('./utils/logger');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/project', projectRoute);
app.use('/api/customer', customerRoute)

app.get('/',(req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

app.get('/feed', async (req, res) => {

    const posts = await prisma.user.findMany({
    })
  
    res.json(posts)
  })

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;