import React from 'react';
import { Check, Globe } from 'lucide-react';
import type { Language } from '../App';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageSelect: (language: Language) => void;
  onClose: () => void;
}

const languages: Array<{ code: Language; name: string; nativeName: string; flag: string }> = [
  { code: 'en-US', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' }
];

export function LanguageSelector({ selectedLanguage, onLanguageSelect, onClose }: LanguageSelectorProps) {
  return (
    <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-4 border-purple-200 z-50">
      <div className="p-4 border-b-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-purple-600 animate-spin" style={{ animationDuration: '3s' }} />
          <h3 className="font-bold text-gray-800">🌍 Choose Language</h3>
        </div>
        <p className="text-sm text-gray-700 mt-1 font-medium">
          ✨ Select your preferred language for AI responses
        </p>
      </div>
      
      <div className="p-2 max-h-64 overflow-y-auto bg-gradient-to-b from-white to-purple-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => onLanguageSelect(language.code)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all hover:bg-purple-50 transform hover:scale-105 ${
              selectedLanguage === language.code
                ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-md'
                : 'border-2 border-transparent hover:border-purple-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl animate-bounce" style={{ animationDelay: `${Math.random()}s` }}>{language.flag}</span>
              <div className="text-left">
                <div className="font-bold text-gray-800">{language.name}</div>
                <div className="text-sm text-gray-600 font-medium">{language.nativeName}</div>
              </div>
            </div>
            
            {selectedLanguage === language.code && (
              <Check className="w-5 h-5 text-purple-600 animate-bounce" />
            )}
          </button>
        ))}
      </div>
      
      <div className="p-3 border-t-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 rounded-b-2xl">
        <button
          onClick={onClose}
          className="w-full py-3 px-4 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 rounded-xl text-gray-700 font-bold transition-all transform hover:scale-105 shadow-md"
        >
          ✨ Close
        </button>
      </div>
    </div>
  );
}