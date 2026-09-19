import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        left: '20px',
        right: '20px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none'
      }}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            background: toast.type === 'success' ? 'rgba(21, 128, 61, 0.95)' : toast.type === 'error' ? 'rgba(185, 28, 28, 0.95)' : 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            padding: '12px 16px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 32px rgba(0,0,0,0.22)',
            fontSize: '13.5px',
            fontWeight: 600,
            animation: 'toastDropSpring 0.38s cubic-bezier(0.16, 1, 0.3, 1) both',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {toast.type === 'success' && <CheckCircle2 size={17} />}
            {toast.type === 'error' && <AlertCircle size={17} />}
            {toast.type === 'info' && <Info size={17} />}
            <span>{toast.text}</span>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            style={{ color: 'rgba(255,255,255,0.7)', display: 'flex' }}
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};
