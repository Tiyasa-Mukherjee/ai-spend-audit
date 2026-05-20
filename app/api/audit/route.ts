import { NextRequest, NextResponse } from "next/server";
import { runAudit, PRICING } from "@/lib/auditEngine";
import { createServerSupabaseClient } from "@/lib/supabase";
import { AuditInput } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input: AuditInput = body;
    const userEmail: string | undefined = body.email;

    if (body._honey) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const auditData = runAudit(input);

    let aiSummary = generateFallbackSummary(auditData);
    try {
      aiSummary = await generateAISummary(input, auditData);
    } catch (err) {
      console.error("Anthropic API failed, using fallback:", err);
    }

    // Save pricing snapshot at time of audit
    const pricingSnapshot = PRICING;

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("audits")
      .insert({
        input: input,
        results: auditData.results,
        total_monthly_savings: auditData.totalMonthlySavings,
        total_annual_savings: auditData.totalAnnualSavings,
        ai_summary: aiSummary,
        pricing_snapshot: pricingSnapshot,
        user_email: userEmail || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save audit" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      ...auditData,
      aiSummary,
    });
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateFallbackSummary(
  auditData: ReturnType<typeof runAudit>
): string {
  const { totalMonthlySavings, results } = auditData;
  const overspending = results.filter((r) => r.status !== "optimal").length;

  if (totalMonthlySavings === 0) {
    return `Your AI tool stack looks well-optimized. All ${results.length} tools are on appropriate plans for your usage. We'll keep monitoring pricing changes and notify you when better options appear.`;
  }

  return `Your audit found $${totalMonthlySavings}/month in potential savings across ${overspending} of your ${results.length} AI tools. The biggest opportunity is ${results.sort((a, b) => b.savings - a.savings)[0]?.toolEntry.tool.replace("_", " ")}. Switching to recommended plans could save you $${auditData.totalAnnualSavings}/year.`;
}

async function generateAISummary(
  input: AuditInput,
  auditData: ReturnType<typeof runAudit>
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `You are an AI spend advisor. Write a 2-3 sentence personalized summary for a startup audit result. Be specific, honest, and actionable. Do not use generic phrases.

Team size: ${input.teamSize} people
Primary use case: ${input.useCase}
Tools audited: ${input.tools.map((t) => t.tool).join(", ")}
Total monthly savings found: $${auditData.totalMonthlySavings}
Total tools overspending: ${auditData.results.filter((r) => r.status !== "optimal").length} of ${auditData.results.length}

Write the summary directly, no preamble.`,
        },
      ],
    }),
  });

  const data = await response.json();
  return data.content[0].text;
}