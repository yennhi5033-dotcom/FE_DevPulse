import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, Tag, Grid, List } from 'lucide-react';

export const FilterToolbar = ({
  searchQuery = '',
  onSearchChange,
  activeTag = '',
  onSelectTag,
  sortBy = 'newest',
  onSortChange,
  totalResults = 24
}) => {
  const POPULAR_TAGS = ['react', 'nextjs', 'tailwind', 'nodejs', 'docker', 'ai', 'typescript', 'api'];

  return (
    <div className="flex flex-col gap-4">
      {/* Upper row: Search bar + Sort selector + Layout toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Tìm kiếm theo tiêu đề, nội dung tóm tắt..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 text-sm text-slate-200 placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange && onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Controls: Sort & Filter */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
            >
              <option value="newest" className="bg-slate-900 text-slate-200">Newest</option>
              <option value="most_upvoted" className="bg-slate-900 text-slate-200">Most Upvoted</option>
              <option value="oldest" className="bg-slate-900 text-slate-200">Oldest</option>
            </select>
          </div>

          {/* Results count badge */}
          <div className="px-3 py-2 bg-slate-900/40 border border-slate-800/80 rounded-xl text-xs text-slate-400 font-mono">
            <span>{totalResults} items</span>
          </div>
        </div>

      </div>

      {/* Lower row: Quick Tag Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-medium shrink-0">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span>Tags:</span>
        </div>

        {POPULAR_TAGS.map((tag) => {
          const isSelected = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag && onSelectTag(isSelected ? '' : tag)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
            >
              #{tag}
            </button>
          );
        })}

        {activeTag && (
          <button
            onClick={() => onSelectTag && onSelectTag('')}
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-rose-400 hover:text-rose-300 ml-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Clear tag</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default FilterToolbar;
