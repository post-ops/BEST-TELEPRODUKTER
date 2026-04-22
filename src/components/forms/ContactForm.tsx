"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const FIELD_CLS =
  "block w-full rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-navy-900/40 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 aria-[invalid=true]:border-rose-500";

function SubmitButton({
  submittingLabel,
  label,
}: {
  submittingLabel: string;
  label: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? submittingLabel : label}
    </Button>
  );
}

const initialState: ContactFormState = { ok: false };

export function ContactForm() {
  const t = useTranslations("contactForm");
  const tr = useTranslations("recommender");
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-cyan-500/30 bg-cyan-50/60 p-8 text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white">
          <CheckIcon size={28} />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-navy-900">{t("success")}</h3>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-5" noValidate>
      {/* Honeypot */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-navy-900"
          >
            {t("name")} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={FIELD_CLS}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-err" : undefined}
          />
          {state.fieldErrors?.name && (
            <p id="name-err" className="mt-1 text-xs text-rose-600">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-navy-900"
          >
            {t("email")} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD_CLS}
            aria-invalid={Boolean(state.fieldErrors?.email)}
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-rose-600">{state.fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-navy-900"
          >
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={FIELD_CLS}
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block text-sm font-medium text-navy-900"
          >
            {t("company")}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={FIELD_CLS}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="segment"
          className="mb-1.5 block text-sm font-medium text-navy-900"
        >
          {t("segment")} *
        </label>
        <select
          id="segment"
          name="segment"
          required
          defaultValue=""
          className={cn(FIELD_CLS, "appearance-none")}
        >
          <option value="" disabled>
            {t("segmentPlaceholder")}
          </option>
          <option value="hospital">{tr("hospital")}</option>
          <option value="psychiatric">{tr("psychiatric")}</option>
          <option value="nursing-home">{tr("nursingHome")}</option>
          <option value="assisted-living">{tr("assistedLiving")}</option>
          <option value="other">—</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-navy-900"
        >
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={FIELD_CLS}
          aria-invalid={Boolean(state.fieldErrors?.message)}
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-rose-600">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-navy-900/20 text-cyan-500 focus:ring-cyan-500"
        />
        <span>{t("consent")}</span>
      </label>

      {state.message && !state.ok && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          {state.message}
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {state.ok ? t("success") : ""}
      </div>

      <div className="pt-2">
        <SubmitButton
          label={t("submit")}
          submittingLabel={t("submitting")}
        />
      </div>
    </form>
  );
}
