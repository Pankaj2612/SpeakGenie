import { useState } from "react";
import { VoiceTutor } from "./components/VoiceTutor";
import { RoleplayMode } from "./components/RoleplayMode";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LanguageSelector } from "./components/LanguageSelector";
import {
  Mic,
  MessageCircle,
  Users,
  Settings,
  Sparkles,
  Star,
} from "lucide-react";

export type AppMode = "welcome" | "chatbot" | "roleplay";
export type Language = "english" | "hindi";

function App() {
  const [mode, setMode] = useState<AppMode>("welcome");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleModeSelect = (selectedMode: AppMode) => {
    setMode(selectedMode);
  };

  const handleBackToWelcome = () => {
    setMode("welcome");
  };

  const languageNames = {
    english: "English",
    hindi: "हिंदी",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}></div>
        <div
          className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}></div>
        <div
          className="absolute bottom-40 right-1/3 w-14 h-14 bg-green-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}></div>
        <Star className="absolute top-1/4 left-1/3 w-8 h-8 text-yellow-300 opacity-30 animate-pulse" />
        <Sparkles
          className="absolute top-1/3 right-1/4 w-6 h-6 text-purple-300 opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <Star
          className="absolute bottom-1/3 left-1/2 w-10 h-10 text-pink-300 opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b-4 border-purple-200 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                SpeakGenie
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                🎭 AI Voice Tutor
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-full transition-all transform hover:scale-105 shadow-md">
              <Settings
                className="w-4 h-4 text-purple-600 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <span className="text-xs sm:text-sm font-medium text-purple-700 hidden sm:inline">
                {languageNames[selectedLanguage]}
              </span>
            </button>

            {mode !== "welcome" && (
              <button
                onClick={handleBackToWelcome}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-full text-gray-700 text-xs sm:text-sm font-medium transition-all transform hover:scale-105 shadow-md">
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">🏠</span>
              </button>
            )}
          </div>
        </div>

        {showLanguageSelector && (
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageSelect={(lang) => {
              setSelectedLanguage(lang);
              setShowLanguageSelector(false);
            }}
            onClose={() => setShowLanguageSelector(false)}
          />
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {mode === "welcome" && (
          <WelcomeScreen onModeSelect={handleModeSelect} />
        )}

        {mode === "chatbot" && (
          <VoiceTutor
            language={selectedLanguage}
            onBack={handleBackToWelcome}
          />
        )}

        {mode === "roleplay" && (
          <RoleplayMode
            language={selectedLanguage}
            onBack={handleBackToWelcome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-md border-t-4 border-purple-200 py-4 sm:py-6 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            Built with ❤️ for SpeakGenie • Powered by AI Speech Technology
          </p>
          <div className="flex items-center justify-center space-x-3 sm:space-x-6 mt-2 sm:mt-3 flex-wrap">
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-500">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat Mode</span>
              <span className="sm:hidden">Chat</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-500">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Roleplay Scenarios</span>
              <span className="sm:hidden">Roleplay</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-500">
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">Voice Recognition</span>
              <span className="sm:hidden">Voice</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
