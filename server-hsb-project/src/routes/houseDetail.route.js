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
   
router.route('/createHouseDetail')
    .post(asyncHandler(houseDetailController.createHouseDetail));

router.route('/updateHouseDetail/:id')
    .put(asyncHandler(houseDetailController.updateHouseDetailId));

router.route('/findAllHoseDetailName')
    .get(asyncHandler(houseDetailController.findAllHoseDetailName));

router.route('/deleteHouseDetailId/:id')
    .delete(asyncHandler(houseDetailController.deleteHouseDetailId));
    
module.exports = router;