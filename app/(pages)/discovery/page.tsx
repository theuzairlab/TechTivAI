import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "AI Discovery",
  description:
    "Full-screen AI onboarding experience with multi-step interview and dynamic recommendations.",
};

export default function DiscoveryPage() {
  return (
    <PageShell
      title="AI Discovery Platform"
      description="A conversational onboarding flow that analyzes your business, scores automation opportunities, and generates personalized AI recommendations."
    />
  );
}
