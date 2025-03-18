const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getTaskSuggestions } = require('../controllers/suggestionController');

// Protect all routes
router.use(protect);

router.get('/', getTaskSuggestions);

module.exports = router;