import { auditTool, runAudit } from "@/lib/auditEngine";
import { AuditInput, ToolEntry } from "@/types";

// Helper to create a basic input
function makeInput(tools: ToolEntry[]): AuditInput {
  return { tools, teamSize: 5, useCase: "coding" };
}

// Test 1: Cursor Business with 2 seats should flag overspend
test("Cursor Business 2 seats should recommend downgrade to Pro", () => {
  const entry: ToolEntry = {
    id: "1",
    tool: "cursor",
    plan: "business",
    monthlySpend: 80,
    seats: 2,
  };
  const result = auditTool(entry, makeInput([entry]));
  expect(result.status).toBe("overspending");
  expect(result.savings).toBeGreaterThan(0);
  expect(result.recommendedPlan).toBe("pro");
});

// Test 2: GitHub Copilot Business 2 seats should flag overspend
test("GitHub Copilot Business 2 seats should recommend Individual", () => {
  const entry: ToolEntry = {
    id: "2",
    tool: "github_copilot",
    plan: "business",
    monthlySpend: 38,
    seats: 2,
  };
  const result = auditTool(entry, makeInput([entry]));
  expect(result.status).toBe("overspending");
  expect(result.savings).toBe(18);
  expect(result.recommendedPlan).toBe("individual");
});

// Test 3: Claude Max for writing use case should recommend Pro
test("Claude Max for writing should recommend downgrade to Pro", () => {
  const entry: ToolEntry = {
    id: "3",
    tool: "claude",
    plan: "max",
    monthlySpend: 100,
    seats: 1,
  };
  const input: AuditInput = { tools: [entry], teamSize: 1, useCase: "writing" };
  const result = auditTool(entry, input);
  expect(result.status).toBe("overspending");
  expect(result.savings).toBeGreaterThan(0);
});

// Test 4: Optimal plan should return zero savings
test("Cursor Pro 1 seat should be optimal with zero savings", () => {
  const entry: ToolEntry = {
    id: "4",
    tool: "cursor",
    plan: "pro",
    monthlySpend: 20,
    seats: 1,
  };
  const result = auditTool(entry, makeInput([entry]));
  expect(result.status).toBe("optimal");
  expect(result.savings).toBe(0);
});

// Test 5: Total savings should sum correctly across multiple tools
test("Total savings should sum correctly across multiple tools", () => {
  const tools: ToolEntry[] = [
    {
      id: "5a",
      tool: "cursor",
      plan: "business",
      monthlySpend: 80,
      seats: 2,
    },
    {
      id: "5b",
      tool: "github_copilot",
      plan: "business",
      monthlySpend: 38,
      seats: 2,
    },
  ];
  const input = makeInput(tools);
  const result = runAudit(input);
  expect(result.totalMonthlySavings).toBeGreaterThan(0);
  expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
});

// Test 6: Savings should never be negative
test("Savings should never be negative for any tool", () => {
  const tools: ToolEntry[] = [
    { id: "6a", tool: "cursor", plan: "pro", monthlySpend: 20, seats: 1 },
    { id: "6b", tool: "claude", plan: "free", monthlySpend: 0, seats: 1 },
    { id: "6c", tool: "windsurf", plan: "free", monthlySpend: 0, seats: 1 },
  ];
  const result = runAudit(makeInput(tools));
  result.results.forEach((r) => {
    expect(r.savings).toBeGreaterThanOrEqual(0);
  });
});