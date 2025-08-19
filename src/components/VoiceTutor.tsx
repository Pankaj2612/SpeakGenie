import React, { useState, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { useAudioRecorder } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import type { Language } from "../App";

interface VoiceTutorProps {
  language: Language;
  onBack: () => void;
}

export function VoiceTutor({ language }: VoiceTutorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "voice.webm");
      formData.append("lang", language);

      setIsLoading(true);

      const res = await fetch(import.meta.env.VITE_BASE_URL + "/stt", {
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

  const handleMicClick = () => {
    if (isListening || isRecording) {
      stopRecording();
      setIsListening(false);
    } else {
      if (isSpeaking) cancel();
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

  return (
    <div className="max-w-2xl mx-auto p-4 h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-purple-200 w-full h-full flex flex-col items-center justify-between p-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">AI Voice Tutor 🤖</h2>
          <p className="text-sm text-gray-600 font-medium">
            Talk with me in real time 🎤✨
          </p>
        </div>

        {/* Center: Visualizers */}
        <div className="flex-1 flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center space-x-3 text-purple-600">
              <Loader className="w-6 h-6 animate-spin" />
              <span className="text-sm font-medium">🤔 AI is thinking...</span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
          ) : isListening || isRecording ? (
            <div className="flex flex-col items-center space-y-2">
              <AudioVisualizer isActive />
              <p className="text-red-600 font-bold animate-pulse text-sm">
                🎙️ Listening...
              </p>
            </div>
          ) : isSpeaking ? (
            <div className="flex flex-col items-center space-y-2">
              {/* 🎧 AI Voice Indicator */}
              <AudioVisualizer isActive />
              <p className="text-orange-600 font-bold text-sm">
                🔊 AI is speaking...
              </p>
            </div>
          ) : null}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6">
          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            disabled={isLoading}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-xl ${
              isListening || isRecording
                ? "bg-gradient-to-r from-red-500 to-red-600 animate-pulse"
                : "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-bounce"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isListening || isRecording ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>

          {/* Speaker Control */}
          {ttsSupported && (
            <button
              onClick={handleStopSpeaking}
              disabled={!isSpeaking}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg ${
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
