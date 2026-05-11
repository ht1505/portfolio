import type { NavLink, SocialLink, Stat } from "@/lib/types";

export const navLinks: NavLink[] = [
  { href: "#hero",              label: "Home" },
  { href: "#about",             label: "About" },
  { href: "#skills",            label: "Skills" },
  { href: "#featured-projects", label: "Projects" },
  { href: "#music-journey",     label: "Music" },
  { href: "#experience",        label: "Experience" },
  { href: "#contact",           label: "Contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Email",    href: "mailto:thackerhitesh1505@gmail.com",                  icon: "✉️" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hitesh-thacker-b22682284/", icon: "💼" },
  { label: "GitHub",   href: "https://github.com/ht1505",                          icon: "🐙" },
];

export const heroStats: Stat[] = [
  { value: "6/7",   label: "Visharad Levels", color: "#a78bfa" },
  { value: "4+",    label: "Awards Won",       color: "#22d3ee" },
  { value: "2300+", label: "Hackathon Devs",   color: "#fbbf24" },
];

export const aboutStats: Stat[] = [
  { value: "6/7",   label: "Visharad Levels Completed", color: "#a78bfa" },
  { value: "4+",    label: "Music Awards Won",           color: "#22d3ee" },
  { value: "2300+", label: "Hackathon Participants Led", color: "#fbbf24" },
  { value: "3+",    label: "AI Projects Shipped",        color: "#a78bfa" },
];

export const heroRoles: string[] = [
  "Full-Stack Developer",
  "AI / ML Engineer",
  "Tabla Artist",
  "Creative Technologist",
];
