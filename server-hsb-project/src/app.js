const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const authRoute = require('./routes/auth.route');
const projectRoute = require('./routes/project.route');
const customerRoute = require('./routes/customer.route');
const houseDetailRoute = require('./routes/houseDetail.route');
const uploadFileRoute = require('./routes/uploadFile.route');
const periodDetailRoute = require('./routes/periodDetail.route');
const projectTrackingRoute  = require('./routes/projectTracking.route');
const notificationRoute  = require('./routes/notification.route');

const { httpLogStream } = require('./utils/logger');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());
app.use('/files', express.static(path.join(__dirname, 'controllers/files')));
app.use('/api/auth', authRoute);
app.use('/api/project', projectRoute);
app.use('/api/projectTracking', projectTrackingRoute);
app.use('/api/customer', customerRoute);
app.use('/api/houseDetail', houseDetailRoute);
app.use('/api/uploadFile', uploadFileRoute);
app.use('/api/periodDetail', periodDetailRoute);
app.use('/api/notification', notificationRoute);

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

  app.post('/callback', async (req, res) => {
    const events = req.body.events;
  
    const posts = await prisma.lineeventhook.create({
      data: {
        lineeventhookText: JSON.stringify(events), // Convert events to string
      },
    });
  
    res.json(posts);
    // Handle other event types as needed
  
    res.status(200).send('OK');
  });
  
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});


module.exports = app;