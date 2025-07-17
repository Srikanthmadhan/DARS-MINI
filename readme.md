# DARS Mini - Enhanced Development Specification

## 🎯 Project Overview
You're building **DARS Mini**, a production-ready AI assistant that combines the simplicity of ChatGPT with advanced features. This is a lightweight but powerful chatbot with enterprise-grade UI/UX patterns.

## 🔧 Tech Stack & Configuration

### Frontend Stack
- **React 18** with TypeScript support
- **Tailwind CSS 3.4+** with custom design tokens
- **Vite** for blazing-fast development
- **React Router DOM** for navigation
- **Framer Motion** for smooth animations
- **Zustand** for state management

### Backend Stack
- **Node.js 18+** with Express.js
- **Google Gemini API** (gemini-pro model)
- **Multer** for file uploads
- **Helmet** for security headers
- **CORS** configuration
- **Rate limiting** with express-rate-limit

### Database & Storage
- **Supabase** (PostgreSQL + Real-time + Storage)
- **Project URL**: `https://dcbpxliwqygdmwdoevtw.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 🗄️ Enhanced Database Schema

### Tables Structure
```sql
-- Chats table
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL DEFAULT 'New Chat',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID, -- for future user management
  is_archived BOOLEAN DEFAULT FALSE,
  message_count INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pinned BOOLEAN DEFAULT FALSE,
  pinned_at TIMESTAMP WITH TIME ZONE,
  parent_message_id UUID REFERENCES messages(id), -- for reply threading
  tokens_used INTEGER DEFAULT 0,
  processing_time_ms INTEGER DEFAULT 0,
  has_attachments BOOLEAN DEFAULT FALSE
);

-- File attachments table
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE
);

-- User settings table
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  theme VARCHAR(20) DEFAULT 'dark' CHECK (theme IN ('light', 'dark', 'auto')),
  font_size VARCHAR(10) DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large')),
  typing_animation BOOLEAN DEFAULT TRUE,
  language VARCHAR(10) DEFAULT 'en',
  sidebar_collapsed BOOLEAN DEFAULT FALSE,
  sound_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat translations table (for caching)
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  source_language VARCHAR(10) NOT NULL,
  target_language VARCHAR(10) NOT NULL,
  translated_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 💬 Enhanced Chat Interface Features

### Message Bubble System
Each message bubble should include:

#### Core Actions Menu (Hover/Right-click)
- **Reply** 🔄: Quote message with threading support
- **Translate** 🌐: Auto-detect language and translate
- **Copy** 📋: Copy to clipboard with formatted text
- **Pin** 📌: Pin to sidebar with timestamp
- **Edit** ✏️: Edit user messages (re-send to AI)
- **Delete** 🗑️: Remove message from chat
- **Share** 📤: Generate shareable link for message
- **Export** 💾: Export single message as text/markdown

#### Visual Enhancements
- **Typing indicators**: Animated dots with realistic timing
- **Message status**: Sent, delivered, processing, error states
- **Timestamp**: Hover to show full datetime
- **Character count**: Show for long messages
- **Read time estimate**: For AI responses
- **Syntax highlighting**: For code blocks
- **LaTeX rendering**: For mathematical expressions

### Advanced Input System
```jsx
// Input features to implement
const InputFeatures = {
  textFormatting: {
    bold: 'Ctrl+B',
    italic: 'Ctrl+I',
    code: 'Ctrl+`',
    link: 'Ctrl+K'
  },
  shortcuts: {
    send: 'Enter',
    newLine: 'Shift+Enter',
    clearChat: 'Ctrl+L',
    focusInput: '/'
  },
  fileSupport: {
    dragDrop: true,
    pasteImages: true,
    maxSize: '10MB',
    allowedTypes: ['.pdf', '.txt', '.md', '.png', '.jpg', '.jpeg', '.gif']
  }
}
```

## 📑 Enhanced Sidebar Features

### Session Management
- **Smart grouping**: Today, Yesterday, This Week, This Month
- **Search functionality**: Filter chats by content or title
- **Bulk actions**: Select multiple chats for deletion/archiving
- **Favorites**: Star important conversations
- **Export options**: Individual or bulk export

### Advanced Controls
```jsx
const SidebarSections = {
  activeChat: {
    title: 'Current Chat',
    messageCount: 'number',
    tokenUsage: 'estimation',
    quickActions: ['summary', 'export', 'share']
  },
  pinnedMessages: {
    preview: 'first 50 chars',
    timestamp: 'relative time',
    jumpTo: 'scroll to message'
  },
  recentChats: {
    grouping: 'by date',
    search: 'fuzzy search',
    contextMenu: ['rename', 'delete', 'archive', 'export']
  }
}
```

## ⚙️ Enhanced Settings System

### Theme Management
```jsx
const ThemeOptions = {
  presets: {
    light: { bg: 'white', text: 'gray-900', accent: 'blue-600' },
    dark: { bg: 'gray-900', text: 'white', accent: 'blue-400' },
    midnight: { bg: 'black', text: 'gray-100', accent: 'purple-400' },
    ocean: { bg: 'blue-950', text: 'blue-100', accent: 'cyan-400' }
  },
  customization: {
    accentColor: 'color picker',
    borderRadius: 'slider (0-20px)',
    fontFamily: ['Inter', 'SF Pro', 'Roboto', 'JetBrains Mono'],
    compactMode: 'boolean'
  }
}
```

### Performance Settings
- **Message limit**: Controls how many messages to load
- **Auto-scroll**: Enable/disable auto-scroll to bottom
- **Streaming**: Real-time response streaming
- **Offline mode**: Cache responses for offline viewing
- **Data usage**: Show token consumption and costs

## 🛠️ Backend API Specifications

### Enhanced Endpoints
```javascript
// Chat Management
POST   /api/chats                    // Create new chat
GET    /api/chats                    // List all chats (with pagination)
GET    /api/chats/:id                // Get specific chat with messages
PATCH  /api/chats/:id                // Update chat (rename, archive)
DELETE /api/chats/:id                // Delete chat
POST   /api/chats/:id/export         // Export chat as file

// Message Operations
POST   /api/chats/:id/messages       // Send message to AI
GET    /api/chats/:id/messages       // Get chat messages (paginated)
PATCH  /api/messages/:id             // Edit message
DELETE /api/messages/:id             // Delete message
POST   /api/messages/:id/pin         // Pin/unpin message
POST   /api/messages/:id/translate   // Translate message

// File Operations
POST   /api/upload                   // Upload file
GET    /api/files/:id                // Get file metadata
DELETE /api/files/:id                // Delete file

// AI Operations
POST   /api/ai/chat                  // Send to Gemini API
POST   /api/ai/summarize             // Summarize conversation
POST   /api/ai/translate             // Translate text
POST   /api/ai/analyze-file          // Analyze uploaded file

// Settings
GET    /api/settings                 // Get user settings
PATCH  /api/settings                 // Update settings
```

### Advanced Features Implementation

#### Real-time Updates
```javascript
// WebSocket integration for live updates
const wsFeatures = {
  typing: 'Show when user is typing',
  presence: 'Online/offline status',
  liveSync: 'Sync across multiple devices',
  notifications: 'Browser notifications for new messages'
}
```

#### Error Handling & Recovery
```javascript
const errorHandling = {
  retryMechanism: 'Exponential backoff for API calls',
  offlineMode: 'Queue messages when offline',
  rateLimiting: 'Graceful degradation when rate limited',
  tokenManagement: 'Monitor and warn about token usage'
}
```

## 🎨 UI Component Specifications

### ChatBubble Component
```jsx
const ChatBubble = {
  props: {
    message: 'Message object',
    isUser: 'boolean',
    showActions: 'boolean',
    isStreaming: 'boolean',
    parentMessage: 'Message object (for replies)'
  },
  features: {
    contextMenu: 'Right-click actions',
    replyPreview: 'Show parent message preview',
    animatedEntry: 'Slide in animation',
    codeHighlighting: 'Syntax highlighting for code',
    mathRendering: 'LaTeX/MathJax support'
  }
}
```

### Enhanced File Upload
```jsx
const FileUpload = {
  features: {
    dragDrop: 'Visual drop zone',
    preview: 'Image/PDF preview',
    progress: 'Upload progress bar',
    validation: 'File type and size validation',
    multiSelect: 'Multiple file selection'
  },
  processing: {
    pdf: 'Extract text content',
    images: 'OCR text extraction',
    documents: 'Parse and index content'
  }
}
```

## 🔴 Live Chat Page Enhancement

### Full-screen Experience
```jsx
const LiveChatFeatures = {
  layout: {
    fullScreen: 'Immersive chat experience',
    focusMode: 'Hide sidebar and distractions',
    zenMode: 'Minimal UI with just chat'
  },
  interactions: {
    voiceToText: 'Speech recognition',
    shortcuts: 'Keyboard shortcuts overlay',
    quickActions: 'Floating action buttons'
  },
  realTime: {
    typing: 'Real-time typing indicators',
    presence: 'User presence indicators',
    liveSync: 'Multi-device synchronization'
  }
}
```

## 📦 Enhanced Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-markdown": "^9.0.0",
    "react-syntax-highlighter": "^15.5.0",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0",
    "react-hotkeys-hook": "^4.4.0",
    "react-intersection-observer": "^9.5.0",
    "react-window": "^1.8.0",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.263.0"
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

## 🚀 Deployment Strategy

### Frontend Deployment (Vercel)
```bash
# Build optimization
npm run build
# Environment variables
VITE_SUPABASE_URL=https://dcbpxliwqygdmwdoevtw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_BACKEND_URL=https://your-backend-url.com
```

### Backend Deployment (Railway/Render)
```bash
# Production environment
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://dcbpxliwqygdmwdoevtw.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
GEMINI_API_KEY=your-gemini-key
```

## 📁 Enhanced Folder Structure

```
dars-mini/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatBubble.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   ├── TypingIndicator.jsx
│   │   │   │   └── FileUpload.jsx
│   │   │   ├── sidebar/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── ChatList.jsx
│   │   │   │   ├── PinnedMessages.jsx
│   │   │   │   └── SettingsPanel.jsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Tooltip.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   └── layout/
│   │   │       ├── Header.jsx
│   │   │       ├── Footer.jsx
│   │   │       └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LiveChatPage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── hooks/
│   │   │   ├── useChat.js
│   │   │   ├── useSettings.js
│   │   │   ├── useKeyboardShortcuts.js
│   │   │   └── useLocalStorage.js
│   │   ├── store/
│   │   │   ├── chatStore.js
│   │   │   ├── settingsStore.js
│   │   │   └── uiStore.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── supabase.js
│   │   │   ├── gemini.js
│   │   │   └── storage.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── themes.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   │   ├── icons/
│   │   └── images/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── chat.js
│   │   │   ├── messages.js
│   │   │   ├── files.js
│   │   │   ├── ai.js
│   │   │   └── settings.js
│   │   ├── controllers/
│   │   │   ├── chatController.js
│   │   │   ├── messageController.js
│   │   │   ├── fileController.js
│   │   │   └── aiController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   ├── rateLimit.js
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   ├── supabaseService.js
│   │   │   ├── geminiService.js
│   │   │   ├── fileService.js
│   │   │   └── translationService.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── validators.js
│   │   │   └── helpers.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── gemini.js
│   │   │   └── storage.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── .gitignore
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── docker-compose.yml
```

## 🎯 Implementation Phases

### Phase 1: Core Chat System (Week 1-2)
- Basic chat interface with message bubbles
- Gemini API integration
- Message storage in Supabase
- Basic sidebar with chat sessions

### Phase 2: Enhanced Features (Week 3-4)
- Message actions (reply, copy, pin, translate)
- File upload and processing
- Settings system with themes
- Real-time updates

### Phase 3: Advanced Features (Week 5-6)
- Live chat page
- Advanced search and filtering
- Export functionality
- Performance optimizations

### Phase 4: Polish & Deploy (Week 7-8)
- UI/UX refinements
- Testing and bug fixes
- Documentation
- Production deployment

## 🔧 Development Best Practices

### Code Quality
- TypeScript for type safety
- ESLint + Prettier for formatting
- Husky for pre-commit hooks
- Comprehensive error handling
- Unit tests for critical functions

### Performance
- Virtualized message lists for large chats
- Lazy loading for chat history
- Debounced search and input
- Optimized re-renders with React.memo
- Service worker for offline support

### Security
- Input sanitization
- XSS prevention
- CSRF protection
- Rate limiting
- Environment variable management

This enhanced specification provides a comprehensive roadmap for building a production-ready AI assistant with enterprise-grade features and user experience. 

Database Schema

Complete SQL schema with proper relationships
Tables for translations, attachments, and user settings
Foreign key constraints and data validation
Indexing considerations for performance

Advanced UI Features

Detailed message bubble actions with hover states
Enhanced input system with keyboard shortcuts
Sophisticated sidebar with smart grouping and search
Comprehensive settings with theme customization

Backend Architecture

RESTful API design with proper HTTP methods
WebSocket integration for real-time features
Error handling and retry mechanisms
File processing and storage management

Technical Specifications

Complete dependency list with versions
TypeScript support and development tools
Performance optimization strategies
Security best practices

Implementation Roadmap

4-phase development plan with timelines
Clear milestone deliverables
Testing and deployment strategies
Code quality standards

Enhanced Features

Voice-to-text integration
LaTeX/Math rendering support
Offline mode capabilities
Multi-device synchronization
Advanced export options