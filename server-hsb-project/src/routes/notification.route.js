const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const { asyncHandler } = require('../middlewares/asyncHandler');
const notificationsController = require('../controllers/notifications.controller');


router.route('/createNewNotification')
    .post(asyncHandler(authorization),asyncHandler(notificationsController.createNewNotification));
    router.route('/findAllNotification')
    .get(asyncHandler(authorization),asyncHandler(notificationsController.findAllNotification)); 
    router.route('/findNotificationById/:id')
    .get(asyncHandler(authorization),asyncHandler(notificationsController.findNotificationById)); 
    router.route('/approveNotification/:id')
    .post(asyncHandler(authorization),asyncHandler(notificationsController.approveNotification)); 
    router.route('/sendBackNotification/:id')
    .post(asyncHandler(authorization),asyncHandler(notificationsController.sendBackNotification)); 
    router.route('/findAllNotificationHistory/:id')
    .get(asyncHandler(authorization),asyncHandler(notificationsController.findAllNotificationHistory)); 
    router.route('/sendLineReport/:id/:customerId')
    .get(asyncHandler(authorization),asyncHandler(notificationsController.sendLineReport)); 
    router.route('/getAllUserLineIds')
    .get(asyncHandler(notificationsController.getAllUserLineIds)); 
module.exports = router;