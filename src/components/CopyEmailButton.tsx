"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { Check, Copy } from "./icons";

export default function CopyEmailButton({ email }: { email: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // No clipboard access (old browser or insecure context): open the mail app instead.
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/15 px-3.5 text-sm font-medium transition-colors hover:bg-white/25"
    >
      {copied ? <Check className="size-4" strokeWidth={2.5} /> : <Copy className="size-4" />}
      <span aria-live="polite">{copied ? t("contact.copied") : t("contact.copy")}</span>
    </button>
  );
}
