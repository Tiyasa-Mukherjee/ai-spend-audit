import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, auditId, companyName, role, teamSize } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("leads").insert({
      audit_id: auditId,
      email,
      company_name: companyName,
      role,
      team_size: teamSize,
    });

    if (error) {
      console.error("Lead save error:", error);
      return NextResponse.json(
        { error: "Failed to save" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}