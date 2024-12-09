const express = require('express');
const router = express.Router();
const authorizeAdmin = require('../middlewares/authorizedAdmin');

const { loginAdmin, getAdminTest } = require('../controllers/adminController');

router.post('/adminLogin', loginAdmin)
router.get('/admintests', authorizeAdmin, getAdminTest );

module.exports = router;
