const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const projectController = require('../controllers/project.controller');


router.route('/projectCreate')
    .post(asyncHandler(projectController.createProject));

router.route('/getProject')
    .get(asyncHandler(projectController.findAllProject));

router.route('/projectFind/:id')
    .get(asyncHandler(projectController.findProjectById));

router.route('/projectUpdate/:id')
    .put(asyncHandler(projectController.updateProjectId));
    
router.route('/projectDelete/:id')
    .delete(asyncHandler(projectController.deleteProjectId));

module.exports = router;