import React, { useEffect, useRef } from 'react';
import { Search, Plus, Bookmark, Command, X } from 'lucide-react';
import DevPulseLogo from '../common/DevPulseLogo';
import Button from '../common/Button';

export const Navbar = ({
  onOpenCreateModal,
  searchQuery = '',
  onSearchChange
}) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <DevPulseLogo />

          {/* Navigation links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#explore"
              className="px-3 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-950/40 rounded-lg border border-cyan-500/20"
            >
              Explore
            </a>
            <a
              href="#popular"
              className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              Popular
            </a>
          </nav>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Search resources, tags, frameworks..."
              className="w-full pl-10 pr-16 py-2 bg-slate-900/90 text-sm text-slate-200 placeholder-slate-500 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-800 rounded border border-slate-700">
                  <Command className="w-3 h-3" /> K
                </kbd>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={onOpenCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            <span className="hidden sm:inline">Add Resource</span>
            <span className="sm:hidden">Add</span>
          </Button>

          <button
            title="Saved bookmarks"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* User Profile Avatar */}
          <div className="relative flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] cursor-pointer">
              <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
