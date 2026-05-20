import { createServerSupabaseClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { runAudit } from "@/lib/auditEngine";
import { ToolAuditResult } from "@/types";
import Link from "next/link";

export default async function DiffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();

  const { data: audit, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !audit) notFound();

  const input = audit.input;
  const oldResults: ToolAuditResult[] = audit.results;
  const newAuditData = runAudit(input);
  const newResults = newAuditData.results;

  const oldTotal = audit.total_monthly_savings;
  const newTotal = newAuditData.totalMonthlySavings;
  const delta = newTotal - oldTotal;

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
            Re-audit Results
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {delta > 0
              ? `Savings increased by $${delta}/mo`
              : delta < 0
              ? `Savings decreased by $${Math.abs(delta)}/mo`
              : "No change in savings"}
          </h1>
          <p className="text-muted-foreground">
            Old audit: <strong>${oldTotal}/mo</strong> savings &rarr; New audit:{" "}
            <strong>${newTotal}/mo</strong> savings
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        <h2 className="text-xl font-semibold">What changed</h2>

        {oldResults.map((oldResult, i) => {
          const newResult = newResults[i];
          if (!newResult) return null;
          const changed =
            oldResult.recommendedAction !== newResult.recommendedAction ||
            oldResult.savings !== newResult.savings;

          return (
            <div
              key={i}
              className={`border rounded-lg p-4 ${
                changed ? "border-orange-300 bg-orange-50" : "bg-card"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium capitalize">
                  {oldResult.toolEntry.tool.replace(/_/g, " ")} —{" "}
                  {oldResult.toolEntry.plan}
                </h3>
                {changed ? (
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                    Changed
                  </span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                    Same
                  </span>
                )}
              </div>

              {changed ? (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-red-50 rounded p-3">
                    <p className="text-xs text-red-500 font-medium mb-1">
                      PREVIOUS
                    </p>
                    <p className="font-medium">{oldResult.recommendedAction}</p>
                    <p className="text-muted-foreground mt-1">
                      Savings: ${oldResult.savings}/mo
                    </p>
                  </div>
                  <div className="bg-green-50 rounded p-3">
                    <p className="text-xs text-green-500 font-medium mb-1">
                      NOW
                    </p>
                    <p className="font-medium">
                      {newResult.recommendedAction}
                    </p>
                    <p className="text-muted-foreground mt-1">
                      Savings: ${newResult.savings}/mo
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {oldResult.recommendedAction} — no change
                </p>
              )}
            </div>
          );
        })}

        <Link href={`/audit/${id}`}>
          <button className="w-full border rounded-lg py-3 text-sm mt-4">
            ← Back to original audit
          </button>
        </Link>
      </div>
    </main>
  );
}