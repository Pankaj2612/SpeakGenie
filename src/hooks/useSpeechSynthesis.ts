import { useCallback, useRef } from 'react';
import type { Language } from '../App';

interface UseSpeechSynthesisOptions {
  language: Language;
  onStart?: () => void;
  onEnd?: () => void;
}

interface UseSpeechSynthesisReturn {
  speak: (text: string) => void;
  cancel: () => void;
  isSupported: boolean;
}

export function useSpeechSynthesis({
  language,
  onStart,
  onEnd
}: UseSpeechSynthesisOptions): UseSpeechSynthesisReturn {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSupported = 'speechSynthesis' in window;

  const speak = useCallback((text: string) => {
    if (!isSupported || !text.trim()) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set language and voice
    utterance.lang = language;
    
    // Try to find a voice for the language
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language.split('-')[0])) || 
                  voices.find(v => v.lang === 'en-US') ||
                  voices[0];
    
    if (voice) {
      utterance.voice = voice;
    }

    // Set speech parameters
    utterance.rate = 0.9; // Slightly slower for children
    utterance.pitch = 1.1; // Slightly higher pitch for friendliness
    utterance.volume = 1;

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
      utteranceRef.current = null;
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      onEnd?.();
      utteranceRef.current = null;
    };

    speechSynthesis.speak(utterance);
  }, [language, onStart, onEnd, isSupported]);

  const cancel = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
      onEnd?.();
    }
  }, [onEnd, isSupported]);

  return {
    speak,
    cancel,
    isSupported
  };
}