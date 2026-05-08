export type ToolName =
  | "cursor"
  | "github_copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf";

export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export interface ToolEntry {
  id: string;
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: ToolEntry[];
  teamSize: number;
  useCase: UseCase;
}

export interface ToolAuditResult {
  toolEntry: ToolEntry;
  currentSpend: number;
  recommendedAction: string;
  recommendedPlan?: string;
  savings: number;
  reason: string;
  status: "overspending" | "optimal" | "switch";
}

export interface AuditResult {
  id: string;
  input: AuditInput;
  results: ToolAuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary: string;
  createdAt: string;
}