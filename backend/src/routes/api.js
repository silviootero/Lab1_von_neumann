const express = require('express');
const { loadProgram, executeStep } = require('../controllers/cpuController');

const router = express.Router();

router.post('/load-program', loadProgram);
router.post('/execute-step', executeStep);

module.exports = router;
