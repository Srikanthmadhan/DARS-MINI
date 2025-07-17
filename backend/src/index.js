const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per window
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(limiter);

// Routes
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messages');
const fileRoutes = require('./routes/files');
const aiRoutes = require('./routes/ai');
const settingsRoutes = require('./routes/settings');

app.use('/api', chatRoutes);
app.use('/api/chats/:id/messages', messageRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
  res.send('DARS Mini Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
