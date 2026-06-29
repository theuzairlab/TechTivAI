import { DashboardDemo } from "@/components/sections/dashboard/dashboard-demo";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { Session } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type DashboardPageViewProps = {
  session: Session;
};

export async function DashboardPageView({ session }: DashboardPageViewProps) {
  const leadCount = await prisma.lead.count().catch(() => 0);

  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-3">
        <p className="s-label">— Admin dashboard</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          Welcome back,{" "}
          <span className="text-gradient-cyan">{session.user.name.split(" ")[0]}</span>
        </h1>
        <p className="text-text-muted">
          Lead management, AI conversation logs, proposal generation, workflow
          monitoring, and platform analytics — your internal command center.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Stored leads", value: leadCount.toString() },
          { label: "Session status", value: "Active" },
          { label: "Auth provider", value: session.user.emailVerified ? "Verified" : "Pending" },
          { label: "Role", value: String(session.user.role ?? "user") },
        ].map((stat) => (
          <GlassPanel key={stat.label} className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-text-primary capitalize">
              {stat.value}
            </p>
          </GlassPanel>
        ))}
      </div>

      <DashboardDemo />
    </div>
  );
}
