const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const houseDetailController = require('../controllers/houseDetail.controller');



router.route('/findAllHouseDetail/:id')
    .get(asyncHandler(houseDetailController.findAllHouseDetail));

router.route('/findHouseDetailById/:id')
    .get(asyncHandler(houseDetailController.findHouseDetailById));

router.route('/findAllFileByHouseDetail/:id')
    .get(asyncHandler(houseDetailController.findAllFileByHouseDetail));


module.exports = router;