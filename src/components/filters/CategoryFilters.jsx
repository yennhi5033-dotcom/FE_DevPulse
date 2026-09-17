import React from 'react';
import { 
  Globe, 
  Server, 
  Cloud, 
  Brain, 
  Smartphone, 
  Palette,
  Sparkles
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'All', label: 'All', icon: Sparkles, count: 64 },
  { id: 'Frontend', label: 'Frontend', icon: Globe, count: 24, color: 'text-blue-400' },
  { id: 'Backend', label: 'Backend', icon: Server, count: 18, color: 'text-emerald-400' },
  { id: 'DevOps', label: 'DevOps', icon: Cloud, count: 9, color: 'text-amber-400' },
  { id: 'AI', label: 'AI & ML', icon: Brain, count: 12, color: 'text-purple-400' },
  { id: 'Mobile', label: 'Mobile', icon: Smartphone, count: 7, color: 'text-teal-400' },
  { id: 'UI/UX', label: 'UI / UX', icon: Palette, count: 14, color: 'text-pink-400' }
];

export const CategoryFilters = ({ activeCategory = 'All', onSelectCategory }) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : cat.color || 'text-slate-400'}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-cyan-950 text-cyan-200' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilters;
