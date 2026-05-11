import type { Achievement, SocialLink, Stat } from "@/lib/types";

export const achievements: Achievement[] = [
  { award: "1st Prize", event: "Vaudeville 2025", icon: "🥇", image: "/images/award-vaudeville-2025.jpg" },
  { award: "2nd Prize", event: "PDEU Fest 2024",  icon: "🥈", image: "/images/award-pdeu-2024.jpg" },
  { award: "2nd Prize", event: "Nuzeal 2025",     icon: "🥈", image: "/images/award-nuzeal-2025.jpg" },
  { award: "2nd Prize", event: "Vaudeville 2024", icon: "🥈", image: "/images/award-vaudeville-2024.jpg" },
];

export const waveBars: number[] = [4, 9, 14, 10, 18, 7, 12, 16, 8, 11, 6, 14, 10, 7, 15];

/** Tabla story paragraphs, kept here so Music.tsx stays lean. */
export const tablaStory: string[] = [
  "I've been playing tabla since childhood, working through the traditional Visharad curriculum — completing 6 of 7 levels. Every riyaaz session taught me patience, repetition, and mastery through practice.",
  "I represented Nirma University at the West Zone Inter-University Youth Festival, competing and performing on a national stage.",
  "As Vice President of NUMAISH (Nirma's cultural fest), I led music and arts programming for thousands of students.",
];

export const tablaQuote =
  "Rhythm taught me discipline. Code taught me precision. Together, they make me.";
