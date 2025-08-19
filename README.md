# SpeakGenie - Real-Time AI Voice Tutor 🎙️🤖

A comprehensive AI-powered English speaking tutor designed for children aged 6-16 years, featuring real-time voice interaction, intelligent chat responses, and immersive roleplay scenarios.

## 🌟 Features

### 1️⃣ AI Chatbot Mode
- **Real-time voice conversation** using Web Speech API
- **Child-friendly AI responses** with age-appropriate language
- **Grammar assistance** for nouns, verbs, adjectives, and more
- **Pronunciation guidance** and speaking practice
- **Context-aware conversations** that adapt to the child's input

### 2️⃣ Interactive Roleplay Mode
- **Scenario-based learning** with guided conversations
- **Three immersive scenarios:**
  - 🏫 **At School**: Practice introductions and school conversations
  - 🛒 **At the Store**: Learn shopping vocabulary and polite requests
  - 🏠 **At Home**: Discuss family and daily activities
- **Progressive difficulty** with helpful hints and suggestions
- **Visual progress tracking** for each scenario

### 3️⃣ Multi-Language Support
- **Native language playback** support for:
  - 🇺🇸 English
  - 🇮🇳 Hindi (हिंदी)
  - 🇮🇳 Marathi (मराठी)
  - 🇮🇳 Gujarati (ગુજરાતી)
  - 🇮🇳 Tamil (தமிழ்)

### 4️⃣ Advanced Voice Technology
- **Speech-to-Text** using Web Speech Recognition API
- **Text-to-Speech** with natural voice synthesis
- **Audio visualization** during speech recognition
- **Voice activity detection** with visual feedback

## 🎨 Design Features

- **Child-friendly interface** with playful colors and animations
- **Responsive design** optimized for tablets and mobile devices
- **Emoji feedback** and gamified interactions
- **Smooth micro-interactions** for enhanced user engagement
- **Professional audio visualizations** during conversations
- **Accessibility-focused** with large buttons and clear typography

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern browser with Web Speech API support (Chrome, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd speakgenie-voice-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradients
- **Build Tool**: Vite for fast development and building
- **Voice APIs**: Web Speech Recognition & Speech Synthesis APIs
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Hooks for component state

## 🎯 Usage Guide

### For Students

1. **Choose Your Mode**
   - Select "Free Chat Mode" for open conversations
   - Select "Roleplay Mode" for guided scenarios

2. **Voice Interaction**
   - Click the microphone button to start speaking
   - Speak clearly and wait for the AI response
   - The system will automatically convert speech to text and respond

3. **Language Selection**
   - Click the settings icon to choose your preferred language
   - AI responses will be spoken in the selected language

### For Educators

- **Monitor Progress**: Visual indicators show conversation flow
- **Scenario Selection**: Choose age-appropriate roleplay scenarios
- **Multi-language Support**: Accommodate diverse student backgrounds

## 🔧 API Integration

### OpenAI Integration (Production Setup)

For production deployment, integrate with OpenAI API:

```typescript
// Example integration in src/hooks/useAIChat.ts
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are a friendly, patient English tutor for children aged 6-16. Use simple language, be encouraging, and provide age-appropriate responses."
    },
    {
      role: "user",
      content: message
    }
  ],
  max_tokens: 150
});
```

### Environment Variables

Create a `.env` file for API keys:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key # Optional for premium TTS
```

## 🌐 Browser Compatibility

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|---------|---------|------|
| Speech Recognition | ✅ | ✅ | ⚠️ | ✅ |
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| Audio Visualization | ✅ | ✅ | ✅ | ✅ |

⚠️ Firefox has limited speech recognition support

## 🏗️ Architecture

```
src/
├── components/
│   ├── VoiceTutor.tsx        # Main chat interface
│   ├── RoleplayMode.tsx      # Scenario-based learning
│   ├── WelcomeScreen.tsx     # Landing page
│   ├── LanguageSelector.tsx  # Language switching
│   ├── ChatMessage.tsx       # Message components
│   └── AudioVisualizer.tsx   # Voice visualization
├── hooks/
│   ├── useSpeechRecognition.ts # Speech-to-text logic
│   ├── useSpeechSynthesis.ts   # Text-to-speech logic
│   └── useAIChat.ts           # AI integration
└── types/
    └── speech.d.ts            # TypeScript definitions
```

## 🔒 Privacy & Safety

- **No data storage**: Conversations are not recorded or stored
- **Child-safe responses**: AI is programmed with child-appropriate content filters
- **Local processing**: Speech recognition happens in the browser
- **COPPA compliant**: Designed with children's privacy in mind

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

```bash
# Vercel
npx vercel --prod

# Netlify
npm run build && npx netlify deploy --prod --dir=dist
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Educational Impact

SpeakGenie helps students:
- **Build confidence** in English speaking
- **Practice pronunciation** with immediate feedback
- **Learn vocabulary** through contextual conversations
- **Develop fluency** through regular practice
- **Overcome speaking anxiety** in a safe environment

## 🌟 Future Enhancements

- **Advanced AI models** for more natural conversations
- **Progress tracking** and performance analytics
- **More roleplay scenarios** (restaurant, doctor, etc.)
- **Voice emotion recognition** for better feedback
- **Integration with school curricula**
- **Parent/teacher dashboards** for progress monitoring

---

**Built with ❤️ for SpeakGenie**  
*Empowering children to speak English confidently through AI technology*