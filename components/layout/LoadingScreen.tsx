"use client";

import { AnimatePresence, motion } from "framer-motion";

const BARS = [3, 6, 9, 7, 4, 8, 5, 10, 6, 3, 7, 9, 4, 6, 8];

/**
 * LoadingScreen — full-screen cinematic intro displayed for ~2.2 s.
 * Features:
 *  - Three staggered tabla-style concentric ring pulses
 *  - HT monogram in a gradient pill
 *  - Animated waveform bars at the bottom
 */
export function LoadingScreen({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04020d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {/* Tabla ring pulses */}
          <div className="relative flex h-48 w-48 items-center justify-center">
            {[1, 1.6, 2.2].map((scale, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-violet-500/30"
                style={{ width: 80 * scale, height: 80 * scale }}
                initial={{ opacity: 0.8, scale: 0.2 }}
                animate={{ opacity: 0, scale: 2.4 }}
                transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.4, ease: "easeOut" }}
              />
            ))}
            {[1.1, 1.8].map((scale, i) => (
              <motion.span
                key={`g${i}`}
                className="absolute rounded-full border border-amber-400/20"
                style={{ width: 90 * scale, height: 90 * scale }}
                initial={{ opacity: 0.5, scale: 0.3 }}
                animate={{ opacity: 0, scale: 2.2 }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.8 + i * 0.5, ease: "easeOut" }}
              />
            ))}

            {/* Monogram */}
            <motion.div
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                boxShadow: "0 0 40px rgba(139,92,246,0.6)",
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <span className="text-lg font-bold text-white">HT</span>
            </motion.div>
          </div>

          {/* Waveform */}
          <div className="mt-10 flex items-end gap-1" role="presentation">
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full bg-violet-500/60"
                style={{ height: 4 }}
                animate={{ height: [4, h * 2.2, 4] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.07, ease: "easeInOut" }}
              />
            ))}
          </div>

          <motion.p
            className="mt-6 text-xs tracking-[0.3em] text-slate-500 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
