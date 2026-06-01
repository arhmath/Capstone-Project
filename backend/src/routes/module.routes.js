const router        = require('express').Router();
const { query, body, param } = require('express-validator');
const { authenticate }       = require('../middlewares/authenticate');
const { validate }           = require('../middlewares/validate');
const moduleController       = require('../controllers/module.controller');

// GET /api/modules
router.get('/',
  authenticate,
  moduleController.getModules);

// GET /api/modules/:id
router.get('/:id',
  authenticate,
  moduleController.getModuleById);

// GET /api/modules/:id/pages/:pageNumber
router.get('/:id/pages/:pageNumber',
  authenticate,
  moduleController.getModulePage);

// PUT /api/modules/:id/progress
router.put('/:id/progress',
  authenticate,
    validate([
        body('last_page')
            .toInt()
    ]),
  moduleController.updateProgress);

module.exports = router;