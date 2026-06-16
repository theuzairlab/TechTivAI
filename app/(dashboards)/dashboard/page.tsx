import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard for leads, AI sessions, proposals, and analytics.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <PageShell
      badge="Admin — Phase 4"
      title="Admin Dashboard"
      description="Lead management, AI conversation logs, proposal status, and platform analytics. Protected by Better Auth in Phase 4."
    />
  );
}
