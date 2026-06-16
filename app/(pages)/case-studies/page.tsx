import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how TechTivAI clients reduced costs, saved hours, and scaled with AI automation.",
};

export default function CaseStudiesPage() {
  return (
    <PageShell
      title="Case Studies"
      description="Before-and-after stories with measurable outcomes — hours saved, revenue gained, and response times transformed."
    />
  );
}
