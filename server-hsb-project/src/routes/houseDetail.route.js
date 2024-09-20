const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const houseDetailController = require('../controllers/houseDetail.controller');
const authorization = require('../middlewares/authorization');


router.route('/findAllHouseDetail/:id')
    .get(asyncHandler(authorization),asyncHandler(houseDetailController.findAllHouseDetail));

router.route('/findHouseDetailById/:id')
    .get(asyncHandler(authorization),asyncHandler(houseDetailController.findHouseDetailById));

router.route('/findAllFileByHouseDetail/:id')
    .get(asyncHandler(authorization),asyncHandler(houseDetailController.findAllFileByHouseDetail));
   
router.route('/deleteFileByID/:id')
    .delete(asyncHandler(authorization),asyncHandler(houseDetailController.deleteFileByID));

module.exports = router;