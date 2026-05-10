import { createServerSupabaseClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import AuditResults from "@/components/AuditResults";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("audits")
    .select("total_monthly_savings")
    .eq("id", id)
    .single();

  const savings = data?.total_monthly_savings ?? 0;
  const title =
    savings > 0
      ? `I'm saving $${savings}/mo on AI tools — get your free audit`
      : "My AI Spend Audit — SpendSmart";

  return {
    title,
    openGraph: {
      title,
      description:
        "Free AI spend audit for startups. Find out if you're overpaying for Cursor, Claude, Copilot and more.",
    },
    twitter: {
      card: "summary",
      title,
    },
  };
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return <AuditResults audit={data} />;
}