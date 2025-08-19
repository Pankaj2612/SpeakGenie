import React, { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
}

export function AudioVisualizer({ isActive }: AudioVisualizerProps) {
  const [bars, setBars] = useState<number[]>(new Array(16).fill(0));

  useEffect(() => {
    if (!isActive) {
      setBars(new Array(16).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => 
        prev.map(() => Math.random() * 100)
      );
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex items-end justify-center space-x-1 h-10 sm:h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 shadow-inner">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-gradient-to-t from-purple-500 via-pink-500 to-orange-500 rounded-full transition-all duration-150 ease-out shadow-sm"
          style={{
            height: isActive ? `${Math.max(height * 0.8, 15)}%` : '15%',
            width: '3px'
          }}
        />
      ))}
    </div>
  );
}