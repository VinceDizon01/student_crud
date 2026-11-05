import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function AlertBanner({ alert, onDismiss }) {
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert, onDismiss]);

  if (!alert) return null;

  const isSuccess = alert.type === 'success';
  const isError = alert.type === 'error';

  const bgColor = isSuccess
    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
    : isError
    ? 'bg-rose-50 border-rose-200 text-rose-800'
    : 'bg-blue-50 border-blue-200 text-blue-800';

  const Icon = isSuccess ? CheckCircle2 : isError ? AlertCircle : Info;
  const iconColor = isSuccess ? 'text-emerald-500' : isError ? 'text-rose-500' : 'text-blue-500';

  return (
    <div className={`p-4 rounded-xl border flex items-start justify-between shadow-sm transition-all duration-200 ${bgColor}`}>
      <div className="flex items-center space-x-3">
        <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
        <p className="text-sm font-medium">{alert.message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 rounded-lg hover:bg-black/5 transition"
        aria-label="Dismiss alert"
      >
        <X className="w-4 h-4 opacity-70 hover:opacity-100" />
      </button>
    </div>
  );
}
