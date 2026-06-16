import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation, talk to our AI consultant, or request a custom automation proposal.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact & Consultation"
      description="AI-assisted onboarding, voice consultation, manual contact forms, and strategy call booking — all in one place."
    />
  );
}
