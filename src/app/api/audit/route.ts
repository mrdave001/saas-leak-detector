// SaaS Leak Detector - Analysis Engine
// Converted from analysis_engine.py to TypeScript for Next.js App Router

const SaaS_MATRIX: Record<string, string[]> = {
  AI_WRITING: ["Jasper", "Copy.ai", "Writesonic", "Anyword", "Rytr"],
  LLM_WRAPPERS: ["ChatPDF", "Perplexity", "Claude", "ChatGPT", "Gemini"],
  CRM: ["Salesforce", "Hubspot", "Pipedrive", "Zoho"],
  PROJECT_MGMT: ["Asana", "Monday", "ClickUp", "Trello", "Notion"],
  COMMUNICATION: ["Slack", "Discord", "Microsoft Teams"],
  DESIGN: ["Figma", "Adobe XD", "Sketch", "Canva"],
  ANALYTICS: ["Google Analytics", "Mixpanel", "Amplitude", "Hotjar"],
  EMAIL_MARKETING: ["Mailchimp", "ConvertKit", "Klaviyo", "Brevo"],
  CLOUD_STORAGE: ["Dropbox", "Google Drive", "OneDrive", "Box"],
  VIDEO_HOSTING: ["Vimeo", "Wistia", "Loom", "Vidyard"],
};

function analyzeLeaks(userStack: string): { findings: string[]; savings: number } {
  const findings: string[] = [];
  let savings = 0;
  const foundTools = userStack.split(",").map((t) => t.trim().toLowerCase());

  for (const [group, tools] of Object.entries(SaaS_MATRIX)) {
    const intersection = tools.filter((t) =>
      foundTools.some((tool) => tool.includes(t.toLowerCase()) || t.toLowerCase().includes(tool))
    );
    if (intersection.length > 1) {
      const savingsAmount = Math.floor(Math.random() * 71) + 30; // 30-100
      findings.push(
        `Redundancy in ${group}: You are paying for ${intersection.join(", ")}. Consolidating these could save ~€${savingsAmount}/mo.`
      );
      savings += savingsAmount;
    }
  }

  if (findings.length === 0) {
    const fallbackSavings = Math.floor(Math.random() * 31) + 10; // 10-40
    findings.push(
      "No obvious redundancies found, but your pricing tiers may be inefficient."
    );
    savings = fallbackSavings;
  }

  return { findings, savings };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stack = body.stack || "";

    if (!stack.trim()) {
      return new Response(
        JSON.stringify({ error: "No stack provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { findings, savings } = analyzeLeaks(stack);

    return new Response(
      JSON.stringify({
        findings,
        estimated_savings: savings,
        report_url: "https://buy.stripe.com/test_link_placeholder",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
