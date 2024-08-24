const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const customerController = require('../controllers/customer.controller');


router.route('/customerCreate')
    .post(asyncHandler(customerController.createCustomer));

router.route('/getCustomer')
    .get(asyncHandler(customerController.findAllCustomer));

router.route('/customerFind/:id')
    .get(asyncHandler(customerController.findCustomerById));

router.route('/customerUpdate/:id')
    .put(asyncHandler(customerController.updateCustomerId));
    
router.route('/customertDelete/:id')
    .delete(asyncHandler(customerController.deleteCustomerId));

module.exports = router;