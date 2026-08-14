"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { TextField } from "@/components/forms/TextField";
import { IconButton } from "@/components/buttons/IconButton";
import { OPENING_HOURS, SITE_CONTACT } from "@/lib/site-contact";
import { SITE_NAME } from "@/lib/site-brand";
import { DirectionsButton } from "@/components/vehicle/DirectionsButton";

const TIME_OPTIONS = ["Morning", "Afternoon", "Evening"] as const;

interface FieldErrors {
  name?:           string;
  mobile?:         string;
  email?:          string;
  registration?:   string;
  postcode?:       string;
  preferredDay?:   string;
  preferredTime?:  string;
}

export interface AppointmentRequestModalProps {
  open:           boolean;
  onClose:        () => void;
  vehicleId?:     string;
  vehicleTitle:   string;
  registration:   string;
  pageUrl:        string;
}

export function AppointmentRequestModal({
  open,
  onClose,
  vehicleId,
  vehicleTitle,
  registration: initialRegistration,
  pageUrl,
}: AppointmentRequestModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState(initialRegistration);
  const [postcode, setPostcode] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isVehicleBooking = Boolean(vehicleId || initialRegistration.trim());

  useEffect(() => {
    if (open) {
      setRegistration(initialRegistration);
      return;
    }
    setSubmitted(false);
    setFormError(null);
    setFieldErrors({});
    setLoading(false);
  }, [open, initialRegistration]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "Name is required.";
    if (!mobile.trim()) errors.mobile = "Mobile number is required.";
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!registration.trim()) errors.registration = "Registration is required.";
    if (!postcode.trim()) errors.postcode = "Postcode is required.";
    if (!preferredDay.trim()) errors.preferredDay = "Preferred day is required.";
    if (!preferredTime) errors.preferredTime = "Select a preferred time.";
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
      const response = await fetch("/api/appointment", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name,
          mobile,
          email,
          registration,
          postcode,
          preferredDay,
          preferredTime,
          vehicleId,
          vehiclePageUrl: pageUrl,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setFormError(
          data.error ?? "We couldn't send your request. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("We couldn't send your request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-heading"
      className="fixed inset-0 z-[var(--z-modal)] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={handleClose}
    >
      <div
        className={[
          "relative w-full sm:max-w-lg max-h-[min(92vh,100dvh)] overflow-y-auto overscroll-contain",
          "bg-[var(--color-surface)] rounded-t-[var(--radius-xl)] sm:rounded-[var(--radius-xl)]",
          "border border-[var(--color-border)] shadow-[var(--shadow-lg)]",
          "p-6 sm:p-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-8",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 id="appointment-heading" className="type-h3">
              {submitted ? "Request received" : "Book a look"}
            </h2>
            {!submitted ? (
              <p className="type-small text-[var(--color-text-muted)] mt-1">
                {isVehicleBooking ? (
                  <>
                    Request an appointment for{" "}
                    <span className="text-[var(--color-text)]">{vehicleTitle}</span>.
                    We&apos;ll confirm with you.
                  </>
                ) : (
                  <>
                    Request an appointment to visit {SITE_NAME}. We&apos;ll
                    confirm with you.
                  </>
                )}
              </p>
            ) : null}
          </div>
          <IconButton
            icon={<X size={18} />}
            onClick={handleClose}
            aria-label="Close appointment form"
            variant="secondary"
          />
        </div>

        {submitted ? (
          <div className="space-y-5">
            <p className="type-small text-[var(--color-text-body)]">
              Thanks — we&apos;ve received your request.
            </p>
            <p className="type-small text-[var(--color-text-muted)]">
              We&apos;ll confirm the appointment with you. This is not yet a
              confirmed booking.
            </p>

            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 space-y-3">
              <p className="type-section-label">What to bring</p>
              <ul className="type-small text-[var(--color-text-muted)] space-y-1 list-disc pl-4">
                <li>Photo ID</li>
                <li>Driving licence if you plan to test drive</li>
              </ul>

              <p className="type-section-label pt-2">Visit us</p>
              <address className="not-italic type-small text-[var(--color-text-body)]">
                {SITE_CONTACT.addressLine1}
                <br />
                {SITE_CONTACT.area}
              </address>

              <ul className="space-y-1">
                {OPENING_HOURS.map(({ day, time }) => (
                  <li key={day} className="flex justify-between gap-4 type-small">
                    <span className="text-[var(--color-text-muted)]">{day}</span>
                    <span className="num text-[var(--color-text)]">{time}</span>
                  </li>
                ))}
              </ul>

              <DirectionsButton />
            </div>

            <Button type="button" onClick={handleClose} fullWidth>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) {
                  setFieldErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              error={fieldErrors.name}
              autoComplete="name"
            />

            <TextField
              label="Mobile"
              type="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (fieldErrors.mobile) {
                  setFieldErrors((prev) => ({ ...prev, mobile: undefined }));
                }
              }}
              error={fieldErrors.mobile}
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
              label="Registration"
              value={registration}
              onChange={(e) => {
                setRegistration(e.target.value);
                if (fieldErrors.registration) {
                  setFieldErrors((prev) => ({ ...prev, registration: undefined }));
                }
              }}
              error={fieldErrors.registration}
              hint={initialRegistration ? undefined : "Enter the vehicle registration"}
            />

            <TextField
              label="Postcode travelling from"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
                if (fieldErrors.postcode) {
                  setFieldErrors((prev) => ({ ...prev, postcode: undefined }));
                }
              }}
              error={fieldErrors.postcode}
              autoComplete="postal-code"
            />

            <TextField
              label="Preferred day"
              type="date"
              value={preferredDay}
              onChange={(e) => {
                setPreferredDay(e.target.value);
                if (fieldErrors.preferredDay) {
                  setFieldErrors((prev) => ({ ...prev, preferredDay: undefined }));
                }
              }}
              error={fieldErrors.preferredDay}
            />

            <fieldset>
              <legend className="block type-small font-medium text-[var(--color-text)] mb-2">
                Preferred time
              </legend>
              <div className="flex flex-wrap gap-2">
                {TIME_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className={[
                      "inline-flex items-center h-10 px-4 rounded-[var(--radius-md)] border cursor-pointer",
                      "type-small transition-colors",
                      preferredTime === option
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-text)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-hover)]",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="preferred-time"
                      value={option}
                      checked={preferredTime === option}
                      onChange={() => {
                        setPreferredTime(option);
                        if (fieldErrors.preferredTime) {
                          setFieldErrors((prev) => ({
                            ...prev,
                            preferredTime: undefined,
                          }));
                        }
                      }}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {fieldErrors.preferredTime ? (
                <p className="mt-1.5 type-caption text-[var(--color-error)]">
                  {fieldErrors.preferredTime}
                </p>
              ) : null}
            </fieldset>

            {formError ? (
              <p className="type-small text-[var(--color-error)]" role="alert">
                {formError}
              </p>
            ) : null}

            <Button type="submit" loading={loading} fullWidth>
              Request appointment
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
