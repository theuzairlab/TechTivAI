import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/auth-routes";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession(callbackUrl = AUTH_ROUTES.login) {
  const session = await getSession();

  if (!session) {
    const params = new URLSearchParams({ callbackUrl: AUTH_ROUTES.dashboard });
    redirect(`${callbackUrl}?${params.toString()}`);
  }

  return session;
}
