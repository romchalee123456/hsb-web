const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const projectController = require('../controllers/project.controller');
const authorization = require('../middlewares/authorization');

router.route('/projectCreate')
    .post(asyncHandler(authorization),asyncHandler(projectController.createProject));

router.route('/getProject')
    .get(asyncHandler(authorization),asyncHandler(projectController.findAllProject));

router.route('/projectFind/:id')
    .get(asyncHandler(authorization),asyncHandler(projectController.findProjectById));

router.route('/projectUpdate/:id')
    .put(asyncHandler(authorization),asyncHandler(projectController.updateProjectId));
    
router.route('/projectDelete/:id')
    .delete(asyncHandler(authorization),asyncHandler(projectController.deleteProjectId));

router.route('/getPeriodDetail/:id')
    .get(asyncHandler(authorization),asyncHandler(projectController.findAllPeriodDetail));
router.route('/updateProjectLocation/:id')
    .put(asyncHandler(authorization),asyncHandler(projectController.updateProjectLocation));

module.exports = router;