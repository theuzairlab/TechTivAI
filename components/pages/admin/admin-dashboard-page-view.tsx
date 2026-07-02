import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { AdminPageHeader } from "@/components/pages/admin/admin-page-header";
import { LeadStatusBadge } from "@/components/pages/admin/lead-status-badge";
import type { Session } from "@/lib/auth";
import { formatLeadInterest, leadStatusLabels, type LeadStatus } from "@/lib/leads";
import { formatRelativeTime, getSourceLabel } from "@/lib/leads-format";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

type AdminDashboardPageViewProps = {
  session: Session;
};

export async function AdminDashboardPageView({ session }: AdminDashboardPageViewProps) {
  const [leadCount, newLeads, recentLeads, statusGroups] = await Promise.all([
    prisma.lead.count().catch(() => 0),
    prisma.lead.count({ where: { status: "NEW" } }).catch(() => 0),
    prisma.lead
      .findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          source: true,
          status: true,
          createdAt: true,
        },
      })
      .catch(() => []),
    prisma.lead
      .groupBy({
        by: ["status"],
        _count: { status: true },
      })
      .catch(() => []),
  ]);

  const pipeline = (["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST"] as const).map(
    (status) => ({
      status,
      count: statusGroups.find((g) => g.status === status)?._count.status ?? 0,
    }),
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        label="Admin overview"
        title={
          <>
            Command center,{" "}
            <span className="text-gradient-cyan">{session.user.name.split(" ")[0]}</span>
          </>
        }
        description="Monitor new leads, pipeline health, and platform activity from one place."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total leads" value={leadCount} href="/admin/leads" />
        <StatCard
          label="New leads"
          value={newLeads}
          href="/admin/leads?status=NEW"
          highlight={newLeads > 0}
        />
        <StatCard label="AI sessions" value="—" href="/admin/sessions" />
        <StatCard label="Proposals" value="—" href="/admin/proposals" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <GlassPanel variant="elevated" className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Recent leads
              </p>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Latest submissions
              </h2>
            </div>
            <Link
              href="/admin/leads"
              className="flex items-center gap-1 text-xs text-brand-cyan no-underline hover:underline"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">
              No leads yet. Submissions from contact and discovery will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-border-subtle/60">
              {recentLeads.map((lead) => (
                <li key={lead.id}>
                  <Link
                    href={`/admin/leads?lead=${lead.id}`}
                    className="flex items-center justify-between gap-4 py-3 no-underline transition-colors hover:text-brand-cyan"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-text-primary">{lead.name}</p>
                      <p className="truncate text-sm text-text-muted">{lead.email}</p>
                      <p className="mt-1 text-xs text-brand-cyan">
                        {getSourceLabel(lead.source)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <LeadStatusBadge status={lead.status as LeadStatus} />
                      <span className="text-[10px] text-text-muted">
                        {formatRelativeTime(lead.createdAt.toISOString())}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>

        <GlassPanel variant="elevated" className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users size={18} className="text-brand-cyan" />
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Pipeline snapshot
            </h2>
          </div>
          <ul className="space-y-3">
            {pipeline.map((item) => (
              <li key={item.status}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-text-muted">{leadStatusLabels[item.status]}</span>
                  <span className="font-medium text-text-primary">{item.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand transition-all"
                    style={{
                      width: leadCount > 0 ? `${(item.count / leadCount) * 100}%` : "0%",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  highlight,
}: {
  label: string;
  value: number | string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link href={href} className="no-underline">
      <GlassPanel
        className={cn(
          "p-5 transition-colors hover:border-brand-cyan/30",
          highlight && "border-brand-cyan/30 bg-brand-cyan/5",
        )}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
          {label}
        </p>
        <p className="mt-2 font-display text-2xl font-bold text-text-primary">{value}</p>
      </GlassPanel>
    </Link>
  );
}
