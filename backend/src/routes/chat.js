const express = require('express');
const router = express.Router();

// Chat Management
router.post('/', (req, res) => { res.send('Create new chat') });
router.get('/', (req, res) => { res.send('List all chats') });
router.get('/:id', (req, res) => { res.send(`Get chat ${req.params.id}`) });
router.patch('/:id', (req, res) => { res.send(`Update chat ${req.params.id}`) });
router.delete('/:id', (req, res) => { res.send(`Delete chat ${req.params.id}`) });
router.post('/:id/export', (req, res) => { res.send(`Export chat ${req.params.id}`) });

module.exports = router;
