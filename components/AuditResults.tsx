"use client";

import { ToolAuditResult } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface AuditResultsProps {
  audit: {
    id: string;
    results: ToolAuditResult[];
    total_monthly_savings: number;
    total_annual_savings: number;
    ai_summary: string;
    input: { teamSize: number; useCase: string };
  };
}

export default function AuditResults({ audit }: AuditResultsProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { results, total_monthly_savings, total_annual_savings, ai_summary } =
    audit;

  async function handleLeadCapture() {
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, auditId: audit.id }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b bg-card">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
            Your AI Spend Audit
          </div>
          {total_monthly_savings > 0 ? (
            <>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                You could save{" "}
                <span className="text-primary">${total_monthly_savings}/mo</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                That's{" "}
                <span className="font-semibold text-foreground">
                  ${total_annual_savings}/year
                </span>{" "}
                in unnecessary AI spend.
              </p>
            </>
          ) : (
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              You're spending well 👍
            </h1>
          )}

          {/* AI Summary */}
          {ai_summary && (
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm bg-muted rounded-lg p-4">
              {ai_summary}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {/* Per tool breakdown */}
        <h2 className="text-xl font-semibold">Per-tool breakdown</h2>
        {results.map((r: ToolAuditResult, i: number) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base capitalize">
                  {r.toolEntry.tool.replace("_", " ")} — {r.toolEntry.plan}
                </CardTitle>
                <Badge variant={r.status === "optimal" ? "secondary" : "destructive"}>
                  {r.status === "optimal"
                    ? "Optimal"
                    : r.status === "overspending"
                    ? "Overspending"
                    : "Better option exists"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Current spend</span>
                <span className="font-medium text-foreground">
                  ${r.currentSpend}/mo
                </span>
              </div>
              {r.savings > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Potential savings</span>
                  <span className="font-medium text-green-600">
                    -${r.savings}/mo
                  </span>
                </div>
              )}
              <p className="text-muted-foreground pt-2 border-t mt-2">
                <span className="font-medium text-foreground">
                  Recommendation:{" "}
                </span>
                {r.recommendedAction}
              </p>
              <p className="text-muted-foreground">{r.reason}</p>
            </CardContent>
          </Card>
        ))}

        {/* Credex CTA */}
        {total_monthly_savings > 500 && (
          <Card className="border-primary bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-1">
                Save even more with Credex
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Credex sells discounted AI infrastructure credits at substantial
                discounts. Book a free consultation.
              </p>
              <Button className="w-full">Book a Free Credex Consultation</Button>
            </CardContent>
          </Card>
        )}

        {/* Email capture */}
        {!submitted ? (
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-1">Get your report by email</h3>
              <p className="text-muted-foreground text-sm mb-4">
                We'll send you this audit and notify you when better options
                appear for your stack.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 border rounded-md px-3 py-2 text-sm"
                />
                {/* Honeypot */}
                <input
                  type="text"
                  name="_honey"
                  className="hidden"
                  tabIndex={-1}
                />
                <Button onClick={handleLeadCapture} disabled={submitting}>
                  {submitting ? "Sending..." : "Send Report"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-green-600 font-medium">
                ✓ Report sent to {email}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Share */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Share your audit:{" "}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied!");
              }}
              className="underline text-primary"
            >
              Copy link
            </button>
          </p>
        </div>

        <a href="/">
          <Button variant="outline" className="w-full">
            ← Run another audit
          </Button>
        </a>
      </div>
    </main>
  );
}