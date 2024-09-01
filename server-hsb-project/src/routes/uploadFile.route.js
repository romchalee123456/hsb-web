const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const uploadFileController = require('../controllers/uploadFile.controller');

router.route('/upload')
    .post(asyncHandler(uploadFileController.uploadFileHouseDetail));

module.exports = router;