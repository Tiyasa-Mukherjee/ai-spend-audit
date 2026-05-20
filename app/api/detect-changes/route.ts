import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { runAudit, PRICING } from "@/lib/auditEngine";
import { sendPricingChangeEmail } from "@/lib/resend";
import { AuditInput } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Get all audits that have a user email
    const { data: audits, error } = await supabase
      .from("audits")
      .select("*")
      .not("user_email", "is", null);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!audits || audits.length === 0) {
      return NextResponse.json({ message: "No audits to check", checked: 0 });
    }

    const currentPricing = PRICING;
    const emailsSent: string[] = [];
    const affectedAudits: string[] = [];

    // Group audits by user email to send one consolidated email per user
    const auditsByEmail: Record<string, typeof audits> = {};
    for (const audit of audits) {
      const email = audit.user_email;
      if (!auditsByEmail[email]) auditsByEmail[email] = [];
      auditsByEmail[email].push(audit);
    }

    for (const [email, userAudits] of Object.entries(auditsByEmail)) {
      const allChanges: {
        tool: string;
        oldPrice: number;
        newPrice: number;
        oldRecommendation: string;
        newRecommendation: string;
        auditId: string;
      }[] = [];

      for (const audit of userAudits) {
        const storedPricing = audit.pricing_snapshot;
        if (!storedPricing) continue;

        const input: AuditInput = audit.input;

        // Re-run audit with current pricing
        const newAuditData = runAudit(input);
        const oldResults = audit.results;

        // Compare old vs new recommendations
        for (let i = 0; i < newAuditData.results.length; i++) {
          const newResult = newAuditData.results[i];
          const oldResult = oldResults[i];
          if (!oldResult) continue;

          const tool = newResult.toolEntry.tool;
          const oldToolPricing = storedPricing[tool];
          const newToolPricing = currentPricing[tool as keyof typeof currentPricing];

          if (!oldToolPricing || !newToolPricing) continue;

          // Check if recommendation changed
          if (newResult.recommendedAction !== oldResult.recommendedAction) {
            const plan = newResult.toolEntry.plan as string;
            const oldPrice =
              oldToolPricing[plan as keyof typeof oldToolPricing]?.price ?? 0;
            const newPrice =
              (newToolPricing as Record<string, { price: number }>)[plan]
                ?.price ?? 0;

            allChanges.push({
              tool,
              oldPrice,
              newPrice,
              oldRecommendation: oldResult.recommendedAction,
              newRecommendation: newResult.recommendedAction,
              auditId: audit.id,
            });
          }
        }
      }

      if (allChanges.length > 0) {
        // Use the most recent audit ID for the re-run link
        const latestAuditId = userAudits[userAudits.length - 1].id;

        await sendPricingChangeEmail({
          to: email,
          auditId: latestAuditId,
          changes: allChanges,
        });

        emailsSent.push(email);
        affectedAudits.push(...allChanges.map((c) => c.auditId));
      }
    }

    return NextResponse.json({
      message: "Detection complete",
      auditsChecked: audits.length,
      emailsSent: emailsSent.length,
      affectedAudits: affectedAudits.length,
    });
  } catch (error) {
    console.error("Detect changes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Also allow GET for manual triggering from browser
export async function GET() {
  return POST(new NextRequest("http://localhost/api/detect-changes", {
    method: "POST",
  }));
}