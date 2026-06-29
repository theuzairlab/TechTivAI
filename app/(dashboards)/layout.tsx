import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireSession } from "@/lib/session";

export default async function DashboardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();

  return <DashboardShell session={session}>{children}</DashboardShell>;
}
