import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHospital();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getStyles = () => {
          switch (toast.type) {
            case 'success':
              return {
                icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
                border: 'border-emerald-500/40 bg-navy-900/90 text-emerald-200'
              };
            case 'warning':
              return {
                icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
                border: 'border-amber-500/40 bg-navy-900/90 text-amber-200'
              };
            case 'error':
              return {
                icon: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
                border: 'border-rose-500/40 bg-navy-900/90 text-rose-200'
              };
            case 'info':
            default:
              return {
                icon: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
                border: 'border-cyan-500/40 bg-navy-900/90 text-cyan-200'
              };
          }
        };

        const style = getStyles();

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 ${style.border}`}
          >
            <div className="flex items-center space-x-3">
              {style.icon}
              <span className="text-sm font-medium text-slate-100">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
