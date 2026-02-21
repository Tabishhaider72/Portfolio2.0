# 🎨 AI Chat Widget - Visual & Architecture Guide

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              ChatWidget (React Component)               │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │  Header (Gradient Blue → Indigo)                  │  │   │
│  │  │  • Title: "Sayed's Assistant"                      │  │   │
│  │  │  • Minimize/Maximize/Close buttons                 │  │   │
│  │  ├───────────────────────────────────────────────────┤  │   │
│  │  │  Message Container (Scrollable)                   │  │   │
│  │  │  ┌─────────────────────────────────────────────┐  │  │   │
│  │  │  │ MessageBubble (Assistant - Gray)           │  │  │   │
│  │  │  │ "Hi! I'm here to answer questions..."     │  │  │   │
│  │  │  │ 2:30 PM                                    │  │  │   │
│  │  │  └─────────────────────────────────────────────┘  │  │   │
│  │  │                          ┌─────────────────────┐  │  │   │
│  │  │                          │ MessageBubble (You) │  │  │   │
│  │  │                          │ "What are skills?"  │  │  │   │
│  │  │                          │ 2:31 PM            │  │  │   │
│  │  │                          └─────────────────────┘  │  │   │
│  │  │  ┌─────────────────────────────────────────────┐  │  │   │
│  │  │  │ MessageBubble (Assistant - Loading)        │  │  │   │
│  │  │  │ ⠋ ⠙ ⠹ (Typing indicator)                   │  │  │   │
│  │  │  └─────────────────────────────────────────────┘  │  │   │
│  │  ├───────────────────────────────────────────────────┤  │   │
│  │  │  ChatInput                                        │  │   │
│  │  │  ┌────────────────────────────────────┐  ┌────┐  │  │   │
│  │  │  │ Ask about experience, skills...    │  │ ➤  │  │  │   │
│  │  │  └────────────────────────────────────┘  └────┘  │  │   │
│  │  │  Tip: Press Ctrl+Enter | Clear                  │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│     ┌─────────────────────────────────────────────────────┐    │
│     │      Floating Toggle Button (Bottom-Right)         │    │
│     │  ┌──────────────────────┐                          │    │
│     │  │     💬 (Floating)     │                          │    │
│     │  │   (Green dot indicator) │                        │    │
│     │  └──────────────────────┘                          │    │
│     └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
              ↓ API Call (POST /api/chat)
┌──────────────────────────────────────────────────────────────────┐
│                      NEXT.JS SERVER                              │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              POST /api/chat/route.ts                       │  │
│  │  • Receives: { message: "What are your skills?" }        │  │
│  │  • Validates: Input length, format, injection attempts   │  │
│  │  • Rate Limits: 10 msgs/min per IP                       │  │
│  │  • Combines:                                              │  │
│  │    - System Prompt (AI behavior rules)                   │  │
│  │    - Resume Context (complete resume data)              │  │
│  │    - User Message                                        │  │
│  │  • Sends to Gemini API                                   │  │
│  │  • Returns: { success: true, message: "..." }           │  │
│  └────────────────────────────────────────────────────────────┘  │
│              ↓ Initialize & Configure                           │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              lib/gemini.ts                                 │  │
│  │  • GoogleGenerativeAI(apiKey)                             │  │
│  │  • getGenerativeModel("gemini-1.5-flash")                │  │
│  │  • generateContent(userMessage)                           │  │
│  │  • Validate input (security)                              │  │
│  │  • Handle errors gracefully                               │  │
│  └────────────────────────────────────────────────────────────┘  │
│              ↓ Data Source                                       │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              lib/resumeContext.ts                          │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │ RESUME_DATA = {                                      │  │  │
│  │  │   personal: { name, email, phone, ... },            │  │  │
│  │  │   experience: [ 2 internships ],                    │  │  │
│  │  │   projects: [ CVRoaster, Doc.Chat, BookMyRoom ],  │  │  │
│  │  │   skills: { programming, tools },                  │  │  │
│  │  │   education: [ 2 degrees ],                        │  │  │
│  │  │ }                                                    │  │  │
│  │  │ SYSTEM_PROMPT = "AI behavior rules..."             │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│              GOOGLE GEMINI AI (Cloud)                             │
│  • Model: gemini-1.5-flash                                       │
│  • Receives: System Prompt + Resume Context + User Question     │
│  • Processes: Generates response using only resume data         │
│  • Returns: Text response grounded in resume                    │
│  • Never hallucinates or invents information                    │
└──────────────────────────────────────────────────────────────────┘
                            ↓
          Response flows back to browser
          ChatWidget displays in message bubble
```

---

## 🎨 UI Component Layout

### ChatWidget Container
```
┌─────────────────────────────────────────┐
│ HEADER (from-blue-500 to-indigo-600)   │  ← Fixed height: 64px
│ [AI Icon] Sayed's Assistant | - [ ]  ✕ │
├─────────────────────────────────────────┤
│                                         │
│  💬 AI: Hi! How can I help?            │  ← Message bubbles
│                                         │     with timestamps
│                  Your: What's your...  │
│                                         │
│  💬 AI: [⠋⠙⠹] (Typing indicator)      │  ← Loading state
│                                         │
│                      (Auto-scroll area) │  ← Flex: 1
│                                         │
├─────────────────────────────────────────┤
│ ┌───────────────────────────────────┬─┐ │  ← Input area
│ │ Ask about your experience...      │ │ │
│ └───────────────────────────────────┴─┘ │
│ 💡 Tip: Ctrl+Enter | Clear             │  ← Footer
└─────────────────────────────────────────┘

Dimensions:
• Desktop: 420px width × 600px height
• Mobile: Full width × 600px height
• Position: Fixed bottom-right with z-50
```

### Message Bubble Styling

**Assistant Message (Gray)**
```
┌────────────────────────────────┐
│ [AI Icon]                      │
│         Full-stack developer   │
│         specializing in React  │
│         and Next.js...         │
│                                │
│         2:31 PM                │
└────────────────────────────────┘
Background: bg-gray-100 dark:bg-gray-800
```

**User Message (Blue)**
```
┌────────────────────────────────┐
│                   [Your Icon]  │
│         Tell me about your     │
│         experience?            │
│                                │
│         2:32 PM                │
└────────────────────────────────┘
Background: bg-blue-500 text-white
```

---

## 📊 Data Flow Diagram

```
USER TYPES MESSAGE
         ↓
  [ChatInput Component]
  • Validates input
  • Checks length (<5000 chars)
  • Prevents empty submissions
         ↓
  MESSAGE ADDED TO STATE
  • setMessages([...prev, userMessage])
  • UI updates immediately
  • Shows loading state
         ↓
  POST /api/chat
  └─ Payload: { message: "..." }
         ↓
  SERVER-SIDE PROCESSING
  ┌─ Receive request
  ├─ Extract message
  ├─ Validate input (injection prevention)
  ├─ Check rate limit (10/min)
  ├─ Combine with:
  │  ├─ System prompt (behavior rules)
  │  └─ Resume context (full resume)
  └─ Send to Gemini API
         ↓
  GEMINI AI PROCESSES
  ┌─ Receives: prompt + resume + question
  ├─ Generates: contextual response
  └─ Ensures: response is resume-grounded
         ↓
  RESPONSE FLOWS BACK
  • API returns: { success, message }
  • JavaScript parses JSON
  • New message added to state
  • UI re-renders with response
  • Auto-scrolls to bottom
         ↓
  DISPLAY IN CHAT
  • Message bubble animates in
  • Timestamp shown
  • User can read/respond
  • Clear button available
```

---

## 🔐 Security Layers

```
LAYER 1: CLIENT VALIDATION
├─ ChatInput component
├─ Message length check (<5000)
├─ Empty message rejection
└─ Keyboard validation

LAYER 2: SERVER VALIDATION
├─ Input sanitization
├─ Prompt injection detection
│  └─ Blocks patterns like "ignore instructions"
├─ Message length re-check
└─ Type validation

LAYER 3: RATE LIMITING
├─ IP-based tracking
├─ 10 messages per minute limit
├─ Timestamp-based cleanup
└─ 429 error on exceed

LAYER 4: API KEY SECURITY
├─ Stored in .env.local (never committed)
├─ Only used on server
├─ Never exposed to client
├─ Checked on startup
└─ Error if missing

LAYER 5: ERROR HANDLING
├─ Try-catch blocks
├─ Safe error messages
├─ No sensitive info in errors
├─ Logging for debugging
└─ User-friendly UI feedback
```

---

## 🎯 User Interaction Flows

### Flow 1: Open Chat
```
User presses Ctrl+/
        ↓
Event listener triggered
        ↓
setIsOpen(true)
        ↓
Widget animates in
opacity-0 → opacity-100
translate-y-4 → translate-y-0
        ↓
Chat ready for input
```

### Flow 2: Send Message
```
User types message
        ↓
onChange event updates state
Textarea auto-resizes
        ↓
User presses Ctrl+Enter
        ↓
handleSubmit event
        ↓
Validate: message.trim().length > 0
        ↓
setIsSubmitting(true)
        ↓
POST /api/chat
        ↓
{Success}
  • Parse response
  • Add assistant message to state
  • Clear input field
  
{Error}
  • Show error message
  • Allow retry
  • Maintain message history
        ↓
setIsSubmitting(false)
        ↓
User can continue chatting
```

### Flow 3: Clear Chat
```
User clicks "Clear"
        ↓
handleClearChat()
        ↓
setMessages([INITIAL_MESSAGE])
setError(null)
setHasInteracted(false)
        ↓
Reset to initial state
```

---

## 📱 Responsive Breakpoints

```
MOBILE (0px - 767px)
├─ Widget: Full width - 32px (margin)
├─ Height: 600px fixed
├─ Input: Adjusted spacing
├─ Font: Default (readable on mobile)
└─ Icons: Same size, touch-friendly

TABLET (768px - 1023px)
├─ Widget: 420px width
├─ Height: 600px
├─ Optimized padding
├─ Readable text size
└─ Comfortable touch targets

DESKTOP (1024px+)
├─ Widget: 420px width
├─ Height: 600px
├─ Full styling
├─ Keyboard shortcuts
└─ Smooth animations
```

---

## 🌓 Dark Mode Support

**Light Mode (Default)**
```
Background: white
Text: gray-900
Message (You): blue-500
Message (AI): gray-100
Input: gray-50
Border: gray-200
```

**Dark Mode (dark: classes)**
```
Background: gray-950
Text: gray-100
Message (You): blue-500 (same)
Message (AI): gray-800
Input: gray-800
Border: gray-800
```

Triggered by: `prefers-color-scheme: dark` or `.dark` class

---

## ⌨️ Keyboard Navigation

```
TAB ↔ Focus cycle through:
├─ Open/Close button
├─ Minimize button
├─ Close button
├─ Message container (scroll)
├─ Text input
└─ Send button

ENTER
├─ In input: New line
└─ With Ctrl: Send message

CTRL + /
├─ Open/close chat widget
└─ Global shortcut (any page)

ESC
└─ Close chat widget

ARROW KEYS
└─ Scroll through messages (if focused)
```

---

## 📈 Performance Considerations

```
OPTIMIZATION TECHNIQUES

Frontend:
├─ React.memo on message bubbles (prevent re-renders)
├─ Lazy loading for long conversations
├─ Virtualization for 100+ messages (optional)
└─ CSS animations instead of JS

Backend:
├─ Server-side validation (faster)
├─ Rate limiting prevents overload
├─ Efficient JSON formatting
└─ Error responses cached

Network:
├─ Minimal payload size
├─ Gzip compression (automatic)
├─ No unnecessary API calls
└─ Optimized bundle size
```

---

## 🔄 State Management

```
ChatWidget State:
├─ isOpen: boolean (widget visible)
├─ isMinimized: boolean (minimized state)
├─ messages: Message[] (chat history)
│  └─ { id, role, content, timestamp }
├─ isLoading: boolean (API call in progress)
├─ error: string | null (error message)
└─ hasInteracted: boolean (show clear button)

Message Object:
├─ id: string (unique identifier)
├─ role: 'user' | 'assistant'
├─ content: string (message text)
└─ timestamp: Date (when sent)
```

---

## 🎓 Component Hierarchy

```
RootLayout
└─ ChatWidget
   ├─ Header (fixed, sticky)
   │  ├─ Title + Logo
   │  ├─ Minimize button
   │  └─ Close button
   ├─ Messages Container (scrollable)
   │  ├─ MessageBubble (each message)
   │  │  ├─ Avatar
   │  │  ├─ Message text
   │  │  └─ Timestamp
   │  ├─ Loading state (typing indicator)
   │  ├─ Error state (alert)
   │  └─ Auto-scroll target
   └─ ChatInput (fixed bottom)
      ├─ Textarea (auto-resize)
      ├─ Send button
      ├─ Loading spinner
      └─ Footer (tips + clear)

+ Floating Toggle Button (outside widget)
```

---

**Visual architecture complete! Ready for development & deployment.** ✨
