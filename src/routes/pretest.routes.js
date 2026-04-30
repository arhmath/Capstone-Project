const router = require('express').Router();
const { body, query } = require('express-validator');
const { authenticate } = require('../middlewares/authenticate');
const { validate } = require('../middlewares/validate');
const pretestController = require('../controllers/pretest.controller');

const getQuestionsRules = [
  query('educationLevel')
    .notEmpty().withMessage('Jenjang pendidikan wajib dipilih')
];

const createSessionRules = [
  body('educationLevel')
    .notEmpty().withMessage('Jenjang pendidikan wajib dipilih')
];

router.get('/questions',              
  authenticate, 
  validate(getQuestionsRules), 
  pretestController.getQuestions);

router.post('/sessions',              
  authenticate, 
  validate(createSessionRules), 
  pretestController.createSession);

router.post('/sessions/:id/answer',   
  authenticate, 
  pretestController.submitAnswer);

router.post('/sessions/:id/finish',   
  authenticate, 
  pretestController.finishSession);

router.get('/sessions/:id/result',    
  authenticate, 
  pretestController.getResult);

module.exports = router;