import Link from "next/link";
import type { Session } from "@/lib/auth";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

type DashboardShellProps = {
  session: Session;
  children: React.ReactNode;
};

export function DashboardShell({ session, children }: DashboardShellProps) {
  const user = session.user;

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-nav-bg/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="group flex items-center gap-2.5 no-underline">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cyan to-accent-lime text-xs font-bold text-on-accent">
                T
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-text-primary">
                Command Center
              </span>
            </Link>
            <span className="hidden rounded-full border border-border-subtle px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand sm:inline-flex">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-text-primary">{user.name}</p>
              <p className="text-xs text-text-muted">
                {user.email}
                {user.username ? ` · @${user.username}` : ""}
              </p>
            </div>
            <ThemeToggle />
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
