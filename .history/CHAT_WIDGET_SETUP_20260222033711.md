# AI Portfolio Chat Widget - Setup & Deployment Guide

## 📋 Overview

Production-quality AI portfolio chat widget using:
- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Google Gemini API** (gemini-1.5-flash)
- **Tailwind CSS** + Modern UI
- **@google/genai** SDK

## 🚀 Quick Start

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click **"Create API Key"** → **"Create API key in new project"**
3. Copy your API key

### 2. Set Environment Variable

Create `.env.local` in your project root:

```bash
GEMINI_API_KEY=your_api_key_here
```

**⚠️ NEVER commit `.env.local` to git - it contains secrets**

Verify in `.gitignore`:
```
.env.local
.env*.local
```

### 3. Install Dependencies

The `@google/genai` package is already in `package.json`. Just run:

```bash
pnpm install
```

Or if using npm/yarn:
```bash
npm install
# or
yarn install
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Test the Chat Widget

- **Open chat**: Click the floating button (bottom-right) or press `Ctrl + /`
- **Send message**: Type and press `Ctrl + Enter` or click Send
- **Close**: Press `Esc` or click X button

---

## 📁 Project Structure

```
portfolio-2.0-main/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts              ← Gemini API handler
│   ├── layout.tsx                    ← Includes ChatWidget
│   └── ...
├── components/
│   ├── ChatWidget.tsx                ← Main widget container
│   ├── MessageBubble.tsx             ← Message display component
│   ├── ChatInput.tsx                 ← Input box component
│   └── ...
├── lib/
│   ├── gemini.ts                     ← Gemini client & utilities
│   ├── resumeContext.ts              ← Resume data (AI knowledge base)
│   └── ...
├── .env.local                        ← (Create this) API key
└── package.json
```

---

## 🔧 File Descriptions

### `lib/resumeContext.ts`
- **Contains**: All resume data (experiences, skills, projects)
- **Used by**: API route to ground AI responses
- **Update**: Add/edit your experience, projects, skills here
- **Purpose**: Single source of truth for AI knowledge

### `lib/gemini.ts`
- **Contains**: Gemini client initialization, message handler, input validation
- **Features**:
  - Secure API key handling
  - Input validation (prevents prompt injection)
  - Rate limiting protection
  - Error handling

### `app/api/chat/route.ts`
- **Endpoint**: `POST /api/chat`
- **Features**:
  - Server-side only (API key never exposed)
  - Rate limiting (10 msgs/min per IP)
  - Combines system prompt + resume context
  - Comprehensive error handling
- **Request body**:
  ```json
  { "message": "Tell me about your experience" }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "AI response text..."
  }
  ```

### `components/ChatWidget.tsx`
- **Main widget** with floating button
- **Features**:
  - Open/close toggle
  - Minimize/maximize
  - Keyboard shortcuts (Ctrl+/, Esc)
  - Auto-scroll to latest message
  - Loading & error states
  - Responsive design
  - Accessible (ARIA labels)

### `components/MessageBubble.tsx`
- Displays individual messages
- User (blue) vs Assistant (gray) styling
- Timestamps

### `components/ChatInput.tsx`
- Text input with auto-resize
- Keyboard shortcuts (Ctrl+Enter to send)
- Input validation
- Disabled state during loading

---

## 🛡️ Security Features

1. **API Key Protection**
   - Stored only in `.env.local` (not exposed to client)
   - Used only on server-side

2. **Input Validation**
   - Message length limit (5000 chars)
   - Empty message rejection
   - Prompt injection prevention

3. **Rate Limiting**
   - 10 messages per minute per IP
   - Returns 429 status when exceeded

4. **Error Handling**
   - Safe error messages (no sensitive info)
   - Graceful fallbacks
   - User-friendly error UI

---

## 🎨 Customization

### Update Resume Data
Edit `lib/resumeContext.ts`:

```typescript
export const RESUME_DATA = {
  personalInfo: { /* your info */ },
  experience: [ /* add your experience */ ],
  projects: [ /* add your projects */ ],
  skills: { /* your skills */ },
  // ...
};
```

### Change AI Behavior
Edit `lib/resumeContext.ts` - `SYSTEM_PROMPT`:

```typescript
export const SYSTEM_PROMPT = `
  You are an AI assistant representing [Your Name].
  [Add custom instructions here]
`;
```

### Styling the Widget
All components use Tailwind CSS. Modify colors in:
- `components/ChatWidget.tsx` - gradient colors, shadows
- `components/MessageBubble.tsx` - message colors
- `components/ChatInput.tsx` - button colors

**Example**: Change button color from blue to purple:
```tsx
// Before
className="bg-blue-500 hover:bg-blue-600"
// After
className="bg-purple-500 hover:bg-purple-600"
```

### Add Custom Styling
Global styles are in `app/globals.css`. You can add:
```css
.chat-widget-custom {
  /* your styles */
}
```

---

## 📱 Responsive Design

The widget is fully responsive:
- **Mobile**: Full-width with adjusted height
- **Tablet**: Optimized layout
- **Desktop**: Right-side floating widget

Breakpoints used: `md` (768px), `lg` (1024px), `xl` (1280px)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + /` (or `Cmd + /`) | Open/close chat |
| `Esc` | Close chat |
| `Ctrl + Enter` | Send message |
| `Enter` | New line in message |

---

## 🧪 Testing the Widget

### Test Cases

1. **Basic Chat**
   - Ask: "What are your skills?"
   - Expected: AI lists skills from resume

2. **Project Questions**
   - Ask: "Tell me about Math Note"
   - Expected: Detailed project info

3. **Experience**
   - Ask: "Where have you worked?"
   - Expected: List of experiences

4. **Out-of-Scope Questions**
   - Ask: "What's the weather?"
   - Expected: "I can only answer questions about Sayed..."

5. **Error Handling**
   - Check network tab - API call should succeed
   - Test rate limit - send 11+ messages rapidly

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"Import Project"** → select your repo
4. Add environment variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your API key
5. Click **"Deploy"**

### Deploy to Other Platforms

**Environment Variables Required**:
- `GEMINI_API_KEY` - Your Google Gemini API key

**Build Command**:
```bash
pnpm install && pnpm build
```

**Start Command**:
```bash
pnpm start
```

---

## 🐛 Troubleshooting

### "GEMINI_API_KEY is not set"
- ✅ Check `.env.local` exists
- ✅ Verify API key format (should be long string)
- ✅ Restart dev server after adding env var

### Chat widget not appearing
- ✅ Check browser console for errors
- ✅ Verify `ChatWidget` is imported in `app/layout.tsx`
- ✅ Check z-index conflicts with other elements

### API errors / 500 responses
- ✅ Check API key is valid (test at [aistudio.google.com](https://aistudio.google.com))
- ✅ Verify request is valid JSON
- ✅ Check rate limiting (429 status)
- ✅ Server logs should show error details

### Styling issues
- ✅ Check Tailwind CSS is configured
- ✅ Verify `tailwindcss` in `package.json`
- ✅ Run `pnpm install` if packages are missing

### Widget frozen or not responding
- ✅ Check browser DevTools Network tab
- ✅ Verify API endpoint is `/api/chat`
- ✅ Check `Loading` state is working
- ✅ Try clearing browser cache

---

## 📊 Usage Limits

**Google Gemini API Free Tier**:
- 1000 requests per day (depends on plan)
- 2 requests per minute (depends on plan)
- Check [Google AI pricing](https://ai.google.dev/pricing)

**Rate Limiting** (configured in `app/api/chat/route.ts`):
- 10 messages per minute per IP
- Modify `RATE_LIMIT_MAX_MESSAGES` to adjust

---

## 🔒 Best Practices

1. **Never commit `.env.local`** - It contains secrets
2. **Rotate API key** - If accidentally exposed
3. **Monitor usage** - Check Google Cloud Console
4. **Update resume data** - Keep projects/experience current
5. **Test before deploying** - Verify all features work
6. **Add analytics** - Track usage (optional)

---

## 📚 API Reference

### Chat Endpoint

**Request**:
```bash
POST /api/chat
Content-Type: application/json

{
  "message": "What are your main skills?"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "I specialize in full-stack development with React, Next.js, TypeScript..."
}
```

**Error Response** (400/429/500):
```json
{
  "success": false,
  "error": "Error message explaining what went wrong"
}
```

---

## 🤝 Contributing

To improve the chat widget:

1. Update `RESUME_DATA` in `lib/resumeContext.ts`
2. Modify `SYSTEM_PROMPT` for better AI behavior
3. Enhance UI in component files
4. Test thoroughly before committing

---

## 📞 Support

For issues or questions:
1. Check **Troubleshooting** section above
2. Review console errors in browser DevTools
3. Check Google Gemini API status
4. Verify environment variables are set

---

## ✨ Next Steps

After setup, consider:
- [ ] Customize resume data with your info
- [ ] Adjust AI behavior/instructions
- [ ] Add analytics tracking
- [ ] Customize UI colors/styling
- [ ] Deploy to production
- [ ] Monitor API usage
- [ ] Collect user feedback

---

## 📝 Version Info

- **Next.js**: 16.0.0
- **React**: 19.2.4
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 3.4.19
- **@google/genai**: 1.42.0

---

**Happy chatting! 🚀**
