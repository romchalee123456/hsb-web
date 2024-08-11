const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post( asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/update/:id')
    .post( asyncHandler(authController.update));


router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/getUser')
    .get(asyncHandler(authController.findAllUser));

    router.route('/getUser/:id')
    .get(asyncHandler(authController.findUserById));
    router.route('/deleteUser/:id')
    .delete(asyncHandler(authController.deleteUserId));
module.exports = router;