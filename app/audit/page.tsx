"use client";

import { useEffect, useState } from "react";
import { AuditInput, AuditResult, ToolAuditResult } from "@/types";
import { runAudit } from "@/lib/auditEngine";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuditPage() {
  const [result, setResult] = useState<ReturnType<typeof runAudit> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ai-spend-audit-form");
    if (saved) {
      const input: AuditInput = JSON.parse(saved);
      const auditResult = runAudit(input);
      setResult(auditResult);
    }
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No audit data found. <a href="/" className="underline text-primary">Start a new audit</a></p>
      </main>
    );
  }

  const { results, totalMonthlySavings, totalAnnualSavings } = result;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero savings banner */}
      <div className="border-b bg-card">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
            Your AI Spend Audit
          </div>
          {totalMonthlySavings > 0 ? (
            <>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                You could save{" "}
                <span className="text-primary">
                  ${totalMonthlySavings}/mo
                </span>
              </h1>
              <p className="text-muted-foreground text-lg">
                That's{" "}
                <span className="font-semibold text-foreground">
                  ${totalAnnualSavings}/year
                </span>{" "}
                in unnecessary AI spend.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                You're spending well 👍
              </h1>
              <p className="text-muted-foreground text-lg">
                Your current AI stack looks optimized. We'll notify you when better options appear.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Per tool breakdown */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <h2 className="text-xl font-semibold">Per-tool breakdown</h2>

        {results.map((r: ToolAuditResult, i: number) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base capitalize">
                  {r.toolEntry.tool.replace("_", " ")} — {r.toolEntry.plan}
                </CardTitle>
                <Badge
                  variant={
                    r.status === "optimal"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {r.status === "optimal" ? "Optimal" : r.status === "overspending" ? "Overspending" : "Better option exists"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Current spend</span>
                <span className="font-medium text-foreground">${r.currentSpend}/mo</span>
              </div>
              {r.savings > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Potential savings</span>
                  <span className="font-medium text-green-600">-${r.savings}/mo</span>
                </div>
              )}
              <p className="text-muted-foreground pt-2 border-t mt-2">
                <span className="font-medium text-foreground">Recommendation: </span>
                {r.recommendedAction}
              </p>
              <p className="text-muted-foreground">{r.reason}</p>
            </CardContent>
          </Card>
        ))}

        {/* Credex CTA for high savings */}
        {totalMonthlySavings > 500 && (
          <Card className="border-primary bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-1">Save even more with Credex</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Credex sells discounted AI infrastructure credits — Cursor, Claude, ChatGPT Enterprise and more — at substantial discounts. Book a free consultation to see how much more you can save.
              </p>
              <Button className="w-full">Book a Free Credex Consultation</Button>
            </CardContent>
          </Card>
        )}

        {/* Back button */}
        <div className="pt-4">
          <a href="/">
            <Button variant="outline" className="w-full">← Run another audit</Button>
          </a>
        </div>
      </div>
    </main>
  );
}