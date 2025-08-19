import { useState, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Users,
  ArrowRight,
  RotateCcw,
  Loader,
} from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { useAudioRecorder } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import type { Language } from "../App";

interface RoleplayModeProps {
  language: Language;
  onBack: () => void;
}

interface Scenario {
  id: string;
  title: string;
  emoji: string;
  description: string;
  context: string;
  script: string;
  voice_path: string;
}

const scenarios: Scenario[] = [
  {
    id: "school",
    title: "At School",
    emoji: "🏫",
    description: "Practice introducing yourself and talking about school",
    context: "You are meeting a new friend at school for the first time.",
    script: "Good morning! What's your name?",
    voice_path: "/recordings/school.mp3",
  },
  {
    id: "store",
    title: "At the Store",
    emoji: "🛒",
    description: "Learn how to shop and ask for items politely",
    context: "You are at a grocery store buying fruits.",
    script: "Welcome to our store! How can I help you today?",
    voice_path: "/recordings/store.mp3",
  },
  {
    id: "home",
    title: "At Home",
    emoji: "🏠",
    description: "Talk about your family and daily activities",
    context: "You are talking to a friend about your family.",
    script: "Who do you live with at home?",
    voice_path: "/recordings/home.mp3",
  },
];

export function RoleplayMode({ language }: RoleplayModeProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null
  );

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "voice.webm");
      formData.append("lang", language);
      formData.append(
        "roleplay",
        selectedScenario ? selectedScenario.id : "home"
      );

      setIsLoading(true);

      
      const res = await fetch(import.meta.env.VITE_BASE_URL + "/roleplay", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to fetch audio");

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      setIsSpeaking(true);
      audio.play();
      audio.onended = () => setIsSpeaking(false);
      setIsLoading(false);
    }
  );

  const { cancel, isSupported: ttsSupported } = useSpeechSynthesis({
    language,
    onStart: () => setIsSpeaking(true),
    onEnd: () => setIsSpeaking(false),
  });

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    console.log(scenario);

    const audio = new Audio(scenario.voice_path);
    audio.play().catch((err) => {
      console.warn("Autoplay blocked:", err);
    });
    setIsComplete(false);
  };

  const resetScenario = () => {
    setSelectedScenario(null);

    setIsComplete(false);
    cancel();
  };

  const handleMicClick = () => {
    if (isComplete) return;

    if (isListening || isRecording) {
      stopRecording();
      setIsListening(false);
    } else {
      if (isSpeaking) {
        cancel();
      }
      startRecording();
      setIsListening(true);
    }
  };

  const handleStopSpeaking = () => {
    cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
    }
  };

  if (!selectedScenario) {
    return (
      <div className="max-w-6xl mx-auto p-3 sm:p-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-2xl">
            <Users className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-pink-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Choose Your Adventure!
            </span>
            <div className="text-xl sm:text-2xl mt-2">🎭✨🎪</div>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto font-medium">
            🌟 Practice real conversations in different fun situations! 🌟
            <br className="hidden sm:block" />
            Each scenario helps you build confidence speaking English! 🚀
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => startScenario(scenario)}
              className="group bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-4 border-gray-200 hover:border-pink-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 text-yellow-300 animate-bounce">
                ⭐
              </div>
              <div className="absolute bottom-2 left-2 text-pink-300 animate-pulse">
                ✨
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl mb-3 animate-bounce">
                  {scenario.emoji}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {scenario.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {scenario.description}
                </p>
              </div>

              <div className="flex items-center justify-center mt-4 sm:mt-6">
                <button className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 sm:px-6 py-3 rounded-full font-bold group-hover:from-pink-600 group-hover:to-orange-600 transition-all transform group-hover:scale-105 shadow-lg">
                  <span className="text-sm sm:text-base">
                    🚀 Start Adventure
                  </span>
                  <ArrowRight className="w-4 h-4 animate-bounce" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-200 w-full h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl sm:text-4xl">
              {selectedScenario.emoji}
            </span>
            <h2 className="text-xl font-bold text-gray-800">
              🎪 {selectedScenario.title}
            </h2>
          </div>
          <button
            onClick={resetScenario}
            className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-full transition-transform hover:scale-110 shadow-md"
            title="Choose Different Scenario">
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Middle Text */}
        <p className="text-center text-gray-600 font-medium mb-4">
          {selectedScenario.script}
        </p>

        {/* Center: Visualizer + Status */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
          {isLoading ? (
            <div className="flex flex-col items-center text-purple-600 space-y-2">
              <Loader className="w-7 h-7 animate-spin" />
              <span className="text-sm font-medium">🤔 AI is thinking...</span>
            </div>
          ) : isListening || isRecording ? (
            <div className="flex flex-col items-center space-y-2">
              <AudioVisualizer isActive />
              <p className="text-red-600 font-semibold animate-pulse text-sm">
                🎙️ Listening...
              </p>
            </div>
          ) : isSpeaking ? (
            <div className="flex flex-col items-center space-y-2">
              <AudioVisualizer isActive />
              <p className="text-orange-600 font-semibold text-sm animate-pulse">
                🔊 AI is speaking...
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Tap the mic to start 🎤</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-8 mt-6">
          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            disabled={isLoading}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xl 
        ${
          isListening || isRecording
            ? "bg-gradient-to-r from-red-500 to-red-600 animate-pulse"
            : "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isListening || isRecording ? (
              <MicOff className="w-9 h-9 text-white" />
            ) : (
              <Mic className="w-9 h-9 text-white" />
            )}
          </button>

          {/* Speaker Button */}
          {ttsSupported && (
            <button
              onClick={handleStopSpeaking}
              disabled={!isSpeaking}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg
          ${
            isSpeaking
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}>
              {isSpeaking ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
