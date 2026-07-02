import type { Metadata } from "next";
import { UserDashboardPageView } from "@/components/pages/user/user-dashboard-page-view";
import { requireUserSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "My Portal",
  description: "Your TechTivAI portal — blueprints, proposals, and consultation status.",
  robots: { index: false, follow: false },
};

export default async function UserDashboardPage() {
  const session = await requireUserSession();

  return <UserDashboardPageView firstName={session.user.name.split(" ")[0] ?? "there"} />;
}
