
import React, { useState, useEffect } from 'react';

const TerminalLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines = [
    "Initializing system...",
    "Loading kernel modules...",
    "Mounting filesystems...",
    "Starting network services...",
    "Loading PowerTools™ interface...",
    "Establishing secure connection...",
    "Connection established to plentifulpower.xyz",
    "Welcome to Power Tools",
  ];

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsComplete(true);
          onComplete();
        }, 1000);
      }
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-black z-50 font-mono p-4 transition-opacity duration-1000 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-3xl mx-auto">
        {lines.map((line, index) => (
          <div key={index} className="text-green-500 mb-1 animate-fade-in">
            <span className="text-blue-400">root@plentifulpower:~$</span> {line}
          </div>
        ))}
        {!isComplete && (
          <div className="text-green-500 animate-pulse">▮</div>
        )}
      </div>
    </div>
  );
};

export default TerminalLoader;
