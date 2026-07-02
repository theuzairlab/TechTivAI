import type { Metadata } from "next";
import { UserPlaceholderPage } from "@/components/pages/user/user-placeholder-page";

export const metadata: Metadata = {
  title: "My Blueprints",
  robots: { index: false, follow: false },
};

export default function UserBlueprintsPage() {
  return (
    <UserPlaceholderPage
      title="My Blueprints"
      description="AI Discovery results and automation roadmaps generated for your business."
    />
  );
}
