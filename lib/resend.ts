import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPricingChangeEmail({
  to,
  auditId,
  changes,
}: {
  to: string;
  auditId: string;
  changes: {
    tool: string;
    oldPrice: number;
    newPrice: number;
    oldRecommendation: string;
    newRecommendation: string;
  }[];
}) {
  const changesList = changes
    .map(
      (c) =>
        `<li><strong>${c.tool}</strong>: price changed from $${c.oldPrice} to $${c.newPrice}/mo. 
        Previous recommendation: ${c.oldRecommendation}. 
        New recommendation: ${c.newRecommendation}.</li>`
    )
    .join("");

  const rerunUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://ai-spend-audit-tan.vercel.app"}/audit/${auditId}/diff?rerun=true`;

  try {
    await resend.emails.send({
      from: "AI Spend Audit <onboarding@resend.dev>",
      to,
      subject: "Your AI tool pricing has changed — re-audit recommended",
      html: `
        <h2>Pricing changes affect your audit</h2>
        <p>Since you ran your AI spend audit, pricing has changed for some of your tools:</p>
        <ul>${changesList}</ul>
        <p>Your previous recommendations may no longer be accurate.</p>
        <a href="${rerunUrl}" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;margin-top:16px;">
          Re-run my audit with new pricing
        </a>
        <p style="margin-top:24px;font-size:12px;color:#666;">
          You're receiving this because you submitted your email when using AI Spend Audit.
        </p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}