const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const authorization = require('../middlewares/authorization');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');

router.route('/signup')
    .post(  asyncHandler(authController.signup));

router.route('/update/:id')
    .post( asyncHandler(authController.update));


router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/getUser')
    .get(asyncHandler(authorization),asyncHandler(authController.findAllUser));

    router.route('/getUser/:id')
    .get(asyncHandler(authController.findUserById));
    router.route('/deleteUser/:id')
    .delete(asyncHandler(authController.deleteUserId));

    router.route('/refresh')
    .post(asyncHandler(authController.refreshAccessToken));

    router.route('/getUserDufult')
    .get(asyncHandler(authorization),asyncHandler(authController.findUserDefult));

module.exports = router;