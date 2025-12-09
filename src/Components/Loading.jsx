import React, { useEffect, useRef } from 'react';

const Loading = () => {
    
         const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    const text = el.textContent;
    el.textContent = "";

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.textContent = text[i];
      
      span.style.animationDelay = `${i * 0.15}s`;
      span.className = "inline-block animate-fall";
      el.appendChild(span);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <h1
        ref={textRef}
        className="text-5xl font-bold text-primary tracking-wide select-none"
      >
        Loading.....
      </h1>

      {/* Animation style */}
      <style>
        {`
          @keyframes fall {
            0% {
              opacity: 0;
              transform: translateY(-100px) scale(1.2) rotateX(70deg);
            }
            60% {
              opacity: 1;
              transform: translateY(10px) scale(1) rotateX(0deg);
            }
            80% {
              transform: translateY(-5px);
            }
            100% {
              transform: translateY(0);
            }
          }

          .animate-fall {
            animation: fall 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;