import React from 'react';

const CATEGORY_STYLES = {
  Frontend: {
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dot: 'bg-blue-400',
  },
  Backend: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  DevOps: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dot: 'bg-amber-400',
  },
  AI: {
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dot: 'bg-purple-400',
  },
  Mobile: {
    badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    dot: 'bg-teal-400',
  },
  'UI/UX': {
    badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    dot: 'bg-pink-400',
  },
  default: {
    badge: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    dot: 'bg-slate-400',
  }
};

export const Badge = ({ category = 'Frontend', showDot = true, className = '' }) => {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.badge} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
      {category}
    </span>
  );
};

export default Badge;
