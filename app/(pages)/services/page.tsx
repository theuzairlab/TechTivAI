import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore TechTivAI's full AI automation ecosystem — workflows, chatbots, voice agents, and more.",
};

export default function ServicesPage() {
  return (
    <PageShell
      title="Services Ecosystem"
      description="Nine AI systems designed to automate operations, accelerate growth, and replace repetitive work across your business."
    />
  );
}
