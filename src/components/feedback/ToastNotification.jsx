import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const TOAST_TYPES = {
  success: {
    icon: CheckCircle2,
    wrapper: 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200',
    iconColor: 'text-emerald-400'
  },
  error: {
    icon: AlertCircle,
    wrapper: 'bg-rose-950/90 border-rose-500/30 text-rose-200',
    iconColor: 'text-rose-400'
  },
  warning: {
    icon: AlertTriangle,
    wrapper: 'bg-amber-950/90 border-amber-500/30 text-amber-200',
    iconColor: 'text-amber-400'
  },
  info: {
    icon: Info,
    wrapper: 'bg-cyan-950/90 border-cyan-500/30 text-cyan-200',
    iconColor: 'text-cyan-400'
  }
};

export const ToastNotification = ({
  type = 'success',
  title = 'Thành công',
  message = 'Đã thực hiện thao tác thành công.',
  onClose
}) => {
  const currentType = TOAST_TYPES[type] || TOAST_TYPES.info;
  const Icon = currentType.icon;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 max-w-sm p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-slideUp ${currentType.wrapper}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${currentType.iconColor}`} />
      
      <div className="flex-1">
        <h4 className="text-xs font-bold text-white mb-0.5">{title}</h4>
        <p className="text-[11px] opacity-90 leading-tight">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default ToastNotification;
