const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const projectTrackingController = require('../controllers/projectTracking.controller');
const authorization = require('../middlewares/authorization');


    router.route('/getProject')
    .get(asyncHandler(authorization),asyncHandler(projectTrackingController.findAllProject));

    router.route('/findProjectById/:id')
    .get(asyncHandler(authorization),asyncHandler(projectTrackingController.findProjectById));

    router.route('/getPeriodName')
    .get(asyncHandler(authorization),asyncHandler(projectTrackingController.findPeriodName));
    
module.exports = router;