import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession();

  // ❌ if not logged in → redirect
  if (!session) redirect("/");

  // ❌ if not admin → redirect
  if (session.user.role !== "admin") redirect("/");

  // ✅ allowed → show dashboard
  return <>{children}</>;
}
