import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Animations
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Reusable Card (equal-height w/ bottom-aligned button)
function AnimatedCard({ title, price, subtitle, items = [], cta = "Learn More", href = "#", badge }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (href.startsWith("http")) {
          e.preventDefault();
          window.open(href, "_blank", "noopener,noreferrer");
        }
      }}
      variants={fadeUp}
      whileHover={{ y: -4, rotateX: 1.5, rotateY: -1.5, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[#0f1218]/90 px-6 pt-12 pb-8 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(1200px 300px at 0% 0%, rgba(37,99,235,.25), transparent), radial-gradient(1200px 300px at 100% 100%, rgba(168,85,247,.25), transparent)",
        }}
      />

      {badge ? (
        <span className="absolute top-4 left-6 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300 shadow-sm">
          {badge}
        </span>
      ) : null}

      <div className="relative flex-1 flex flex-col">
        <div>
          <h3 className="text-lg font-semibold text-white/90 tracking-tight leading-snug">{title}</h3>
          {price ? (
            <div className="mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 leading-snug">
              {price} {subtitle ? <span className="text-base font-medium text-white/70">{subtitle}</span> : null}
            </div>
          ) : null}
          {items && items.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {items.map((text, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span aria-hidden="true">✓ </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {/* spacer pushes button to bottom */}
        <div className="flex-1" />
        <div className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] group-hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)]">
          {cta}
        </div>
      </div>

      {/* subtle top shimmer */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
    </motion.a>
  );
}

// Shared Contact Modal component
function ContactModal({ open, onClose }) {
  if (!open) return null;
  return (
    <>
      {/* modal backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
      />

      {/* modal panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        className="fixed z-[90] inset-0 grid place-items-center p-6"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218] shadow-2xl">
          <div
            className="absolute -inset-px opacity-40 blur-2xl"
            style={{
              background:
                "radial-gradient(24rem 14rem at 20% 0%, rgba(168,85,247,.25), transparent 60%), radial-gradient(20rem 12rem at 80% 100%, rgba(59,130,246,.25), transparent 60%)",
            }}
          />
          <div className="relative p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-white/90 tracking-tight">Get Started</h3>
              <button
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <p className="mt-2 text-sm text-white/70">Thanks for your interest! Please contact me on either</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-white/80">Snapchat</span>
                <span className="font-medium text-white">@willy.enhanced</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-white/80">Tiktok DM</span>
                <a
                  href="https://www.tiktok.com/@enhancements_explained"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  @enhancements_explained
                </a>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Instagram DM</span>
                  <span className="font-medium text-white">@willy_enhanced</span>
                </div>
                <p className="mt-1 text-xs text-white/60">I don't use insta primarily, I'd prefer other contact methods</p>
              </div>
            </div>

            {/* payment methods */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white/80">Payment Methods</h4>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-white/10 grid place-items-center text-white/80 font-semibold">V</div>
                  <div>
                    <div className="text-white/90 font-medium leading-tight">Venmo</div>
                    <div className="text-xs text-white/60">DM for handle</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-white/10 grid place-items-center text-white/80 font-semibold">Z</div>
                  <div>
                    <div className="text-white/90 font-medium leading-tight">Zelle</div>
                    <div className="text-xs text-white/60">DM for handle</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-white/10 grid place-items-center text-white/80 font-semibold">P</div>
                  <div>
                    <div className="text-white/90 font-medium leading-tight">PayPal</div>
                    <div className="text-xs text-white/60">DM for handle</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Coaching (Learn More) Page — now uses shared modal via props
function CoachingPage({ onOpen }) {
  return (
    <div className="relative">
      {/* animated background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-1/2 top-1/2 h-[70rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,.15), transparent 65%)" }}
        animate={{ scale: [1, 1.07, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* hero */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#12141a]/90 to-[#0c0e13]/90">
          <div
            className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl"
            style={{
              background:
                "radial-gradient(30rem 16rem at 15% 10%, rgba(168,85,247,.35), transparent 60%), radial-gradient(28rem 14rem at 80% 80%, rgba(59,130,246,.28), transparent 60%)",
            }}
          />
          <div className="relative p-8 md:p-12">
            <motion.h1
              className="text-3xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/65"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Coaching
            </motion.h1>
            <p className="mt-3 text-white/70 max-w-2xl">Deep-dive support, built around your biology.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition">← Back to Home</a>
            </div>
          </div>
        </div>
      </div>

      {/* features */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.section variants={fadeUp} initial="initial" animate="animate" className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218]/80 p-6">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">Custom PED Stacks Tailored To Your Goals</h2>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">Tell me your goals, and everything you want to share. We will work together to design a stack that is tailored specifically for you, and what you're comfortable with.</p>
          </motion.section>

          <motion.section variants={fadeUp} initial="initial" animate="animate" className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218]/80 p-6">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">Height Optimization (If Requested)</h2>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">If you're still developing, you need to take advantage of it. No CJC1295+Ipamorelin cope here. That won't do anything. I'm here to provide you with real height protocols clinically proven to stimulate longitude growth, as well as delay epiphyseal fusion.</p>
          </motion.section>

          <motion.section variants={fadeUp} initial="initial" animate="animate" className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218]/80 p-6">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">Daily Check-Ins</h2>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">Everyday whenever you're available, I will be here to answer any questions or concerns you have regarding gear, peptides, or pharmacology.</p>
          </motion.section>

          <motion.section variants={fadeUp} initial="initial" animate="animate" className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218]/80 p-6">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">24/7 Education Access in DM's</h2>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">I will explain everything you want to know or are curious about any time, one on one.</p>
          </motion.section>

          <motion.section variants={fadeUp} initial="initial" animate="animate" className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218]/80 p-6">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">1-On-1 Calls</h2>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">Want to talk instead of type? That's great. I'll call when I'm available if you have anything you want to talk about.</p>
          </motion.section>

          <motion.section variants={fadeUp} initial="initial" animate="animate" className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218]/80 p-6">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">Extremely In-Depth Explanations of PEDs & Pharmacology Related Topics</h2>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">Understanding what you’re taking matters. If you want to know the exact mechanisms of action, pathways, or pharmacological interactions of a PED, peptide, or pharmaceutical, I’ll provide in-depth but easy-to-grasp explanations. My goal is to give you the knowledge so you can make informed decisions instead of blindly following a plan.</p>
          </motion.section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex items-center justify-center">
          <button onClick={onOpen} className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white transition shadow-[0_10px_30px_-10px_rgba(37,99,235,0.7)]">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

// Home Page — Book Now also opens the same modal (via props)
function HomePage({ onOpen }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-12 relative">
      {/* hero */}
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="text-center">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-snug">
          Tailored PED/Peptide Protocols • Height Protocols
        </h1>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mt-2 leading-snug">
          1 on 1 Calls & Education
        </h2>
      </motion.div>

      {/* consultation banner */}
      <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} className="mx-auto max-w-3xl">
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#12141a]/90 p-5">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-20 rounded-[2rem] blur-3xl"
            style={{
              background:
                "radial-gradient(18rem 14rem at 20% 30%, rgba(168,85,247,.35), transparent 60%), radial-gradient(16rem 12rem at 70% 70%, rgba(59,130,246,.25), transparent 60%)",
              opacity: 0.55,
            }}
            animate={{ x: [-30, 40, -20, 0], y: [0, -20, 20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm md:text-base text-white/90 font-medium">Book 45 minute consultation</p>
              <p className="text-xs md:text-sm text-white/60">Get to know me, ask questions, voice any concerns you have about coaching.</p>
            </div>
            <div className="hidden md:block text-white/80 font-semibold">$25</div>
            <button onClick={onOpen} className="shrink-0 inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.7)]">Book Now</button>
          </div>
        </div>
      </motion.div>

      {/* grid cards */}
      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} className="grid gap-6 md:grid-cols-3 items-stretch">
        <AnimatedCard
          title="Coaching"
          price="$45"
          subtitle="/week"
          badge="Popular"
          href="#/coaching"
          cta="Get Started"
          items={[
            "Custom PED stacks tailored to your goals",
            "Height optimization protocol",
            "Daily check-ins & training/diet guidance",
            "Harm mitigation & 24/7 DM access",
            "1-on-1 calls & full breakdowns",
            "Ask me anything about PEDs or pharmacology 24/7 in DMs — I’ll give in-depth explanations and mechanisms of action",
          ]}
        />

        <div onClick={() => onOpen()}>
          <AnimatedCard
            title="Source List"
            price="$20"
            subtitle="one-time"
            href="#"
            cta="Purchase"
            items={[
              "Cheap Chinese based sources for Gear/Peptides/Nootropics and other ancillaries",
              "US based options as well",
              "All verified to be legit",
            ]}
          />
        </div>

        <AnimatedCard
          title="Education Library"
          price="Free"
          href="https://www.tiktok.com/@enhancements_explained"
          cta="Access"
          items={[
            "In-depth short form context about PED/pharmacology related topics",
            "Regular new posts",
          ]}
        />
      </motion.div>

      {/* disclaimer */}
      <div className="mt-12 text-xs text-white/50 max-w-3xl mx-auto leading-relaxed">
        I do not sell, distribute, or facilitate the purchase of controlled or illegal substances. This product is a list of information offered for educational/research purposes only. By buying you must comply with all local laws. Use at your own risk. Consult a qualified medical professional before making health decisions.
      </div>
    </main>
  );
}

// Main App + simple hash router + header/footer + shared modal state
export default function App() {
  const [route, setRoute] = useState(typeof window !== "undefined" ? window.location.hash : "#");
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isCoaching = route === "#/coaching";

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-100 relative overflow-hidden">
      {/* global background accents */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle at 30% 30%, #1f2937 0%, transparent 60%)" }} />
      <div className="pointer-events-none absolute top-1/3 -right-48 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle at 70% 70%, rgba(37,99,235,.25) 0%, transparent 60%)" }} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.04]" />

      {/* header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-tight flex items-center gap-1">
            <span className="text-white">willy</span>
            <span className="text-white/70">.</span>
            <span className="text-white/90">enhancements</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm text-white/60">
            <a href="#/coaching" className="hover:text-white/90 transition">Coaching</a>
            <a href="#sources" className="hover:text-white/90 transition">Sources</a>
          </nav>
        </div>
      </header>

      {/* router switch */}
      {isCoaching ? (
        <CoachingPage onOpen={() => setContactOpen(true)} />
      ) : (
        <HomePage onOpen={() => setContactOpen(true)} />
      )}

      {/* shared modal */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      {/* footer */}
      <footer className="max-w-6xl mx-auto px-6 pb-12 pt-8 text-xs text-white/40">© {new Date().getFullYear()} willy.enhancements</footer>
    </div>
  );
}
