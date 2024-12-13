const express = require('express');
const { createTest, getTest, getTestById, modifyTest } = require('../controllers/testController');

const router = express.Router();

router.post('/createTest', createTest);
router.get('/Tests', getTest);
router.get('/Test/:id', getTestById);
router.put('/modifyTest/:id', modifyTest);

module.exports = router;