import React from 'react';
import { SearchX, RotateCcw, Plus } from 'lucide-react';
import Button from '../common/Button';

export const EmptyState = ({
  title = 'Không tìm thấy tài nguyên',
  message = 'Không có tài nguyên nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm của bạn.',
  onResetFilters,
  onOpenCreateModal
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-[#121826]/40 border border-slate-800/80 my-8">
      {/* Visual icon badge */}
      <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
        <SearchX className="w-8 h-8 text-cyan-400/80 stroke-[1.5]" />
      </div>

      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onResetFilters && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onResetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Xóa bộ lọc
          </Button>
        )}

        {onOpenCreateModal && (
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Thêm tài nguyên mới
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
