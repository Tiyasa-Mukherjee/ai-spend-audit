"use client";

import { ToolEntry, ToolName } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const TOOL_PLANS: Record<ToolName, string[]> = {
  cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  github_copilot: ["Individual", "Business", "Enterprise"],
  claude: ["Free", "Pro", "Max", "Team", "Enterprise"],
  chatgpt: ["Free", "Plus", "Team", "Enterprise"],
  anthropic_api: ["Pay as you go"],
  openai_api: ["Pay as you go"],
  gemini: ["Free", "Pro", "Ultra"],
  windsurf: ["Free", "Pro", "Team"],
};

const TOOL_LABELS: Record<ToolName, string> = {
  cursor: "Cursor",
  github_copilot: "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  anthropic_api: "Anthropic API",
  openai_api: "OpenAI API",
  gemini: "Gemini",
  windsurf: "Windsurf",
};

interface ToolRowProps {
  entry: ToolEntry;
  onChange: (updated: ToolEntry) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export default function ToolRow({
  entry,
  onChange,
  onRemove,
  canRemove,
}: ToolRowProps) {
  const plans = TOOL_PLANS[entry.tool] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg bg-card relative">
      {/* Tool Name */}
      <div className="space-y-1">
        <Label>Tool</Label>
        <Select
          value={entry.tool}
          onValueChange={(val) =>
            onChange({
              ...entry,
              tool: val as ToolName,
              plan: TOOL_PLANS[val as ToolName][0].toLowerCase(),
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(TOOL_LABELS) as ToolName[]).map((t) => (
              <SelectItem key={t} value={t}>
                {TOOL_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plan */}
      <div className="space-y-1">
        <Label>Plan</Label>
        <Select
          value={entry.plan}
          onValueChange={(val) => onChange({ ...entry, plan: val })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {plans.map((p) => (
              <SelectItem key={p} value={p.toLowerCase()}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Monthly Spend */}
      <div className="space-y-1">
        <Label>Monthly Spend ($)</Label>
        <Input
          type="number"
          min={0}
          value={entry.monthlySpend}
          onChange={(e) =>
            onChange({ ...entry, monthlySpend: Number(e.target.value) })
          }
          placeholder="e.g. 40"
        />
      </div>

      {/* Seats */}
      <div className="space-y-1">
        <Label>Seats</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            min={1}
            value={entry.seats}
            onChange={(e) =>
              onChange({ ...entry, seats: Number(e.target.value) })
            }
            placeholder="e.g. 3"
          />
          {canRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="shrink-0 text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}