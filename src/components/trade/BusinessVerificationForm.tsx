"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { TextField } from "@/components/forms/TextField";

interface FieldErrors {
  businessName?:  string;
  companyNumber?: string;
  confirmed?:     string;
}

export function BusinessVerificationForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const nextPath     = searchParams.get("next") ?? "/trade/listing";

  const [businessName, setBusinessName]   = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [confirmed, setConfirmed]         = useState(false);
  const [fieldErrors, setFieldErrors]     = useState<FieldErrors>({});
  const [formError, setFormError]         = useState<string | null>(null);
  const [loading, setLoading]             = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!businessName.trim()) {
      errors.businessName = "Business name is required.";
    }
    if (!companyNumber.trim()) {
      errors.companyNumber = "Company number or VAT number is required.";
    }
    if (!confirmed) {
      errors.confirmed = "You must confirm you are purchasing in the course of a business.";
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
      const response = await fetch("/api/trade/gate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ businessName, companyNumber, confirmed }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.push(nextPath);
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <TextField
        label="Business Name"
        value={businessName}
        onChange={(e) => {
          setBusinessName(e.target.value);
          if (fieldErrors.businessName) {
            setFieldErrors((prev) => ({ ...prev, businessName: undefined }));
          }
        }}
        onBlur={() => {
          if (!businessName.trim()) {
            setFieldErrors((prev) => ({ ...prev, businessName: "Business name is required." }));
          }
        }}
        placeholder="Your business name"
        autoComplete="organization"
        error={fieldErrors.businessName}
      />

      <TextField
        label="Company Number or VAT Number"
        value={companyNumber}
        onChange={(e) => {
          setCompanyNumber(e.target.value);
          if (fieldErrors.companyNumber) {
            setFieldErrors((prev) => ({ ...prev, companyNumber: undefined }));
          }
        }}
        onBlur={() => {
          if (!companyNumber.trim()) {
            setFieldErrors((prev) => ({
              ...prev,
              companyNumber: "Company number or VAT number is required.",
            }));
          }
        }}
        placeholder="e.g. 12345678 or GB123456789"
        error={fieldErrors.companyNumber}
      />

      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => {
              setConfirmed(e.target.checked);
              if (fieldErrors.confirmed) {
                setFieldErrors((prev) => ({ ...prev, confirmed: undefined }));
              }
            }}
            className="mt-1 w-4 h-4 rounded border-[var(--color-border-strong)] text-[var(--color-accent)] focus:ring-[var(--color-focus-ring)]"
          />
          <span className="type-small text-[var(--color-text)] group-hover:text-[var(--color-text-muted)] transition-colors">
            I confirm I am purchasing this vehicle in the course of a business.
          </span>
        </label>
        {fieldErrors.confirmed && (
          <p className="mt-1.5 type-caption text-[var(--color-error)]">{fieldErrors.confirmed}</p>
        )}
      </div>

      {formError && (
        <p className="type-small text-[var(--color-error)]" role="alert">{formError}</p>
      )}

      <Button type="submit" fullWidth loading={loading} rightIcon={<ArrowRight size={16} />}>
        Continue
      </Button>
    </form>
  );
}
