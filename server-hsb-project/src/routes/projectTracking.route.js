const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const projectTrackingController = require('../controllers/projectTracking.controller');



router.route('/getProject')
    .get(asyncHandler(projectTrackingController.findAllProject));

    router.route('/getPeriodName')
    .get(asyncHandler(projectTrackingController.findPeriodName));
module.exports = router;