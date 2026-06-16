"use client";

import { motion } from "framer-motion";
import { AnimatedMetric } from "@/components/animations/animated-metric";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { DiscoveryResult } from "@/lib/discovery";

type DiscoveryResultsProps = {
  result: DiscoveryResult;
  onRestart: () => void;
};

export function DiscoveryResults({ result, onRestart }: DiscoveryResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      <div className="space-y-3 text-center sm:text-left">
        <Badge variant="lime">Your AI Blueprint</Badge>
        <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Recommended AI Systems
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
          {result.summary}
        </p>
      </div>

      <StaggerChildren className="grid gap-3 sm:grid-cols-2">
        {result.recommendations.map((rec) => (
          <StaggerItem key={rec.id}>
            <GlassPanel className="h-full p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-violet/15 text-xs font-bold text-accent-violet ring-1 ring-accent-violet/30">
                  AI
                </span>
                <div>
                  <p className="font-medium text-text-primary">{rec.label}</p>
                  <p className="mt-1 text-sm text-text-muted">{rec.description}</p>
                </div>
              </div>
            </GlassPanel>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <div className="space-y-4">
        <h4 className="font-display text-xl font-semibold tracking-tight">
          Projected ROI
        </h4>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <AnimatedMetric
            value={result.roi.hoursSavedPerWeek}
            suffix=" hrs"
            label="Hours saved / week"
            delay={0.1}
          />
          <AnimatedMetric
            value={result.roi.monthlySavings}
            label="Monthly savings"
            format="currency"
            delay={0.18}
          />
          <AnimatedMetric
            value={result.roi.revenueIncreasePercent}
            label="Revenue increase potential"
            format="percent"
            delay={0.26}
          />
          <AnimatedMetric
            value={result.roi.impactScore}
            suffix="/100"
            label="Automation impact score"
            delay={0.34}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-glass-border pt-6 sm:flex-row sm:flex-wrap">
        <Button href="/discovery" size="lg">
          Get Full AI Blueprint
        </Button>
        <Button href="/contact" variant="secondary" size="lg">
          Book Strategy Call
        </Button>
        <Button variant="ghost" size="lg" onClick={onRestart}>
          Start Over
        </Button>
      </div>

      <p className="text-center text-xs text-text-muted sm:text-left">
        Demo estimates — live AI recommendations connect in Phase 3
      </p>
    </motion.div>
  );
}
