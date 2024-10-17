const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const customerController = require('../controllers/customer.controller');
const authorization = require('../middlewares/authorization');



router.route('/customerCreate')
    .post(asyncHandler(authorization),asyncHandler(customerController.createCustomer));

router.route('/getCustomer')
    .get(asyncHandler(authorization),asyncHandler(customerController.findAllCustomer));

router.route('/customerFind/:id')
    .get(asyncHandler(customerController.findCustomerById));

router.route('/customerUpdate/:id')
    .put(asyncHandler(authorization),asyncHandler(customerController.updateCustomerId));
    
router.route('/customertDelete/:id')
    .delete(asyncHandler(authorization),asyncHandler(customerController.deleteCustomerId));

router.route('/searchCustomerByFirstname')
    .get(asyncHandler(customerController.searchCustomerByFirstname));

module.exports = router;