import type { Metadata } from "next";
import { DashboardPageView } from "@/components/pages/dashboard/dashboard-page-view";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard for leads, AI sessions, proposals, and analytics.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await requireSession();

  return <DashboardPageView session={session} />;
}
