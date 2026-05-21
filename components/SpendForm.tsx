"use client";

import { useState, useEffect } from "react";
import { AuditInput, ToolEntry, ToolName, UseCase } from "@/types";
import ToolRow from "./ToolRow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

const STORAGE_KEY = "ai-spend-audit-form";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function defaultTool(): ToolEntry {
  return {
    id: generateId(),
    tool: "cursor" as ToolName,
    plan: "pro",
    monthlySpend: 20,
    seats: 1,
  };
}

interface SpendFormProps {
  onSubmit: (input: AuditInput & { email?: string }) => void;
  isLoading: boolean;
}

export default function SpendForm({ onSubmit, isLoading }: SpendFormProps) {
  const [tools, setTools] = useState<ToolEntry[]>([defaultTool()]);
  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState<UseCase>("coding");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tools) setTools(parsed.tools);
        if (parsed.teamSize) setTeamSize(parsed.teamSize);
        if (parsed.useCase) setUseCase(parsed.useCase);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tools, teamSize, useCase })
    );
  }, [tools, teamSize, useCase]);

  function addTool() {
    setTools((prev) => [...prev, defaultTool()]);
  }

  function removeTool(id: string) {
    setTools((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTool(id: string, updated: ToolEntry) {
    setTools((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  function handleSubmit() {
    onSubmit({ tools, teamSize, useCase, email });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {tools.map((entry) => (
          <ToolRow
            key={entry.id}
            entry={entry}
            onChange={(updated) => updateTool(entry.id, updated)}
            onRemove={() => removeTool(entry.id)}
            canRemove={tools.length > 1}
          />
        ))}
      </div>

      <Button variant="outline" onClick={addTool} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add another tool
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-card">
        <div className="space-y-1">
          <Label>Team Size</Label>
          <Input
            type="number"
            min={1}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            placeholder="Total people on team"
          />
        </div>
        <div className="space-y-1">
          <Label>Primary Use Case</Label>
          <Select
            value={useCase}
            onValueChange={(val) => setUseCase(val as UseCase)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coding">Coding</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
              <SelectItem value="data">Data Analysis</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label>Your email (optional - for pricing change alerts)</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full h-12 text-base font-semibold"
      >
        {isLoading ? "Analyzing your spend..." : "Run My Free Audit →"}
      </Button>
    </div>
  );
}