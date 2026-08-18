"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { TextField } from "@/components/forms/TextField";

interface FieldErrors {
  contactName?:  string;
  companyName?:  string;
  phone?:        string;
  email?:        string;
  offerAmount?:  string;
}

export interface TradeOfferFormProps {
  vehicleId:      string;
  vehicleTitle:   string;
  registration:   string;
  askingPrice:    number;
}

export function TradeOfferForm({
  vehicleId,
  vehicleTitle,
  registration,
  askingPrice,
}: TradeOfferFormProps) {
  const [contactName, setContactName]   = useState("");
  const [companyName, setCompanyName]   = useState("");
  const [phone, setPhone]               = useState("");
  const [email, setEmail]               = useState("");
  const [offerAmount, setOfferAmount]   = useState("");
  const [message, setMessage]           = useState("");
  const [fieldErrors, setFieldErrors]   = useState<FieldErrors>({});
  const [formError, setFormError]       = useState<string | null>(null);
  const [loading, setLoading]           = useState(false);
  const [submitted, setSubmitted]       = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!contactName.trim()) errors.contactName = "Name is required.";
    if (!companyName.trim()) errors.companyName = "Company name is required.";
    if (!phone.trim())       errors.phone = "Mobile number is required.";
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    const amount = Number(offerAmount.replace(/[,£\s]/g, ""));
    if (!offerAmount.trim()) {
      errors.offerAmount = "Offer amount is required.";
    } else if (!Number.isFinite(amount) || amount <= 0) {
      errors.offerAmount = "Enter a valid offer amount.";
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const amount = Number(offerAmount.replace(/[,£\s]/g, ""));

    setLoading(true);
    try {
      const response = await fetch("/api/trade/enquiry", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          vehicleId,
          contactName,
          companyName,
          phone,
          email,
          offerAmount: amount,
          message,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setFormError(data.error ?? "Failed to send offer. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("Failed to send offer. Please try again.");
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
            <h2 className="type-h4 text-[var(--color-text)] mb-2">Offer sent</h2>
            <p className="type-small text-[var(--color-text-muted)] leading-relaxed mb-4">
              Thanks — we&apos;ll review your offer on{" "}
              <strong className="text-[var(--color-text)]">{vehicleTitle}</strong>{" "}
              ({registration}). Proof of motor trade status is required before purchase.
            </p>
            <Link
              href="/trade/verify"
              className="type-small font-medium text-[var(--color-accent)] hover:underline"
            >
              Read what we accept as trade verification →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="type-small text-[var(--color-text-muted)]">
        Asking price{" "}
        <span className="num font-semibold text-[var(--color-text)]">
          £{askingPrice.toLocaleString("en-GB")}
        </span>
      </p>

      <TextField
        label="Name"
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
        label="Company name"
        value={companyName}
        onChange={(e) => {
          setCompanyName(e.target.value);
          if (fieldErrors.companyName) {
            setFieldErrors((prev) => ({ ...prev, companyName: undefined }));
          }
        }}
        error={fieldErrors.companyName}
        autoComplete="organization"
      />

      <TextField
        label="Mobile"
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
        label="Email"
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

      <TextField
        label="Offer amount (£)"
        inputMode="decimal"
        value={offerAmount}
        onChange={(e) => {
          setOfferAmount(e.target.value);
          if (fieldErrors.offerAmount) {
            setFieldErrors((prev) => ({ ...prev, offerAmount: undefined }));
          }
        }}
        error={fieldErrors.offerAmount}
        placeholder="e.g. 2500"
      />

      <div>
        <label htmlFor="trade-message" className="block type-small font-medium text-[var(--color-text)] mb-1.5">
          Message <span className="text-[var(--color-text-faint)] font-normal">(optional)</span>
        </label>
        <textarea
          id="trade-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Collection notes or questions about this vehicle…"
          className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-y min-h-[100px]"
        />
      </div>

      {formError && (
        <p className="type-small text-[var(--color-error)]" role="alert">{formError}</p>
      )}

      <Button type="submit" loading={loading} leftIcon={<Send size={16} />}>
        Submit offer
      </Button>
    </form>
  );
}
