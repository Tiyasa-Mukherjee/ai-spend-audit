"use client";

import { useState } from "react";
import { AuditInput } from "@/types";
import SpendForm from "@/components/ui/SpendForm";
import { runAudit } from "@/lib/auditEngine";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(input: AuditInput) {
    setIsLoading(true);
    // Audit engine runs client-side for now
    const result = runAudit(input);
    console.log("Audit result:", result);
    // TODO: save to Supabase, get AI summary, redirect to results page
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b bg-card">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
            Free AI Spend Audit
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Are you overpaying for AI tools?
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Enter what you pay for Cursor, Claude, Copilot, and more. Get an
            instant audit showing exactly where you're overspending and how much
            you could save.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <SpendForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </main>
  );
}