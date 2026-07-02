import { UserShell } from "@/components/dashboard/user-shell";
import { requireUserSession } from "@/lib/session";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireUserSession();

  return <UserShell session={session}>{children}</UserShell>;
}
