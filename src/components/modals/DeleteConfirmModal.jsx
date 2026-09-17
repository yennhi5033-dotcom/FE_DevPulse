import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import Button from '../common/Button';

export const DeleteConfirmModal = ({
  isOpen = false,
  onClose,
  onConfirm,
  resourceTitle = 'React Documentation',
  isLoading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0f1422] border border-rose-500/20 shadow-2xl p-6 text-center animate-scaleUp">
        
        {/* Warning Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2">
          Xác nhận xóa tài nguyên?
        </h3>

        {/* Message */}
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Bạn có chắc chắn muốn xóa tài nguyên{' '}
          <span className="font-semibold text-slate-200">"{resourceTitle}"</span>?
          Hành động này không thể hoàn tác.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Hủy bỏ
          </Button>

          <Button
            variant="destructive"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            leftIcon={<Trash2 className="w-4 h-4" />}
            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg shadow-rose-600/20"
          >
            Xóa vĩnh viễn
          </Button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
