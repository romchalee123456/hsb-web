const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const uploadFileController = require('../controllers/uploadFile.controller');
const authorization = require('../middlewares/authorization');
router.route('/upload')
    .post(asyncHandler(authorization),asyncHandler(uploadFileController.uploadFileHouseDetail));

module.exports = router;