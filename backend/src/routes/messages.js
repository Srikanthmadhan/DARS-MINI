const express = require('express');
const router = express.Router();

// Message Operations
router.post('/', (req, res) => { res.send('Send message to AI') });
router.get('/', (req, res) => { res.send('Get chat messages') });
router.patch('/:id', (req, res) => { res.send(`Edit message ${req.params.id}`) });
router.delete('/:id', (req, res) => { res.send(`Delete message ${req.params.id}`) });
router.post('/:id/pin', (req, res) => { res.send(`Pin/unpin message ${req.params.id}`) });
router.post('/:id/translate', (req, res) => { res.send(`Translate message ${req.params.id}`) });

module.exports = router;
