const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const projectTrackingController = require('../controllers/projectTracking.controller');
const authorization = require('../middlewares/authorization');


    router.route('/getProject')
    .get(asyncHandler(authorization),asyncHandler(projectTrackingController.findAllProject));

    router.route('/findProjectById/:id')
    .get(asyncHandler(authorization),asyncHandler(projectTrackingController.findProjectById));

    router.route('/findProjectByIdSearchPeriod/:id')
    .get(asyncHandler(authorization),asyncHandler(projectTrackingController.findProjectByIdSearchPeriod));
    
    router.route('/getPeriodName')
    .get(asyncHandler(authorization),asyncHandler(projectTrackingController.findPeriodName));
    
    router.route('/searchAllProject')
    .get(asyncHandler(authorization),asyncHandler(projectTrackingController.searchAllProject));

module.exports = router;