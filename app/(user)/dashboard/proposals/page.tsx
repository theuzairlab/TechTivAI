import type { Metadata } from "next";
import { UserPlaceholderPage } from "@/components/pages/user/user-placeholder-page";

export const metadata: Metadata = {
  title: "My Proposals",
  robots: { index: false, follow: false },
};

export default function UserProposalsPage() {
  return (
    <UserPlaceholderPage
      title="My Proposals"
      description="Custom automation proposals, pricing breakdowns, and implementation timelines."
    />
  );
}
