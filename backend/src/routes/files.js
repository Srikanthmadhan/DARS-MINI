const express = require('express');
const router = express.Router();

// File Operations
router.post('/upload', (req, res) => { res.send('Upload file') });
router.get('/:id', (req, res) => { res.send(`Get file metadata ${req.params.id}`) });
router.delete('/:id', (req, res) => { res.send(`Delete file ${req.params.id}`) });

module.exports = router;
