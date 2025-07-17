import express from 'express';
import { getMessages, postMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/messages/:chatId', getMessages);
router.post('/messages', postMessage);

export default router; 