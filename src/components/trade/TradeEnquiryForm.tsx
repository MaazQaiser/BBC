"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { TextField } from "@/components/forms/TextField";
import type { TradeSession } from "@/lib/trade-session";

interface FieldErrors {
  contactName?: string;
  phone?:       string;
  email?:       string;
}

export interface TradeEnquiryFormProps {
  vehicleId:      string;
  vehicleTitle:   string;
  registration:   string;
  tradeSession:   TradeSession;
}

export function TradeEnquiryForm({
  vehicleId,
  vehicleTitle,
  registration,
  tradeSession,
}: TradeEnquiryFormProps) {
  const [contactName, setContactName] = useState("");
  const [phone, setPhone]             = useState("");
  const [email, setEmail]             = useState("");
  const [message, setMessage]         = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError]     = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);
  const [submitted, setSubmitted]     = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!contactName.trim()) errors.contactName = "Contact name is required.";
    if (!phone.trim())       errors.phone = "Phone number is required.";
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("/api/trade/enquiry", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          vehicleId,
          contactName,
          phone,
          email,
          message,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setFormError(data.error ?? "Failed to send enquiry. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("Failed to send enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface-2)] border border-[var(--color-border)]">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={22} className="shrink-0 text-[var(--color-accent)] mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="type-h4 text-[var(--color-text)] mb-2">Enquiry sent</h2>
            <p className="type-small text-[var(--color-text-muted)]">
              Your trade enquiry for{" "}
              <strong className="text-[var(--color-text)]">{vehicleTitle}</strong>{" "}
              ({registration}) has been submitted. We&apos;ll be in touch shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <TextField
        label="Business Name"
        value={tradeSession.businessName}
        readOnly
        disabled
      />

      <TextField
        label="Company Number"
        value={tradeSession.companyNumber}
        readOnly
        disabled
      />

      <TextField
        label="Contact Name"
        value={contactName}
        onChange={(e) => {
          setContactName(e.target.value);
          if (fieldErrors.contactName) {
            setFieldErrors((prev) => ({ ...prev, contactName: undefined }));
          }
        }}
        error={fieldErrors.contactName}
        autoComplete="name"
      />

      <TextField
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          if (fieldErrors.phone) {
            setFieldErrors((prev) => ({ ...prev, phone: undefined }));
          }
        }}
        error={fieldErrors.phone}
        autoComplete="tel"
      />

      <TextField
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldErrors.email) {
            setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }
        }}
        error={fieldErrors.email}
        autoComplete="email"
      />

      <div>
        <label htmlFor="trade-message" className="block type-small font-medium text-[var(--color-text)] mb-1.5">
          Message
        </label>
        <textarea
          id="trade-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Any questions or notes about this vehicle…"
          className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-y min-h-[100px]"
        />
      </div>

      {formError && (
        <p className="type-small text-[var(--color-error)]" role="alert">{formError}</p>
      )}

      <Button type="submit" loading={loading} leftIcon={<Send size={16} />}>
        Send Enquiry
      </Button>
    </form>
  );
}
