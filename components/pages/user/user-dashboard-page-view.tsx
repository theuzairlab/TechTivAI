"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { AnimatedIcon } from "@/components/ui/animated-icon";

type UserDashboardPageViewProps = {
  firstName: string;
};

export function UserDashboardPageView({ firstName }: UserDashboardPageViewProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-3">
        <p className="s-label">— Your portal</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          Welcome, <span className="text-gradient-cyan">{firstName}</span>
        </h1>
        <p className="text-text-muted">
          Track your AI discovery results, proposals, and consultation status.
          This is your personal space on the TechTivAI platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Blueprints", value: "0", hint: "From AI Discovery" },
          { label: "Proposals", value: "0", hint: "Requested & generated" },
          { label: "Consultations", value: "0", hint: "Booked sessions" },
        ].map((stat) => (
          <GlassPanel key={stat.label} className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-text-primary">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-text-muted">{stat.hint}</p>
          </GlassPanel>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <GlassPanel className="p-6">
          <AnimatedIcon icon={Sparkles} size={22} className="mb-4 text-brand" />
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Run AI Discovery
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Get a personalized automation blueprint with system recommendations
            and projected ROI — takes about 4 minutes.
          </p>
          <Button href="/discovery" className="mt-5" size="sm">
            Start Discovery
            <ArrowRight size={14} className="ml-1.5" />
          </Button>
        </GlassPanel>

        <GlassPanel className="p-6">
          <AnimatedIcon icon={MessageSquare} size={22} className="mb-4 text-brand-cyan" />
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Talk to AI Consultant
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Voice or chat consultation for workflow recommendations, pricing
            estimates, and next steps.
          </p>
          <Button href="/contact#voice" variant="secondary" className="mt-5" size="sm">
            Start Consultation
          </Button>
        </GlassPanel>

        <GlassPanel className="p-6">
          <AnimatedIcon icon={Calendar} size={22} className="mb-4 text-brand-cyan" />
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Book strategy call
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Schedule a 30-minute session with our AI transformation team.
          </p>
          <Button href="/contact#schedule" variant="secondary" className="mt-5" size="sm">
            View calendar
          </Button>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Request a proposal
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Submit your business details and we&apos;ll send a tailored automation
            proposal with pricing and timeline.
          </p>
          <Button href="/contact#form" variant="outline" className="mt-5" size="sm">
            Contact us
          </Button>
        </GlassPanel>
      </div>

      <GlassPanel variant="elevated" className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Coming in Phase 2
        </p>
        <p className="mt-2 max-w-xl text-sm text-text-muted">
          Saved discovery answers, generated proposals, and consultation history
          will appear here once the data layer is connected. For now, use the
          tools above to start your AI transformation journey.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-cyan hover:text-brand"
        >
          Explore the platform
          <ArrowRight size={14} />
        </Link>
      </GlassPanel>
    </div>
  );
}
