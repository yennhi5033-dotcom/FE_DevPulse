import React from 'react';

export const DevPulseLogo = ({ className = "w-9 h-9", showText = true }) => {
  return (
    <div className="flex items-center gap-3 select-none cursor-pointer">
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="devpulse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="48" height="48" rx="12" fill="#0d1117" stroke="#1f293d" strokeWidth="1.5" />
          <path
            d="M10 24H16L20 14L28 34L32 24H38"
            stroke="url(#devpulse-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <circle cx="20" cy="14" r="2" fill="#00f2fe" />
          <circle cx="28" cy="34" r="2" fill="#a855f7" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              DevPulse
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              v1.0
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium tracking-wide">
            Developer Resource Hub
          </span>
        </div>
      )}
    </div>
  );
};

export default DevPulseLogo;
