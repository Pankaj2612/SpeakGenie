import React from 'react';
import { Bot, User, Heart, Star } from 'lucide-react';

export interface ChatMessageType {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emoji?: string;
}

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex items-start space-x-2 sm:space-x-3 ${isAI ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
      {isAI && (
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce">
          {message.emoji ? (
            <span className="text-sm sm:text-base">{message.emoji}</span>
          ) : (
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </div>
      )}
      
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md px-3 sm:px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all ${
          isAI
            ? 'bg-white border-2 border-purple-200 text-gray-800 shadow-purple-100'
            : 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-purple-300'
        }`}
      >
        <p className="text-sm sm:text-base leading-relaxed font-medium">{message.text}</p>
        <div className="flex items-center justify-between mt-2">
          <p className={`text-xs ${isAI ? 'text-gray-400' : 'text-purple-100'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          {isAI && (
            <div className="flex space-x-1">
              <Heart className="w-3 h-3 text-pink-400 animate-pulse" />
              <Star className="w-3 h-3 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          )}
        </div>
      </div>
      
      {!isAI && (
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
      )}
    </div>
  );
}