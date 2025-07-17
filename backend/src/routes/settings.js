const express = require('express');
const router = express.Router();

// Settings
router.get('/', (req, res) => { res.send('Get user settings') });
router.patch('/', (req, res) => { res.send('Update settings') });

module.exports = router;
