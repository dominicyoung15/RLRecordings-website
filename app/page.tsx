"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Vocal Presets", href: "#vocal-presets" },
    { label: "Templates", href: "#templates" },
    { label: "Discography", href: "#discography" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex flex-col group">
            <span className="text-2xl font-black tracking-widest text-white uppercase leading-none group-hover:text-orange-400 transition-colors duration-300">
              R&L
            </span>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-orange-500 uppercase leading-none">
              RECORDINGS
            </span>
            <span className="text-[8px] tracking-[0.15em] text-white/40 uppercase leading-tight mt-0.5 hidden sm:block">
              Professional Audio Engineering & Production
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase hover:text-orange-400 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-black font-black text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold tracking-[0.2em] text-white/70 uppercase hover:text-orange-400 transition-colors duration-300 py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-black text-sm tracking-[0.15em] uppercase rounded-full text-center transition-all duration-300"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 hero-radial pointer-events-none" />
      <div className="absolute inset-0 hero-radial-right pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Horizontal line accent */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-orange-500/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 pulse-dot" />
              <span className="text-xs font-bold tracking-[0.25em] text-orange-400 uppercase">
                Premium Audio Engineering
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.92] tracking-tight mb-8"
            >
              Elevate
              <br />
              <span className="text-gradient-orange">Your Sound</span>
              <br />
              <span className="text-white/90">To Industry</span>
              <br />
              <span className="text-white">Level</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl"
            >
              R&L Recordings delivers polished mixes, powerful masters, custom vocal presets,
              and professional templates designed for artists, producers, and creators who want
              a commercial-quality sound.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#contact"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-black text-sm tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40 orange-glow-sm"
              >
                Book A Session
              </a>
              <a
                href="#discography"
                className="px-8 py-4 text-white font-bold text-sm tracking-[0.15em] uppercase rounded-full border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                Listen To Samples
              </a>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { icon: "%", label: "50% Off", sub: "Custom Beats" },
                { icon: "⚡", label: "24hr", sub: "Fast Turnaround" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card-orange rounded-2xl px-6 py-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-orange-400 text-lg font-black border border-orange-500/20"
                    style={{ background: "rgba(249,115,22,0.15)" }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-white font-black text-sm tracking-wide">{stat.label}</div>
                    <div className="text-white/50 text-xs">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="float-animation"
          >
            <div className="glass-card rounded-3xl p-8 border border-orange-500/20 orange-glow relative overflow-hidden">
              {/* Card background glow */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(249,115,22,0.10)" }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(234,88,12,0.07)" }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-xs font-bold tracking-[0.25em] text-orange-400 uppercase mb-1">
                      R&L Recordings
                    </div>
                    <div className="text-white font-black text-xl">Service Packages</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-orange-500/30"
                    style={{ background: "rgba(249,115,22,0.15)" }}>
                    <span className="text-orange-400 text-xl">♪</span>
                  </div>
                </div>

                {[
                  { name: "Single Mix & Master", price: "$35", tag: "Most Popular" },
                  { name: "Vocal Preset Chain", price: "$20", tag: null },
                  { name: "Studio Template", price: "$20", tag: null },
                  { name: "Album Mix & Master", price: "$500", tag: "Best Value" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-150 transition-transform duration-300 flex-shrink-0" />
                      <span className="text-white/80 text-sm font-medium">{item.name}</span>
                      {item.tag && (
                        <span className="text-[10px] font-bold tracking-wider text-orange-400 px-2 py-0.5 rounded-full uppercase"
                          style={{ background: "rgba(249,115,22,0.10)" }}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-orange-400 font-black text-base ml-4">{item.price}</span>
                  </div>
                ))}

                <a
                  href="#contact"
                  className="mt-6 w-full block text-center py-4 bg-orange-500 hover:bg-orange-400 text-black font-black text-sm tracking-[0.15em] uppercase rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

const services: {
  number: string;
  title: string;
  price: string;
  icon: string;
  description: string;
  features: string[];
  purchaseUrl?: string;
}[] = [
  {
    number: "01",
    title: "Mixing Service",
    price: "$35",
    icon: "🎚",
    description:
      "Professional mix-down for your single or EP. Full stereo balance, EQ sculpting, compression, spatial effects, and stem organization. Delivered in 24 hours.",
    features: ["Stereo Balance & EQ", "Compression & Limiting", "Reverb & Delays", "24hr Delivery"],
    purchaseUrl: "https://nxptune836.beatstars.com/services/141422",
  },
  {
    number: "02",
    title: "Mastering Service",
    price: "$35",
    icon: "🔊",
    description:
      "Industry-standard mastering for streaming platforms. Loudness optimization, final EQ shaping, stereo widening, and ISRC-ready WAV & MP3 exports.",
    features: ["Loudness Optimization", "Streaming-Ready Export", "Stereo Enhancement", "WAV & MP3 Formats"],
    purchaseUrl: "https://nxptune836.beatstars.com/services/142398",
  },
  {
    number: "03",
    title: "Album Mix & Master",
    price: "$500",
    icon: "💿",
    description:
      "Full album treatment — up to 20 tracks mixed and mastered as a cohesive body of work. Uniform tonality, consistent loudness, and premium vinyl-ready masters.",
    features: ["Up to 20 Tracks", "Cohesive Album Flow", "Vinyl & Digital Ready", "Priority Support"],
    purchaseUrl: "https://nxptune836.beatstars.com/services/141550",
  },
];

function ServicesSection() {
  return (
    <Section id="services" className="py-32 bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(249,115,22,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-20 text-center">
          <span className="text-xs font-black tracking-[0.35em] text-orange-400 uppercase">
            What We Offer
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Premium{" "}
            <span className="text-gradient-orange">Audio Services</span>
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
            Every project handled with precision, passion, and professional-grade tools used
            by top-charting engineers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card rounded-3xl p-8 border border-white/5 hover:border-orange-500/40 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.04), rgba(234,88,12,0.08))" }} />

              <div className="relative z-10">
                {/* Faded number */}
                <span className="absolute -top-2 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none text-white/[0.03] group-hover:text-orange-500/[0.06] transition-colors duration-500">
                  {service.number}
                </span>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-110 transition-all duration-300"
                  style={{ background: "rgba(249,115,22,0.10)" }}>
                  <span className="text-2xl">{service.icon}</span>
                </div>

                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{service.description}</p>

                <ul className="space-y-2 mb-8">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest">Starting at</div>
                    <div className="text-3xl font-black text-orange-400">{service.price}</div>
                  </div>
                  <a
                    href={service.purchaseUrl ?? "#contact"}
                    target={service.purchaseUrl ? "_blank" : undefined}
                    rel={service.purchaseUrl ? "noopener noreferrer" : undefined}
                    className="px-6 py-3 text-orange-400 hover:text-black font-black text-xs tracking-[0.15em] uppercase rounded-full border border-orange-500/30 hover:border-orange-500 transition-all duration-300"
                    style={{ background: "rgba(249,115,22,0.08)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgb(249,115,22)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(249,115,22,0.08)";
                    }}
                  >
                    Purchase
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Vocal Presets Section ────────────────────────────────────────────────────

const presets = [
  {
    name: "Lil Baby Vocal Preset",
    genre: "Trap / Hip-Hop",
    description:
      "Punchy, saturated vocal chain built for modern trap. Heavy compression, hi-freq air, tuned delay throws, and the signature transient crack that cuts through any beat.",
    price: "$20",
    daw: "Pro Tools & FL Studio",
    gradientFrom: "rgba(154,52,18,0.3)",
    gradientTo: "rgba(0,0,0,0)",
    bars: [4, 7, 5, 9, 6, 8, 5, 7, 4, 6, 8, 5, 7, 9, 6],
  },
  {
    name: "Female R&B Preset",
    genre: "R&B / Soul",
    description:
      "Silky smooth vocal processing inspired by top R&B engineers. Warm saturation, gentle de-essing, lush reverb tail, and transparent compression for emotional depth.",
    price: "$20",
    daw: "Pro Tools & Logic",
    gradientFrom: "rgba(180,83,9,0.3)",
    gradientTo: "rgba(0,0,0,0)",
    bars: [6, 4, 8, 5, 9, 7, 5, 8, 6, 4, 7, 9, 5, 6, 8],
    link: "https://nxptune836.beatstars.com/sound-kits/female-r-b-vocal-preset-271214",
  },
  {
    name: "Aggressive Rap Preset",
    genre: "Rap / Drill",
    description:
      "Raw, in-your-face vocal chain for drill and aggressive rap. Parallel compression, distorted saturation, tight room reverb, and massive low-end body.",
    price: "$20",
    daw: "Pro Tools & Ableton",
    gradientFrom: "rgba(185,28,28,0.3)",
    gradientTo: "rgba(0,0,0,0)",
    bars: [9, 6, 7, 4, 8, 5, 9, 6, 7, 5, 8, 4, 9, 7, 5],
    link: "https://nxptune836.beatstars.com/sound-kits/the-rap-vocal-preset-271203",
  },
];

function VocalPresetsSection() {
  return (
    <Section id="vocal-presets" className="py-32 bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(249,115,22,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-xs font-black tracking-[0.35em] text-orange-400 uppercase">
                Signature Chains
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                Signature{" "}
                <span className="text-gradient-orange">Vocal Chains</span>
              </h2>
              <p className="mt-4 text-white/50 text-lg max-w-xl">
                Studio-grade vocal preset chains engineered to make your vocals sound commercial
                right out of the box.
              </p>
            </div>
            <div className="glass-card rounded-2xl px-6 py-4 border border-orange-500/20 flex-shrink-0">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-1">All Presets</div>
              <div className="text-3xl font-black text-orange-400">$20 each</div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {presets.map((preset, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-3xl p-8 border border-orange-500/20 hover:border-orange-500/60 group overflow-hidden cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${preset.gradientFrom}, ${preset.gradientTo})`,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Animated glow dot */}
              <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-orange-500 pulse-dot" />
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none transition-all duration-500"
                style={{ background: "rgba(249,115,22,0.08)" }}
              />

              <div className="relative z-10">
                <span className="inline-block text-[10px] font-black tracking-[0.25em] text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full uppercase mb-6"
                  style={{ background: "rgba(249,115,22,0.08)" }}>
                  {preset.genre}
                </span>

                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {preset.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{preset.description}</p>

                <div className="flex items-center gap-2 mb-8">
                  <span className="text-xs text-white/30 uppercase tracking-widest">Compatible:</span>
                  <span className="text-xs font-semibold text-white/60">{preset.daw}</span>
                </div>

                {/* EQ visualizer */}
                <div className="flex items-end gap-1 h-8 mb-8 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                  {preset.bars.map((h, j) => (
                    <div
                      key={j}
                      className="flex-1 bg-orange-500 rounded-sm"
                      style={{ height: `${h * 3.5}px` }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="text-3xl font-black text-orange-400">{preset.price}</div>
                  <a
                    href={preset.link ?? "#contact"}
                    target={preset.link ? "_blank" : undefined}
                    rel={preset.link ? "noopener noreferrer" : undefined}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-black text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                  >
                    Get Preset
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Templates Section ────────────────────────────────────────────────────────

const templates = [
  {
    number: "01",
    title: "FL Studio Recording Template",
    daw: "FL Studio",
    description:
      "Full recording session template built inside FL Studio. Pre-routed vocal chain, beat scaffolding, FX buses, and industry-standard routing ready to record on day one.",
    price: "$20",
    gradientFrom: "rgba(154,52,18,0.15)",
    tags: ["FL Studio 21+", "Vocal Chain", "FX Routing"],
  },
  {
    number: "02",
    title: "Mixing Session Template",
    daw: "Pro Tools",
    description:
      "Pro-grade mixing template with organized stem groups, parallel compression buses, reverb sends, sidechain setups, and metering already in place.",
    price: "$20",
    gradientFrom: "rgba(180,83,9,0.15)",
    tags: ["Pro Tools 2024", "Stem Groups", "Parallel Buses"],
  },
  {
    number: "03",
    title: "Beat Production Template",
    daw: "Ableton Live",
    description:
      "Complete beat production workflow inside Ableton Live. Drum racks, synth racks, MIDI routing, clip launcher, and a mastered signal chain for radio-ready beats.",
    price: "$20",
    gradientFrom: "rgba(185,28,28,0.15)",
    tags: ["Ableton 12+", "Drum Racks", "MIDI Routing"],
  },
];

function TemplatesSection() {
  return (
    <Section id="templates" className="py-32 bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 60%, rgba(249,115,22,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-20 text-center">
          <span className="text-xs font-black tracking-[0.35em] text-orange-400 uppercase">
            Workflow Ready
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Studio Workflow{" "}
            <span className="text-gradient-orange">Templates</span>
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
            Skip the setup. Drop in our templates and start creating in minutes with a
            professional signal chain already built.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {templates.map((tpl, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-3xl p-8 border border-white/5 hover:border-orange-500/40 group overflow-hidden cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${tpl.gradientFrom}, transparent)`,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Big faded number */}
              <span className="absolute -bottom-6 -right-4 text-[8rem] font-black leading-none select-none pointer-events-none transition-colors duration-500"
                style={{ color: "rgba(255,255,255,0.025)" }}>
                {tpl.number}
              </span>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 mb-6"
                  style={{ background: "rgba(255,255,255,0.04)" }}>
                  <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase">
                    {tpl.daw}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-orange-400 transition-colors duration-300">
                  {tpl.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{tpl.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {tpl.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-semibold tracking-wider text-white/50 border border-white/8 px-2.5 py-1 rounded-full uppercase"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="text-3xl font-black text-orange-400">{tpl.price}</div>
                  <a
                    href="#contact"
                    className="px-6 py-3 text-white hover:text-black font-black text-xs tracking-[0.15em] uppercase rounded-full border border-white/10 hover:border-orange-500 transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgb(249,115,22)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                  >
                    Download
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Discography Section ──────────────────────────────────────────────────────

const portfolio = [
  {
    image: "/discography/album1.jpg",
    genre: "Hip-Hop",
    title: "Blend In",
    artist: "YHR Binga",
    role: "Mix & Master",
    bg: "linear-gradient(135deg, #7c2d12, #1c0700)",
  },
  {
    image: "/discography/album2.jpg",
    genre: "RAGE",
    title: "Perfect Timing",
    artist: "HNR Binga",
    role: "Mix & Master",
    bg: "linear-gradient(135deg, #92400e, #1c0a00)",
  },
  {
    image: "/discography/album3.jpg",
    genre: "Trap",
    title: "Dark Matter",
    artist: "Lenz & The Squad",
    role: "Full Production",
    bg: "linear-gradient(135deg, #7f1d1d, #1c0000)",
  },
  {
    image: "/discography/album4.jpg",
    genre: "Pop",
    title: "Golden Hour",
    artist: "Aria Cole",
    role: "Mastering",
    bg: "linear-gradient(135deg, #78350f, #1c0d00)",
  },
  {
    image: "/discography/album5.jpg",
    genre: "Drill",
    title: "100 Shots",
    artist: "Block Archive",
    role: "Production & Engineering",
    bg: "linear-gradient(135deg, #27272a, #000000)",
  },
  {
    image: "/discography/album6.jpg",
    genre: "Soul",
    title: "Deeper Waters",
    artist: "Maya Ellis",
    role: "Mix & Master",
    bg: "linear-gradient(135deg, #9a3412, #1c0500)",
  },
];

function DiscographySection() {
  return (
    <Section id="discography" className="py-32 bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-20 text-center">
          <span className="text-xs font-black tracking-[0.35em] text-orange-400 uppercase">
            Our Work
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Discography
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
            A portfolio of projects engineered, mixed, mastered, and produced at R&L Recordings
            — from underground releases to commercial releases.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-orange-500/50 group cursor-pointer relative"
            >
              {/* Album artwork */}
              <div
                className="relative h-64 overflow-hidden"
                style={{ background: item.bg }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/40 transition-all duration-500" />

                {/* Placeholder visual when no image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-6xl opacity-20 mb-2">♫</span>
                  <span className="text-xs font-black tracking-[0.3em] text-white/20 uppercase">
                    {item.genre}
                  </span>
                </div>

                {/* Genre badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-black tracking-[0.2em] text-white px-3 py-1.5 rounded-full uppercase bg-orange-500/90">
                    {item.genre}
                  </span>
                </div>

                {/* Role badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[9px] font-bold tracking-wider text-white/80 px-2.5 py-1 rounded-full uppercase border border-white/10"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
                    {item.role}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors duration-300 mb-1">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm mb-5">{item.artist}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                      {item.role}
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs font-black tracking-[0.15em] text-orange-400 hover:text-orange-300 uppercase flex items-center gap-1.5 group/btn transition-colors duration-200"
                  >
                    View Project
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-200 inline-block">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact CTA Section ──────────────────────────────────────────────────────

function ContactSection() {
  return (
    <Section id="contact" className="py-32 bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249,115,22,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={cardVariant}
          className="glass-card-orange rounded-[2rem] p-12 sm:p-16 lg:p-20 border border-orange-500/25 text-center relative overflow-hidden orange-glow"
        >
          {/* Decorative orbs */}
          <div
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(249,115,22,0.10)" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(234,88,12,0.07)" }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

          <div className="relative z-10">
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-black tracking-[0.35em] text-orange-400 uppercase mb-6"
            >
              Let&apos;s Work Together
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-8 leading-tight"
            >
              Ready To Upgrade
              <br />
              <span className="text-gradient-orange">Your Sound?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Secure your mix, master, vocal preset, or template package today and take your
              music to a professional level with R&L Recordings.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:contact@rlrecordings.com"
                className="px-10 py-5 bg-orange-500 hover:bg-orange-400 text-black font-black text-sm tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40"
              >
                Book A Session
              </a>
              <a
                href="mailto:contact@rlrecordings.com"
                className="px-10 py-5 text-white font-bold text-sm tracking-[0.15em] uppercase rounded-full border border-white/15 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                Contact Now
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              className="mt-14 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8"
            >
              {[
                { icon: "⚡", label: "24hr Fast Turnaround" },
                { icon: "🎚", label: "Industry-Grade Tools" },
                { icon: "🏆", label: "Premium Quality" },
                { icon: "🔁", label: "Unlimited Revisions" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-white/40">
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-xs font-semibold tracking-wider uppercase">{b.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: "Services", href: "#services" },
    { label: "Vocal Presets", href: "#vocal-presets" },
    { label: "Templates", href: "#templates" },
    { label: "Discography", href: "#discography" },
    { label: "Book Now", href: "#contact" },
  ];

  return (
    <footer className="bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="flex-shrink-0">
            <div className="mb-3">
              <span className="text-3xl font-black tracking-widest text-white uppercase leading-none">
                R&L
              </span>
              <span className="block text-xs font-black tracking-[0.4em] text-orange-500 uppercase mt-0.5">
                RECORDINGS
              </span>
            </div>
            <p className="text-white/35 text-xs leading-relaxed max-w-xs">
              Professional Audio Engineering & Production.
              <br />
              Bringing your music to a commercial level.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold tracking-[0.2em] text-white/40 hover:text-orange-400 uppercase transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="my-10 h-px bg-white/5" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-white/25 text-xs tracking-wider">
            © {new Date().getFullYear()} R&L Recordings. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 pulse-dot" />
            <span className="text-white/25 text-xs tracking-widest uppercase">
              Currently Accepting Projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-black min-h-screen noise-overlay">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <VocalPresetsSection />
      <TemplatesSection />
      <DiscographySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
