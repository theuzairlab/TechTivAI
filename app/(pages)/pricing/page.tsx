import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Dynamic AI implementation pricing with setup, maintenance, and retainer models.",
};

export default function PricingPage() {
  return (
    <PageShell
      title="Pricing Intelligence Engine"
      description="Real-time project estimates based on workflow complexity, integrations, AI models, and operational volume."
    />
  );
}
