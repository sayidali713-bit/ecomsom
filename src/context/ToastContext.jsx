import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);
let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
    }, duration);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, onRemove }) => {
  if (!toasts.length) return null;
  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const typeConfig = {
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: '✓',
    iconBg: 'bg-emerald-500',
    text: 'text-emerald-800',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: '✕',
    iconBg: 'bg-red-500',
    text: 'text-red-800',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '!',
    iconBg: 'bg-amber-500',
    text: 'text-amber-800',
  },
  info: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    icon: 'i',
    iconBg: 'bg-indigo-500',
    text: 'text-indigo-800',
  },
};

const Toast = ({ toast, onRemove }) => {
  const cfg = typeConfig[toast.type] || typeConfig.success;
  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[280px] max-w-sm ${cfg.bg} ${cfg.border} ${toast.exiting ? 'toast-exit' : 'toast-enter'}`}
    >
      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${cfg.iconBg}`}>
        {cfg.icon}
      </span>
      <p className={`flex-1 text-sm font-medium ${cfg.text}`}>{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className={`flex-shrink-0 p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity ${cfg.text}`}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
