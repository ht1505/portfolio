"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialLinks } from "@/lib/data/site";

/**
 * Web3Forms access key.
 *
 * HOW TO ACTIVATE (one-time, free, 30 seconds):
 *  1. Go to  https://web3forms.com/
 *  2. Enter  thackerhitesh1505@gmail.com  and click "Create Access Key"
 *  3. Check your Gmail inbox — copy the key they send you
 *  4. Open  .env.local  in the project root (create it if it doesn't exist)
 *  5. Add:  NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
 *  6. Restart the dev server (`npm run dev`)
 *
 * Until the key is set, submissions are sent to the demo endpoint and
 * you will see a success state but emails won't arrive.
 */
const W3F_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "demo";

type FormStatus = "idle" | "submitting" | "success" | "error";

const INPUT_STYLE: React.CSSProperties = {
  width:        "100%",
  borderRadius: "0.75rem",
  padding:      "0.75rem 1rem",
  fontSize:     "0.875rem",
  outline:      "none",
  background:   "var(--bg-primary)",
  border:       "1.5px solid var(--border)",
  color:        "var(--text-primary)",
  transition:   "border-color 0.2s ease, box-shadow 0.2s ease",
};

const SOCIAL_COLORS = ["#7c3aed", "#0891b2", "#d97706"];

/** Contact — Web3Forms powered form that delivers messages to your Gmail. */
export function Contact() {
  const [status,  setStatus]  = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");

    const data = new FormData(form);
    // Web3Forms requires the access key as a field
    data.append("access_key", W3F_KEY);
    // Custom subject line in your inbox
    data.append("subject",    "New message from your portfolio website");
    // Reply-to is set automatically from the email field
    data.append("from_name",  "Portfolio Contact Form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { Accept: "application/json" },
        body:    data,
      });
      const json = await res.json() as { success: boolean; message?: string };

      if (json.success) {
        form.reset();
        setMessage("");
        setStatus("success");
      } else {
        console.error("Web3Forms error:", json.message);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit failed:", err);
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative px-6 py-24 sm:px-10 md:py-32"
    >
      {/* Blob accent */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full"
        style={{ background: "var(--blob-1)", filter: "blur(100px)", opacity: 0.5 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          description="Open to collaborations, internships, and impactful engineering opportunities."
          center
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.7fr]">

          {/* ── Sidebar social links ── */}
          <Reveal delay={0.05}>
            <nav aria-label="Direct contact">
              <p className="mb-4 text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                Reach me directly
              </p>
              <ul className="space-y-3">
                {socialLinks.map((s, i) => (
                  <li key={s.label}>
                    <motion.a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex items-center gap-4 rounded-2xl p-4 transition-all"
                      style={{
                        background: "var(--bg-card)",
                        border:     `1.5px solid ${SOCIAL_COLORS[i % SOCIAL_COLORS.length]}22`,
                        boxShadow:  "0 2px 12px var(--shadow)",
                      }}
                      whileHover={{ x: 5, boxShadow: `0 6px 24px ${SOCIAL_COLORS[i % SOCIAL_COLORS.length]}20` }}
                    >
                      <span
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base"
                        style={{ background: `${SOCIAL_COLORS[i % SOCIAL_COLORS.length]}15` }}
                        aria-hidden="true"
                      >
                        {s.icon}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {s.label}
                      </span>
                      <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }} aria-hidden="true">→</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* ── Contact form ── */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="space-y-4 rounded-3xl p-7"
              style={{
                background: "var(--bg-card)",
                border:     "1px solid var(--border)",
                boxShadow:  "0 4px 30px var(--shadow)",
              }}
            >
              {/* Name + Email row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    placeholder="Your name" autoComplete="name"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="you@example.com" autoComplete="email"
                    style={INPUT_STYLE}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  Subject
                </label>
                <input
                  id="subject" name="subject" type="text"
                  placeholder="What's this about?"
                  style={INPUT_STYLE}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message" name="message" required rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your idea or opportunity..."
                  style={{ ...INPUT_STYLE, resize: "vertical" }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </span>
                ) : "Send Message →"}
              </motion.button>

              {/* Feedback */}
              {status === "success" && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-3 text-sm font-medium"
                  style={{ background: "rgba(5,150,105,0.1)", color: "#059669", border: "1px solid rgba(5,150,105,0.2)" }}
                >
                  ✅ Message sent! I'll get back to you at <strong>{(document.getElementById("email") as HTMLInputElement)?.defaultValue || "your email"}</strong> soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-3 text-sm font-medium"
                  style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" }}
                >
                  ❌ Something went wrong. Please try again or email me directly at{" "}
                  <a href="mailto:thackerhitesh1505@gmail.com" className="underline">thackerhitesh1505@gmail.com</a>
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
