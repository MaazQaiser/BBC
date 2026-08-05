"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "@/components/buttons/IconButton";

export interface BottomSheetProps {
  open:      boolean;
  onClose:   () => void;
  title?:    string;
  children:  ReactNode;
  footer?:   ReactNode;
}

/**
 * Mobile-optimised bottom sheet.
 * Slides up from the bottom of the viewport.
 * Used for mobile filters, vehicle action menus, etc.
 */
export function BottomSheet({ open, onClose, title, children, footer }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)]"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className={[
          "absolute inset-x-0 bottom-0 z-10",
          "rounded-t-[var(--radius-xl)] bg-[var(--color-surface)]",
          "shadow-[var(--shadow-modal)]",
          "flex flex-col max-h-[92vh]",
          "animate-in slide-in-from-bottom-4 duration-300",
        ].join(" ")}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 rounded-full bg-[var(--color-border-strong)]" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-base text-[var(--color-text)]">{title}</h2>
            <IconButton
              icon={<X size={18} />}
              onClick={onClose}
              aria-label="Close"
              variant="ghost"
              size="sm"
            />
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-5 py-4 border-t border-[var(--color-border)]">{footer}</div>
        )}
      </div>
    </div>
  );
}
