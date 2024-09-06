const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const periodDetailcontroller = require('../controllers/periodDetail.controller');


router.route('/periodDetailCreate')
    .post(asyncHandler(periodDetailcontroller.createPeriodDetail));

router.route('/periodDetailFind/:id')
    .get(asyncHandler(periodDetailcontroller.findPeriodDetailById));

router.route('/periodDetailUpdate/:id')
    .put(asyncHandler(periodDetailcontroller.updatePeriodDetailId));
    
router.route('/periodDetailDelete/:id')
    .delete(asyncHandler(periodDetailcontroller.deletePeriodDetailId));

router.route('/getPeriodName')
    .get(asyncHandler(periodDetailcontroller.findAllPeriodName));

module.exports = router;