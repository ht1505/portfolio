import type { MiniProject, Project } from "@/lib/types";

export const featuredProjects: Project[] = [
  {
    title: "AI Inventory Management",
    description:
      "Full-stack inventory system with multi-warehouse support and an AI chatbot for real-time operational insights.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AI API"],
    emoji: "📦",
    color: "#7c3aed",
    github: "https://github.com/ht1505/CoreInventory",
  },
  {
    title: "Vendor Performance Analytics",
    description:
      "End-to-end analytics pipeline with KPI tracking, hypothesis testing, and interactive Power BI dashboards.",
    tech: ["Python", "SQL", "Power BI"],
    emoji: "📊",
    color: "#06b6d4",
    github: "https://github.com/ht1505/Vendor-Data-Analytics",
  },
  {
    title: "Zaika — AI Restaurant Platform",
    description:
      "Multi-modal food ordering system with chatbot and voice interaction for a seamless restaurant experience.",
    tech: ["React", "FastAPI", "Supabase"],
    emoji: "🍽️",
    color: "#f59e0b",
    github: "https://github.com/ht1505/Zaika",
  },
  {
    title: "Financial RAG Chatbot",
    description:
      "Retrieval-augmented generation chatbot for analyzing financial documents and generating context-aware insights.",
    tech: ["Python", "Pinecone", "Gemini"],
    emoji: "💹",
    color: "#7c3aed",
    github: "https://github.com/ht1505/rag-financial",
  },
];

export const otherProjects: MiniProject[] = [
  {
    title: "Road Accident Risk Modeling",
    desc: "Risk prediction to identify high-risk driving and geography patterns.",
    href: "https://github.com/ht1505/Road-Accident-Analysis",
  },
  {
    title: "Video Inpainting",
    desc: "Computer vision workflow for object removal and frame-consistent reconstruction.",
    href: "https://github.com/ht1505/video-restoration-gan",
  },
];

export const GITHUB_PROFILE_URL = "https://github.com/ht1505?tab=repositories";
