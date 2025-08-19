import {
  MessageCircle,
  Users,
  Sparkles,
  Volume2,
  Heart,
  Globe,
} from "lucide-react";
import type { AppMode } from "../App";

interface WelcomeScreenProps {
  onModeSelect: (mode: AppMode) => void;
}

export function WelcomeScreen({ onModeSelect }: WelcomeScreenProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-2xl">
          <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-white animate-pulse" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Welcome to SpeakGenie!
          </span>
          <div className="text-2xl sm:text-3xl mt-2">🎙️✨🎭</div>
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
          🌟 Practice English speaking with your friendly AI tutor! 🌟
          <br className="hidden sm:block" />
          Choose between fun conversations or exciting roleplay adventures! 🚀
        </p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16">
        {/* Chatbot Mode */}
        <div
          onClick={() => onModeSelect("chatbot")}
          className="group bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-purple-200 hover:border-purple-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-2 right-2 text-2xl animate-bounce">
            💬
          </div>
          <div className="absolute bottom-2 left-2 text-xl animate-pulse">
            ✨
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg mx-auto">
            <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            🗣️ Free Chat Mode
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed text-center font-medium">
            Ask me anything! 🤔 Practice conversations, get help with grammar,
            or chat about your day. I'm here to make learning English super fun!
            🎉
          </p>
          <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-3 text-sm text-gray-600 font-medium">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>📚 Ask questions about grammar</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 font-medium">
              <div
                className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}></div>
              <span>🗣️ Practice pronunciation</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 font-medium">
              <div
                className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}></div>
              <span>💭 Natural conversations</span>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-4 rounded-2xl font-bold text-lg group-hover:from-purple-600 group-hover:to-purple-800 transition-all transform group-hover:scale-105 shadow-lg">
            🚀 Start Chatting Now!
          </button>
        </div>

        {/* Roleplay Mode */}
        <div
          onClick={() => onModeSelect("roleplay")}
          className="group bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-pink-200 hover:border-pink-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:-rotate-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
          {/* Decorative elements */}
          <div
            className="absolute top-2 right-2 text-2xl animate-bounce"
            style={{ animationDelay: "0.5s" }}>
            🎭
          </div>
          <div
            className="absolute bottom-2 left-2 text-xl animate-pulse"
            style={{ animationDelay: "1s" }}>
            🌟
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-pink-400 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 shadow-lg mx-auto">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            🎭 Roleplay Adventures
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed text-center font-medium">
            Practice real-life conversations through exciting scenarios! 🎪
            Build confidence speaking in different places like school, shops, or
            at home! 🏠
          </p>
          <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-3 text-sm text-gray-600 font-medium">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>🏫 At School scenarios</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 font-medium">
              <div
                className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}></div>
              <span>🛒 Shopping practice</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 font-medium">
              <div
                className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}></div>
              <span>🏠 Family conversations</span>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg group-hover:from-pink-600 group-hover:to-orange-600 transition-all transform group-hover:scale-105 shadow-lg">
            🎪 Start Adventure!
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto border-4 border-yellow-200 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Why Choose SpeakGenie?
          </span>
          ✨🌟✨
        </h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-lg">
              <Volume2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              🎤 Real Voice AI
            </h4>
            <p className="text-sm text-gray-700 font-medium">
              Speak naturally and get instant AI responses with perfect
              pronunciation! 🗣️✨
            </p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-lg"
              style={{ animationDelay: "0.5s" }}>
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              💝 Kid-Friendly
            </h4>
            <p className="text-sm text-gray-700 font-medium">
              Safe, fun, and age-appropriate responses designed just for young
              learners! 👶❤️
            </p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-lg"
              style={{ animationDelay: "1s" }}>
              <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              🌍 Multi-Language
            </h4>
            <p className="text-sm text-gray-700 font-medium">
              Support for Hindi, Marathi, Tamil and other regional languages!
              🇮🇳🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
