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
   
router.route('/createHouseDetail')
    .post(asyncHandler(houseDetailController.createHouseDetail));

router.route('/updateHouseDetail/:id')
    .put(asyncHandler(houseDetailController.updateHouseDetailId));

router.route('/findAllHoseDetailName')
    .get(asyncHandler(houseDetailController.findAllHoseDetailName));

router.route('/deleteHouseDetailId/:id')
    .delete(asyncHandler(houseDetailController.deleteHouseDetailId));
    
router.route('/deleteFileByID/:id')
    .delete(asyncHandler(authorization),asyncHandler(houseDetailController.deleteFileByID));

router.route('/getInformationByHouseDetail/:id')
    .get(asyncHandler(houseDetailController.getInformationByHouseDetail));

router.route('/updateSelectedFile/:id')
    .put(asyncHandler(houseDetailController.updateSelectedFile));

router.route('/updateSelectedFileFalse/:id')
    .put(asyncHandler(houseDetailController.updateSelectedFileFalse));

router.route('/getSelectedFile/:id')
    .get(asyncHandler(authorization),asyncHandler(houseDetailController.getSelectedFile));

module.exports = router;