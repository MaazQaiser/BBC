"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
  const [submitted, setSubmitted]         = useState(false);

  const canContinue = useMemo(
    () =>
      businessName.trim().length > 0 &&
      companyNumber.trim().length > 0 &&
      confirmed,
    [businessName, companyNumber, confirmed],
  );

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!businessName.trim()) {
      errors.businessName = "Business name is required.";
    }
    if (!companyNumber.trim()) {
      errors.companyNumber = "Company number or VAT number is required.";
    }
    if (!confirmed) {
      errors.confirmed =
        "You must confirm that you are buying in the course of a business.";
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

      setSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div>
        <p className="type-label text-[var(--color-text-muted)] mb-2">
          Trade Clearance
        </p>
        <div className="flex items-start gap-3 mb-4">
          <CheckCircle2
            size={22}
            className="shrink-0 text-[var(--color-accent)] mt-1"
            aria-hidden="true"
          />
          <h1 className="type-h2 text-[var(--color-text)]">
            Business details recorded
          </h1>
        </div>
        <p className="type-body text-[var(--color-text-muted)] mb-8 leading-relaxed">
          Your business details have been recorded. We still require proof of
          motor trade status before purchase. You can keep browsing trade clearance
          in the meantime.
        </p>

        <dl className="border-t border-[var(--color-border)] mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 py-3 border-b border-[var(--color-border)]">
            <dt className="type-small text-[var(--color-text-muted)]">Business</dt>
            <dd className="type-small font-medium text-[var(--color-text)]">
              {businessName.trim()}
            </dd>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 py-3 border-b border-[var(--color-border)]">
            <dt className="type-small text-[var(--color-text-muted)]">
              Company / VAT
            </dt>
            <dd className="type-small num font-medium text-[var(--color-text)]">
              {companyNumber.trim()}
            </dd>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 py-3 border-b border-[var(--color-border)]">
            <dt className="type-small text-[var(--color-text-muted)]">Status</dt>
            <dd className="type-small text-[var(--color-text)]">
              Buying in the course of a business
            </dd>
          </div>
        </dl>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            fullWidth
            onClick={() => router.push(nextPath)}
            rightIcon={<ArrowRight size={16} />}
            className="sm:flex-1"
          >
            View trade clearance
          </Button>
          <Link
            href="/search"
            className={[
              "inline-flex items-center justify-center h-12 px-5 rounded-[var(--radius-md)]",
              "border border-[var(--color-border-strong)] bg-[var(--color-surface)]",
              "type-small font-medium text-[var(--color-text)] text-center",
              "hover:bg-[var(--color-hover)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
              "sm:flex-1",
            ].join(" ")}
          >
            Back to retail stock
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="type-label text-[var(--color-text-muted)] mb-2">
        Trade Clearance
      </p>
      <h1 className="type-h2 text-[var(--color-text)] mb-3">
        Optional pre-registration
      </h1>
      <p className="type-body text-[var(--color-text-muted)] mb-8 leading-relaxed">
        Leave your business details so we can match you to an offer. This is
        not required to browse stock. Trade vehicles are sold for spares,
        repair or resale.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <TextField
          label="Business name"
          value={businessName}
          onChange={(e) => {
            setBusinessName(e.target.value);
            if (fieldErrors.businessName) {
              setFieldErrors((prev) => ({ ...prev, businessName: undefined }));
            }
          }}
          onBlur={() => {
            if (!businessName.trim()) {
              setFieldErrors((prev) => ({
                ...prev,
                businessName: "Business name is required.",
              }));
            }
          }}
          placeholder="Your business name"
          autoComplete="organization"
          error={fieldErrors.businessName}
        />

        <TextField
          label="Company number or VAT number"
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
          <label className="flex items-start gap-3 cursor-pointer group min-h-[44px]">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => {
                setConfirmed(e.target.checked);
                if (fieldErrors.confirmed) {
                  setFieldErrors((prev) => ({ ...prev, confirmed: undefined }));
                }
              }}
              className="mt-1 w-5 h-5 rounded border-[var(--color-border-strong)] text-[var(--color-accent)] focus:ring-[var(--color-focus-ring)]"
            />
            <span className="type-small text-[var(--color-text)]">
              I confirm that I am buying in the course of a business.
            </span>
          </label>
          {fieldErrors.confirmed ? (
            <p className="mt-1.5 type-caption text-[var(--color-error)]">
              {fieldErrors.confirmed}
            </p>
          ) : null}
        </div>

        {formError ? (
          <p className="type-small text-[var(--color-error)]" role="alert">
            {formError}
          </p>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="submit"
            fullWidth
            loading={loading}
            disabled={!canContinue || loading}
            rightIcon={<ArrowRight size={16} />}
            className="sm:flex-1"
          >
            Continue
          </Button>
          <Link
            href="/search"
            className={[
              "inline-flex items-center justify-center h-12 px-5 rounded-[var(--radius-md)]",
              "border border-[var(--color-border-strong)] bg-[var(--color-surface)]",
              "type-small font-medium text-[var(--color-text)] text-center",
              "hover:bg-[var(--color-hover)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
              "sm:flex-1",
            ].join(" ")}
          >
            Back to retail stock
          </Link>
        </div>
      </form>
    </>
  );
}
