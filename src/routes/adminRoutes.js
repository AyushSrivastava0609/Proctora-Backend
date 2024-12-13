const express = require('express');
const router = express.Router();
const authorizeAdmin = require('../middlewares/authorizedAdmin');

const { loginAdmin } = require('../controllers/adminController');

router.post('/adminLogin', loginAdmin);

module.exports = router;
