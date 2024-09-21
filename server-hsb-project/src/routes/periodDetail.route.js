const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const periodDetailcontroller = require('../controllers/periodDetail.controller');
const authorization = require('../middlewares/authorization');

router.route('/periodDetailCreate')
    .post(asyncHandler(authorization),asyncHandler(periodDetailcontroller.createPeriodDetail));

router.route('/periodDetailFind/:id')
    .get(asyncHandler(authorization),asyncHandler(periodDetailcontroller.findPeriodDetailById));

router.route('/periodDetailUpdate/:id')
    .put(asyncHandler(authorization),asyncHandler(periodDetailcontroller.updatePeriodDetailId));
    
router.route('/periodDetailDelete/:id')
    .delete(asyncHandler(authorization),asyncHandler(periodDetailcontroller.deletePeriodDetailId));

router.route('/getPeriodName')
    .get(asyncHandler(authorization),asyncHandler(periodDetailcontroller.findAllPeriodName));

module.exports = router;