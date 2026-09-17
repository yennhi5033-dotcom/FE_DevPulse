import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ExternalLink, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Copy, 
  Check 
} from 'lucide-react';
import Badge from '../common/Badge';

export const ResourceCard = ({
  resource,
  onEdit,
  onDelete,
  onUpvote
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(resource?.upvotes || 0);

  useEffect(() => {
    setUpvoteCount(resource?.upvotes || 0);
  }, [resource?.upvotes]);

  const handleCopyLink = () => {
    if (resource?.url) {
      navigator.clipboard.writeText(resource.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setIsMenuOpen(false);
  };

  const handleVote = () => {
    setUpvoteCount(prev => prev + 1);
    setIsUpvoted(true);
    if (onUpvote && resource?._id) {
      onUpvote(resource._id);
    }
  };

  if (!resource) return null;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#121826]/75 hover:bg-[#161e30] border border-slate-800/80 hover:border-cyan-500/30 p-5 transition-all duration-300 shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-0.5">
      
      {/* Top row: Category Badge + Options Menu */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <Badge category={resource.category} />

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Action Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1 z-20 text-xs text-slate-300">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onEdit) onEdit(resource);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800/80 hover:text-cyan-300 text-left cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh sửa</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800/80 text-left cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã copy link' : 'Sao chép link'}</span>
              </button>

              <div className="my-1 border-t border-slate-800" />

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onDelete) onDelete(resource);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:bg-rose-500/10 text-left cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title & Link */}
      <div className="mb-2">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 flex items-center gap-1.5"
        >
          <span>{resource.title}</span>
        </a>
      </div>

      {/* Summary */}
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 flex-1">
        {resource.summary || 'Không có mô tả chi tiết cho tài nguyên này.'}
      </p>

      {/* Tags list */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        {resource.tags && resource.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-400 border border-slate-800/80"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Card Footer: Upvote + External Visit */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 gap-2">
        {/* Upvote button */}
        <button
          onClick={handleVote}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all duration-200 border cursor-pointer ${
            isUpvoted
              ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 scale-105'
              : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowUp className={`w-3.5 h-3.5 ${isUpvoted ? 'text-cyan-400 stroke-[2.5]' : ''}`} />
          <span>{upvoteCount}</span>
        </button>

        {/* Visit link button */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-colors"
        >
          <span>Truy cập</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};

export default ResourceCard;
