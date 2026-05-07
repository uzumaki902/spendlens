export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export interface Plan {
  name: string;
  pricePerSeat: number;
  pricingUrl: string;
  minSeats?: number;
  bestFor: string;
}

export interface Tool {
  id: string;
  name: string;
  category: "coding" | "chat" | "api";
  useCases: UseCase[];
  plans: Plan[];
}

export const tools: Tool[] = [
  {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    useCases: ["coding"],
    plans: [
      {
        name: "Hobby",
        pricePerSeat: 0,
        pricingUrl: "https://cursor.com/pricing",
        bestFor: "Trying out Cursor personally",
      },
      {
        name: "Pro",
        pricePerSeat: 20,
        pricingUrl: "https://cursor.com/pricing",
        bestFor: "Individual developers",
      },
      {
        name: "Business",
        pricePerSeat: 40,
        pricingUrl: "https://cursor.com/pricing",
        minSeats: 5,
        bestFor: "Engineering teams with collaboration needs",
      },
      {
        name: "Enterprise",
        pricePerSeat: 0,
        pricingUrl: "https://cursor.com/pricing",
        bestFor: "Custom enterprise pricing with SSO and admin controls",
      },
    ],
  },

  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "coding",
    useCases: ["coding"],
    plans: [
      {
        name: "Individual",
        pricePerSeat: 10,
        pricingUrl: "https://github.com/features/copilot/plans",
        bestFor: "Solo developers",
      },
      {
        name: "Business",
        pricePerSeat: 19,
        pricingUrl: "https://github.com/features/copilot/plans",
        bestFor: "Engineering teams",
      },
      {
        name: "Enterprise",
        pricePerSeat: 39,
        pricingUrl: "https://github.com/features/copilot/plans",
        bestFor: "Large organizations with governance controls",
      },
    ],
  },

  {
    id: "claude",
    name: "Claude",
    category: "chat",
    useCases: ["writing", "coding", "research", "mixed"],
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        pricingUrl: "https://claude.ai/pricing",
        bestFor: "Occasional use",
      },
      {
        name: "Pro",
        pricePerSeat: 20,
        pricingUrl: "https://claude.ai/pricing",
        bestFor: "Individual power users",
      },
      {
        name: "Max",
        pricePerSeat: 100,
        pricingUrl: "https://claude.ai/pricing",
        bestFor: "Heavy individual AI usage",
      },
      {
        name: "Team",
        pricePerSeat: 30,
        pricingUrl: "https://claude.ai/pricing",
        minSeats: 5,
        bestFor: "Collaborative AI usage across teams",
      },
      {
        name: "Enterprise",
        pricePerSeat: 0,
        pricingUrl: "https://claude.ai/enterprise",
        bestFor: "Custom enterprise deployment",
      },
      {
        name: "API",
        pricePerSeat: 0,
        pricingUrl: "https://www.anthropic.com/pricing#api",
        bestFor: "Token-based API usage",
      },
    ],
  },

  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "chat",
    useCases: ["writing", "coding", "research", "mixed"],
    plans: [
      {
        name: "Plus",
        pricePerSeat: 20,
        pricingUrl: "https://openai.com/chatgpt/pricing",
        bestFor: "Individual productivity",
      },
      {
        name: "Team",
        pricePerSeat: 30,
        pricingUrl: "https://openai.com/chatgpt/pricing",
        minSeats: 2,
        bestFor: "Small collaborative teams",
      },
      {
        name: "Enterprise",
        pricePerSeat: 0,
        pricingUrl: "https://openai.com/enterprise-privacy",
        bestFor: "Large organizations with compliance needs",
      },
      {
        name: "API",
        pricePerSeat: 0,
        pricingUrl: "https://openai.com/api/pricing",
        bestFor: "Usage-based API access",
      },
    ],
  },

  {
    id: "anthropic-api",
    name: "Anthropic API",
    category: "api",
    useCases: ["coding", "mixed"],
    plans: [
      {
        name: "Pay as you go",
        pricePerSeat: 0,
        pricingUrl: "https://www.anthropic.com/pricing#api",
        bestFor: "Token-based billing",
      },
    ],
  },

  {
    id: "openai-api",
    name: "OpenAI API",
    category: "api",
    useCases: ["coding", "mixed"],
    plans: [
      {
        name: "Pay as you go",
        pricePerSeat: 0,
        pricingUrl: "https://openai.com/api/pricing",
        bestFor: "Usage-based billing",
      },
    ],
  },

  {
    id: "gemini",
    name: "Gemini",
    category: "chat",
    useCases: ["writing", "research", "mixed"],
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        pricingUrl: "https://gemini.google/pricing",
        bestFor: "Casual usage",
      },
      {
        name: "Advanced",
        pricePerSeat: 20,
        pricingUrl: "https://gemini.google/pricing",
        bestFor: "Power users",
      },
      {
        name: "Business",
        pricePerSeat: 24,
        pricingUrl: "https://workspace.google.com/pricing",
        bestFor: "Google Workspace teams",
      },
      {
        name: "API",
        pricePerSeat: 0,
        pricingUrl: "https://ai.google.dev/pricing",
        bestFor: "Developers using Gemini API",
      },
    ],
  },

  {
    id: "windsurf",
    name: "Windsurf",
    category: "coding",
    useCases: ["coding"],
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        pricingUrl: "https://windsurf.com/pricing",
        bestFor: "Trying the editor",
      },
      {
        name: "Pro",
        pricePerSeat: 15,
        pricingUrl: "https://windsurf.com/pricing",
        bestFor: "Individual developers",
      },
      {
        name: "Teams",
        pricePerSeat: 35,
        pricingUrl: "https://windsurf.com/pricing",
        minSeats: 3,
        bestFor: "Small engineering teams",
      },
    ],
  },
];
