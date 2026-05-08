import { ToolEntry, ToolAuditResult, AuditInput } from "@/types";

// PRICING DATA — verified May 2026
// Sources documented in PRICING_DATA.md
export const PRICING = {
  cursor: {
    hobby: { price: 0, label: "Hobby" },
    pro: { price: 20, label: "Pro" },
    business: { price: 40, label: "Business" },
    enterprise: { price: 100, label: "Enterprise" },
  },
  github_copilot: {
    individual: { price: 10, label: "Individual" },
    business: { price: 19, label: "Business" },
    enterprise: { price: 39, label: "Enterprise" },
  },
  claude: {
    free: { price: 0, label: "Free" },
    pro: { price: 20, label: "Pro" },
    max: { price: 100, label: "Max" },
    team: { price: 30, label: "Team" },
    enterprise: { price: 60, label: "Enterprise" },
  },
  chatgpt: {
    free: { price: 0, label: "Free" },
    plus: { price: 20, label: "Plus" },
    team: { price: 30, label: "Team" },
    enterprise: { price: 60, label: "Enterprise" },
  },
  anthropic_api: {
    payg: { price: 0, label: "Pay as you go" },
  },
  openai_api: {
    payg: { price: 0, label: "Pay as you go" },
  },
  gemini: {
    free: { price: 0, label: "Free" },
    pro: { price: 20, label: "Pro" },
    ultra: { price: 40, label: "Ultra" },
  },
  windsurf: {
    free: { price: 0, label: "Free" },
    pro: { price: 15, label: "Pro" },
    team: { price: 35, label: "Team" },
  },
};

export function auditTool(
  entry: ToolEntry,
  input: AuditInput
): ToolAuditResult {
  const { tool, plan, monthlySpend, seats } = entry;
  const { teamSize, useCase } = input;

  // Default — assume optimal unless logic below catches something
  let recommendedAction = "No change needed";
  let recommendedPlan: string | undefined;
  let savings = 0;
  let reason = "Your current plan appears well-matched to your usage.";
  let status: ToolAuditResult["status"] = "optimal";

  // --- CURSOR ---
  if (tool === "cursor") {
    const expectedCost = seats * 20; // Pro per seat
    if (plan === "business" && seats <= 3) {
      savings = monthlySpend - seats * 20;
      recommendedAction = "Downgrade to Cursor Pro";
      recommendedPlan = "pro";
      reason = `Business plan ($40/seat) is designed for teams >5. With ${seats} seats, Pro ($20/seat) covers the same coding features at half the price.`;
      status = "overspending";
    } else if (plan === "enterprise" && seats <= 10) {
      savings = monthlySpend - seats * 40;
      recommendedAction = "Downgrade to Cursor Business";
      recommendedPlan = "business";
      reason = `Enterprise pricing is justified only at scale (>10 seats) for SSO and admin controls. ${seats} seats don't need it.`;
      status = "overspending";
    } else if (monthlySpend > expectedCost * 1.1) {
      savings = monthlySpend - expectedCost;
      recommendedAction = "Review seat count";
      reason = `You're spending more than the standard per-seat rate. Check for unused seats.`;
      status = "overspending";
    }
  }

  // --- GITHUB COPILOT ---
  if (tool === "github_copilot") {
    if (plan === "business" && seats <= 2) {
      savings = monthlySpend - seats * 10;
      recommendedAction = "Switch to Individual plan per developer";
      recommendedPlan = "individual";
      reason = `Business plan ($19/seat) adds policy management and org controls. With ${seats} developers, Individual ($10/seat) is sufficient.`;
      status = "overspending";
    } else if (plan === "enterprise" && seats <= 5) {
      savings = monthlySpend - seats * 19;
      recommendedAction = "Downgrade to Business";
      recommendedPlan = "business";
      reason = `Enterprise adds Copilot Chat in IDE + fine-tuning. Under 5 seats, Business covers all standard coding assistance at $20 less per seat.`;
      status = "overspending";
    }
    // Coding-focused teams: suggest Cursor as alternative
    if (useCase === "coding" && monthlySpend > 50) {
      const cursorCost = seats * 20;
      if (cursorCost < monthlySpend) {
        savings = Math.max(savings, monthlySpend - cursorCost);
        recommendedAction = "Consider switching to Cursor Pro";
        reason = `For coding-focused teams, Cursor Pro ($20/seat) offers deeper IDE integration and context-aware completions vs Copilot at your current spend.`;
        status = "switch";
      }
    }
  }

  // --- CLAUDE ---
  if (tool === "claude") {
    if (plan === "team" && seats <= 2) {
      savings = monthlySpend - 20 * seats;
      recommendedAction = "Switch to individual Pro plans";
      recommendedPlan = "pro";
      reason = `Team plan ($30/seat) adds collaboration features. With ${seats} users, individual Pro ($20/seat) gives the same model access at lower cost.`;
      status = "overspending";
    } else if (plan === "max" && useCase !== "research" && useCase !== "data") {
      savings = monthlySpend - 20;
      recommendedAction = "Downgrade to Claude Pro";
      recommendedPlan = "pro";
      reason = `Max plan is designed for very high-volume usage. For ${useCase} workflows, Pro ($20/mo) provides sufficient usage limits.`;
      status = "overspending";
    }
  }

  // --- CHATGPT ---
  if (tool === "chatgpt") {
    if (plan === "team" && seats <= 2) {
      savings = monthlySpend - 20 * seats;
      recommendedAction = "Switch to individual Plus plans";
      recommendedPlan = "plus";
      reason = `Team plan adds shared workspace. With ${seats} users, individual Plus ($20/seat) gives the same GPT-4 access at $10/seat less.`;
      status = "overspending";
    }
    // For coding use case, suggest Cursor
    if (useCase === "coding") {
      recommendedAction = "Consider Cursor for coding workflows";
      reason = `ChatGPT is general-purpose. For coding specifically, Cursor Pro ($20/seat) offers in-editor context and autocomplete that ChatGPT can't match.`;
      status = "switch";
      savings = 0;
    }
  }

  // --- GEMINI ---
  if (tool === "gemini") {
    if (plan === "ultra" && useCase === "coding") {
      savings = monthlySpend - 20;
      recommendedAction = "Switch to Gemini Pro or Claude Pro";
      reason = `Gemini Ultra is Google's highest tier but coding assistance is not its strength. Claude Pro or Cursor would give better ROI for coding at lower cost.`;
      status = "switch";
    }
  }

  // Ensure savings is never negative
  savings = Math.max(0, savings);

  return {
    toolEntry: entry,
    currentSpend: monthlySpend,
    recommendedAction,
    recommendedPlan,
    savings,
    reason,
    status,
  };
}

export function runAudit(input: AuditInput) {
  const results = input.tools.map((tool) => auditTool(tool, input));
  const totalMonthlySavings = results.reduce((sum, r) => sum + r.savings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  return {
    input,
    results,
    totalMonthlySavings,
    totalAnnualSavings,
  };
}