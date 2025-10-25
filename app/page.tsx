import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Page() {
  await requireAuth();
  const data = await caller.getUsers();
  return <div>Protected server component {JSON.stringify(data)}</div>;
}
