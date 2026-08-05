"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────── */
export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id:       string;
  message:  string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

/* ─── Context ────────────────────────────────────────────────────────── */
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

/* ─── Provider ───────────────────────────────────────────────────────── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const toast = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = String(++counter.current);
    setToasts((t) => [...t, { id, message, variant }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast stack */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-4 right-4 z-[var(--z-toast)] flex flex-col gap-2 items-end"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ─── Individual toast ───────────────────────────────────────────────── */
const TOAST_CONFIG: Record<
  ToastVariant,
  { icon: typeof Info; bg: string; border: string; text: string }
> = {
  success: { icon: CheckCircle2, bg: "bg-[var(--color-success-bg)]",  border: "border-[var(--color-success-border)]",  text: "text-[var(--color-success-text)]"  },
  error:   { icon: AlertCircle,  bg: "bg-[var(--color-error-bg)]",    border: "border-[var(--color-error-border)]",    text: "text-[var(--color-error-text)]"    },
  warning: { icon: AlertCircle,  bg: "bg-[var(--color-warning-bg)]",  border: "border-[var(--color-warning-border)]",  text: "text-[var(--color-warning-text)]"  },
  info:    { icon: Info,         bg: "bg-[var(--color-info-bg)]",      border: "border-[var(--color-info-border)]",     text: "text-[var(--color-info-text)]"     },
};

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const config = TOAST_CONFIG[item.variant ?? "info"];
  const Icon   = config.icon;

  return (
    <div
      role="alert"
      className={[
        "flex items-start gap-3 px-4 py-3 rounded-[var(--radius-lg)] border shadow-[var(--shadow-md)]",
        "min-w-[280px] max-w-[360px] animate-in slide-in-from-right-2 fade-in duration-200",
        config.bg, config.border,
      ].join(" ")}
    >
      <Icon size={16} className={["mt-0.5 shrink-0", config.text].join(" ")} />
      <p className={["type-small flex-1", config.text].join(" ")}>{item.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className={["shrink-0 hover:opacity-70 transition-opacity", config.text].join(" ")}
      >
        <X size={14} />
      </button>
    </div>
  );
}
