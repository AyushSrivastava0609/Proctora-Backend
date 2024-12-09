const express = require('express');
const { createTest, getTest, getTestById } = require('../controllers/testController');

const router = express.Router();

router.post('/createTest', createTest);
router.get('/Tests', getTest);
router.get('/Test/:id', getTestById);

module.exports = router;