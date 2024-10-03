const express = require('express');
const { getEmployeeProfile, addEmployeeSkill, addEmployeeCertification } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, getEmployeeProfile);
router.post('/add-skill', authMiddleware, addEmployeeSkill);
router.post('/add-certification', authMiddleware, addEmployeeCertification);

module.exports = router;
