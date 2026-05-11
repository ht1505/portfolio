"use client";

import { useEffect, useState } from "react";

// Layout
import { CustomCursor }   from "@/components/ui/CustomCursor";
import { ParticleField }  from "@/components/ui/ParticleField";
import { FloatingNav }    from "@/components/layout/FloatingNav";
import { LoadingScreen }  from "@/components/layout/LoadingScreen";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Footer }         from "@/components/layout/Footer";

// Sections
import { Hero }       from "@/components/sections/Hero";
import { About }      from "@/components/sections/About";
import { Skills }     from "@/components/sections/Skills";
import { Projects }   from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Music }      from "@/components/sections/Music";
import { Contact }    from "@/components/sections/Contact";

/** Loading duration in milliseconds. */
const LOADING_DURATION_MS = 2200;

/**
 * PortfolioPage — root client component that:
 *  1. Shows a branded loading screen for 2.2 s
 *  2. Mounts global overlays (cursor, particles, nav, scroll progress)
 *  3. Renders all page sections in order
 */
export function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), LOADING_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── Global overlays ─────────────────────────────────── */}
      <LoadingScreen isVisible={isLoading} />
      <CustomCursor />
      <ScrollProgress />
      <FloatingNav />
      <ParticleField />

      {/* Fixed aurora backdrop */}
      <div className="aurora-bg pointer-events-none fixed inset-0 z-0" aria-hidden="true" />

      {/* ── Page content ────────────────────────────────────── */}
      <main id="main-content" className="relative z-10 overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Music />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
