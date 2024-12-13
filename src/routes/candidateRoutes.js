const express = require('express');
const { getUserTestHistory, getTestAttempts } = require('../controllers/candidateController');

const router = express.Router();

router.get('/candidateHistory', getUserTestHistory);
router.get('/tests/:testId/attempts', getTestAttempts);

module.exports = router;