import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "AI Discovery", href: "/discovery" },
      { label: "Pricing Engine", href: "/pricing" },
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Ecommerce", href: "/industries/ecommerce" },
      { label: "Law Firms", href: "/industries/law-firm" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cyan/15 text-sm font-bold text-accent-cyan ring-1 ring-accent-cyan/30">
                T
              </span>
              <span className="font-display text-xl font-semibold">
                {siteConfig.name}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              {siteConfig.description}
            </p>
            <Button href="/discovery" size="sm">
              Start AI Discovery
            </Button>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold text-text-primary">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-accent-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-glass-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
