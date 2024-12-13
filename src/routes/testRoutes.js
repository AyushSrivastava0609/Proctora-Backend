const express = require('express');
const { createTest, getTest, getTestById, modifyTest, submitTest } = require('../controllers/testController');
const authorizeAdmin = require('../middlewares/authorizedAdmin');

const router = express.Router();

router.post('/createTest', authorizeAdmin , createTest);
router.get('/Tests', getTest);
router.get('/Test/:id', getTestById);
router.put('/modifyTest/:id', authorizeAdmin , modifyTest);
router.post('/submitTest', submitTest);

module.exports = router;