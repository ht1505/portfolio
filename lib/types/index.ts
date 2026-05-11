// ─── Project Types ──────────────────────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  tech: string[];
  emoji: string;
  color: string;
  github: string;
}

export interface MiniProject {
  title: string;
  desc: string;
  href: string;
}

// ─── Skills Types ───────────────────────────────────────────────────────────
export interface OrbitRing {
  skills: string[];
  radius: number;
  duration: number;
  color: string;
}

// ─── Experience Types ────────────────────────────────────────────────────────
export interface ExperienceItem {
  role: string;
  period: string;
  details: string;
  color: string;
  icon: string;
}

// ─── Music Types ─────────────────────────────────────────────────────────────
export interface Achievement {
  award: string;
  event: string;
  icon: string;
  /** Optional photo for this achievement, relative to /public e.g. "/images/award-vaudeville-2025.jpg" */
  image?: string;
}

// ─── Navigation Types ────────────────────────────────────────────────────────
export interface NavLink {
  href: string;
  label: string;
}

// ─── Social Link Types ───────────────────────────────────────────────────────
export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

// ─── Stat Types ──────────────────────────────────────────────────────────────
export interface Stat {
  value: string;
  label: string;
  color: string;
}
