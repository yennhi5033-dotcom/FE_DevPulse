import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-[#121826]/75 border border-slate-800/80 p-5 space-y-4 animate-pulse">
      {/* Top Badge & Options */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 bg-slate-800 rounded-full"></div>
        <div className="h-4 w-4 bg-slate-800 rounded"></div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-slate-800 rounded-lg"></div>
        <div className="h-3 w-full bg-slate-800/60 rounded"></div>
        <div className="h-3 w-4/5 bg-slate-800/60 rounded"></div>
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        <div className="h-4 w-12 bg-slate-800 rounded"></div>
        <div className="h-4 w-16 bg-slate-800 rounded"></div>
        <div className="h-4 w-10 bg-slate-800 rounded"></div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
        <div className="h-7 w-16 bg-slate-800 rounded-xl"></div>
        <div className="h-7 w-20 bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
