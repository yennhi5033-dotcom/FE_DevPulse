import React from 'react';
import { Sparkles, Layers, Flame, ArrowUpRight } from 'lucide-react';

export const HeroBanner = ({ onOpenCreateModal }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-slate-800/60">
      {/* Background radial aura glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/15 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Left: Headline & Description */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Curated developer workspace</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Bookmark & Discover{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                World-Class Dev Tools
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Thư viện tài nguyên tập trung giúp developer tìm kiếm, phân loại, đánh giá và bookmark tài liệu lập trình hiện đại.
            </p>
          </div>

          {/* Right: Quick stats badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono">60+</div>
                <div className="text-[11px] text-slate-400">Tài nguyên đã lưu</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono">1.4k</div>
                <div className="text-[11px] text-slate-400">Lượt Upvotes</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
