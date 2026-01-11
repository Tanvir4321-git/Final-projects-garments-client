import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        {/* Geometric animated loader */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-lg bg-blue-500 animate-spin" 
               style={{ animationDuration: '3s' }}>
          </div>
          <div className="absolute inset-2 rounded-lg bg-gray-900"></div>
          <div className="absolute inset-0 rounded-lg bg-purple-500 animate-spin" 
               style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
          </div>
          <div className="absolute inset-4 rounded-lg bg-gray-900"></div>
        </div>
        
        {/* Loading bars */}
        <div className="flex justify-center space-x-2 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-blue-400"
              style={{
                height: '40px',
                animation: 'wave 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
        
        <style>{`
          @keyframes wave {
            0%, 100% { height: 40px; opacity: 0.4; }
            50% { height: 60px; opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loading;