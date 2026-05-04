import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "./App";

// ─── Palette (matches App.jsx) ─────────────────────────────────────────────
const C = {
  bg: "#FAFAF7",
  bgAlt: "#F2F0E8",
  lilacBg: "#EDE8FF",
  lilacBorder: "#C4B8F0",
  neon: "#E1FB62",
  ink: "#1a1a1a",
  muted: "#6B6B6B",
  faint: "#ADADAD",
  border: "#E4E2DA",
  purple: "#2d1f5e",
  purpleDark: "#1e1545",
};

// Accent colors for narrative sections (chaos / improvements)
const ACCENT = {
  warn: "#D85A30",     // coral — for "before" / problems
  warnSoft: "#F0997B",
  alert: "#BA7517",    // amber — for caution
  alertSoft: "#EF9F27",
  good: "#4a3a8a",     // muted purple — for "after" / solutions
  goodSoft: "#7F77DD",
};

// ─── Data Library Diagram ──────────────────────────────────────────────────
// Activities where the Contract Details block appears
const ACTIVITIES = [
  { label: "New Quote",      countries: ["FR", "BE"] },
  { label: "New Proposal",   countries: ["FR", "BE"] },
  { label: "Update Details", countries: ["FR", "BE"] },
  { label: "Contract View",  countries: ["FR", "BE"] },
];

// Products that all contain these activities
const PRODUCTS = [
  { label: "Savings",  color: "#5B4BC4" },
  { label: "TradLife", color: "#3D7BC9" },
  { label: "P&C",      color: "#C97A3D" },
  { label: "R&P",      color: "#3D9C7A" },
];

// A single Figma-style file card. Title in header, country variants listed below.
function FigmaFileCard({ activity, countries, accentColor }) {
  return (
    <div style={{ background: "#5D5589", borderRadius: 6, overflow: "hidden" }}>
      {/* Header — activity title */}
      <div style={{ padding: "8px 10px", background: "#6E6699" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.95)", lineHeight: 1.2 }}>{activity}</div>
      </div>

      {/* Body — one line per country variant */}
      <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        {countries.map(c => (
          <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.85)", lineHeight: 1.3 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#FFD9E8", letterSpacing: 0.4, minWidth: 16 }}>{c}</span>
            <span>Contains Contract Details block</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductGroup({ product }) {
  return (
    <div style={{ background: "#4A4373", borderRadius: 10, padding: 12 }}>
      {/* Group header — minimal */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <div style={{ width: 6, height: 6, borderRadius: 2, background: product.color }} />
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.95)", letterSpacing: 0.3, textTransform: "uppercase" }}>{product.label}</div>
      </div>

      {/* Activity cards inside the group */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {ACTIVITIES.map((activity, i) => (
          <FigmaFileCard key={i} activity={activity.label} countries={activity.countries} accentColor={product.color} />
        ))}
      </div>
    </div>
  );
}

function BeforeView() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? 16 : 24 }}>
      {/* The Problem — title parallel to The Idea in After */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>The Problem</div>
        <div style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, maxWidth: 820, margin: "0 auto" }}>
          <span style={{ color: "#fff", fontWeight: 600 }}>Example: Contract Details</span>, a transversal block — it lived inside every product, in every activity, with country-specific variants.
          <br />
          Each file below contained its own version.
        </div>
      </div>

      {/* Product grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        {PRODUCTS.map((p, i) => <ProductGroup key={i} product={p} />)}
      </div>

      {/* Stats — centered, supporting role */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", letterSpacing: 0.3, marginBottom: 4 }}>
          4 products · 4 activities · 2 country variants
        </div>
        <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>
          32 files to keep in sync
        </div>
      </div>
    </div>
  );
}

// Variants matching the actual Figma source — only what's been built
const NINE_VARIANTS = [
  { ctx: "New Proposal",         prod: "All",                be: false },
  { ctx: "New Proposal",         prod: "Savings",            be: false },
  { ctx: "Contract View",        prod: "Savings",            be: false },
  { ctx: "Update Contract Data", prod: "Savings",            be: false },
  { ctx: "New Proposal",         prod: "Savings - Fourgous", be: false },
  { ctx: "New Proposal",         prod: "P&C",                be: false },
  { ctx: "Contract View",        prod: "P&C",                be: false },
  { ctx: "Update Contract Data", prod: "P&C",                be: false },
  { ctx: "New Proposal",         prod: "TradLife",           be: true  },
];

// Screens that contain the Contract Details block — wireframe mockups
const REFERENCE_SCREENS = [
  { label: "New Proposal · Savings" },
  { label: "Contract View · Savings" },
  { label: "Update Contract Data · Savings" },
  { label: "New Proposal · P&C" },
  { label: "Contract View · P&C" },
  { label: "New Proposal · TradLife · BE" },
];

function VariantCard({ variant, n }) {
  return (
    <div style={{ background: "#5D5589", borderRadius: 6, overflow: "hidden" }}>
      {/* Header — variant number */}
      <div style={{ padding: "6px 10px", background: "#6E6699" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>Variant {n}</div>
      </div>

      {/* Body — three attributes */}
      <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", gap: 6, fontSize: 11, lineHeight: 1.4 }}>
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, minWidth: 64 }}>Context:</span>
          <span style={{ color: "#fff", fontWeight: 500 }}>{variant.ctx}</span>
        </div>
        <div style={{ display: "flex", gap: 6, fontSize: 11, lineHeight: 1.4 }}>
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, minWidth: 64 }}>Product:</span>
          <span style={{ color: "#fff", fontWeight: 500 }}>{variant.prod}</span>
        </div>
        <div style={{ display: "flex", gap: 6, fontSize: 11, lineHeight: 1.4 }}>
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, minWidth: 64 }}>BE market:</span>
          <span style={{ color: "#fff", fontWeight: 500 }}>{variant.be ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
}

// Wireframe mockup of a screen — each screen is itself a Figma component
function ScreenMockup({ label }) {
  return (
    <div style={{ position: "relative", paddingTop: 22 }}>
      {/* Component label above — Figma-style ❖ marker */}
      <div style={{ position: "absolute", top: 0, left: 0, fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ fontSize: 12 }}>❖</span>
        {label}
      </div>

      {/* Wireframe inside dashed border — its own component */}
      <div style={{ border: "1px dashed rgba(255,255,255,0.35)", borderRadius: 6, padding: 6 }}>
        <div style={{ background: "#5D5589", borderRadius: 4, padding: 8, display: "flex", flexDirection: "column", gap: 4, aspectRatio: "4 / 3" }}>
          {/* Top bar */}
          <div style={{ height: 6, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: "60%" }} />
          {/* Highlighted "Contract Details" block — stands out */}
          <div style={{ background: "rgba(255,217,232,0.22)", border: "1px dashed rgba(255,217,232,0.7)", borderRadius: 3, padding: 4, display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
            <div style={{ height: 3, background: "rgba(255,217,232,0.85)", borderRadius: 1, width: "40%" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
              <div style={{ height: 3, background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
              <div style={{ height: 3, background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
              <div style={{ height: 3, background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
            </div>
          </div>
          {/* Other content blocks */}
          <div style={{ height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 1, width: "85%", marginTop: 4 }} />
          <div style={{ height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 1, width: "70%" }} />
          <div style={{ height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 1, width: "78%" }} />
        </div>
      </div>
    </div>
  );
}

function AfterView() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? 16 : 24 }}>
      {/* The Idea — title inside the After */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>The Idea</div>
        <div style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, maxWidth: 820, margin: "0 auto" }}>
          <span style={{ color: "#fff", fontWeight: 600 }}>One master component contains every variant</span> — by context, by product, by market.
          <br />
          Designers pick the variant they need; the source of truth stays in one place.
        </div>
      </div>

      {/* Master Component — Figma-style dashed container */}
      <div style={{ position: "relative", marginTop: 36 }}>
        {/* Block label above master — like Figma's component label */}
        <div style={{ position: "absolute", top: -22, left: 0, fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 12 }}>❖</span>
          Block - Contract Details
        </div>

        {/* Dashed master container */}
        <div style={{ border: "1.5px dashed rgba(255,255,255,0.35)", borderRadius: 10, padding: isMobile ? 12 : 16, background: "transparent" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: isMobile ? 8 : 10 }}>
            {NINE_VARIANTS.map((v, i) => <VariantCard key={i} variant={v} n={i + 1} />)}
          </div>
        </div>
      </div>

      {/* Connector — vertical dashed line linking master to screens */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0 8px" }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <line x1="20" y1="0" x2="20" y2="32" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3"/>
          <polyline points="14,28 20,34 26,28" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Screens Reference — each screen is its own component */}
      <div style={{ marginTop: 24 }}>
        {/* Section title — paralleling the master's introduction style */}
        <div style={{ marginBottom: 22, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Screens where the component appears</div>
          <div style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, maxWidth: 760, margin: "0 auto" }}>
            Each screen is itself a master component, instanced across every context document.
            <br />
            <span style={{ color: "#fff", fontWeight: 600 }}>When the component changes, this is where we check the impact</span> — select the affected screens, export, and replace them in their context documents.
          </div>
        </div>

        {/* Screens grid — each one is its own component */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: isMobile ? 14 : 22 }}>
          {REFERENCE_SCREENS.map((s, i) => <ScreenMockup key={i} label={s.label} />)}
        </div>
      </div>
    </div>
  );
}

function DataLibraryDiagram() {
  const isMobile = useIsMobile();
  const [view, setView] = useState("before");
  const [animating, setAnimating] = useState(false);
  const toggle = (v) => {
    if (v === view) return;
    setAnimating(true);
    setTimeout(() => { setView(v); setAnimating(false); }, 200);
  };
  return (
    <div style={{ marginBottom: 32, background: "#3F3863", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "center", padding: "28px 0 8px" }}>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 50, padding: 4, display: "flex", gap: 4 }}>
          {["before", "after"].map(v => (
            <button key={v} onClick={() => toggle(v)} style={{ padding: isMobile ? "8px 18px" : "8px 24px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: view === v ? "rgba(255,255,255,0.95)" : "transparent", color: view === v ? "#4E4577" : "rgba(255,255,255,0.65)", transition: "all 0.25s" }}>
              {v === "before" ? "😵 Before" : "✨ After"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.2s" }}>
        {view === "before" ? <BeforeView /> : <AfterView />}
      </div>
    </div>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────
const NAV = [
  { id: "context",      label: "Project Context" },
  { id: "discovery",    label: "Discovery" },
  { id: "improvements", label: "Design Improvements" },
  { id: "system",       label: "System Thinking" },
  { id: "lessons",      label: "Lessons" },
  { id: "testimonials", label: "Appreciations" },
];

// ─── Small components ──────────────────────────────────────────────────────
function ImagePlaceholder({ label, height = 240 }) {
  return (
    <div style={{ background: C.bgAlt, border: "2px dashed " + C.border, borderRadius: 12, height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: C.faint, gap: 8 }}>
      <span style={{ fontSize: 28 }}>🖼️</span>
      <span style={{ fontSize: 12 }}>{label}</span>
    </div>
  );
}

function SectionLabel({ num, children }) {
  return <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{num} — {children}</div>;
}

function SectionTitle({ children }) {
  const isMobile = useIsMobile();
  return <h2 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, color: C.ink, marginBottom: isMobile ? 20 : 28, marginTop: 0, letterSpacing: -0.4, lineHeight: 1.2 }}>{children}</h2>;
}

function CSDivider() {
  const isMobile = useIsMobile();
  return <div style={{ height: 1, background: C.border, margin: isMobile ? "48px 0" : "72px 0" }} />;
}

function ImpactPill({ icon, text }) {
  return (
    <div style={{ background: "#fff", border: "1px solid " + C.lilacBorder, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.ink }}>
      <span style={{ fontSize: 20 }}>{icon}</span>{text}
    </div>
  );
}

function TestimonialCard({ name, role, text }) {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("");
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid " + C.border, marginBottom: 16, breakInside: "avoid", transition: "border-color 0.2s" }} onMouseEnter={function(e) { e.currentTarget.style.borderColor = C.lilacBorder; }} onMouseLeave={function(e) { e.currentTarget.style.borderColor = C.border; }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.lilacBg, border: "1px solid " + C.lilacBorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#4a3a8a", flexShrink: 0 }}>{initials}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: C.ink, fontSize: 14, lineHeight: 1.3 }}>{name}</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.3, marginTop: 2 }}>{role}</div>
        </div>
      </div>
      <p style={{ color: "#555", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  );
}

// ─── Carousel (Clay-style) ─────────────────────────────────────────────────
function Carousel({ slides }) {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const videoRefs = useRef([]);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const prev = () => { if (!isFirst) setIndex(i => i - 1); };
  const next = () => { if (!isLast) setIndex(i => i + 1); };

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  }, [index]);

  const slideWidthPct = isMobile ? 92 : 78;
  const gapPx = isMobile ? 12 : 16;
  const offset = -index * slideWidthPct + (100 - slideWidthPct) / 2;

  const arrowBase = { width: isMobile ? 44 : 36, height: isMobile ? 44 : 36, borderRadius: "50%", border: "none", background: C.purple, display: "flex", alignItems: "center", justifyContent: "center", color: C.neon, transition: "all 0.2s", padding: 0 };

  // Swipe gestures on mobile
  const onTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (!isMobile || touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only treat as swipe if horizontal motion clearly dominates
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div>
      <div style={{ overflow: "hidden" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div style={{ display: "flex", transform: "translateX(" + offset + "%)", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)", gap: gapPx }}>
          {slides.map((slide, i) => (
            <div key={i} style={{ flex: "0 0 " + slideWidthPct + "%", opacity: i === index ? 1 : 0.4, transition: "opacity 0.5s" }}>
              <div style={{ aspectRatio: "16 / 9", background: C.lilacBg, borderRadius: 12, border: "1px solid " + C.lilacBorder, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "#8878c4", position: "relative" }}>
                {slide.videoUrl ? (
                  <video
                    ref={el => { videoRefs.current[i] = el; }}
                    src={slide.videoUrl}
                    poster={slide.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <>
                    <span style={{ fontSize: 40 }}>{slide.icon || "🖼️"}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#4a3a8a" }}>{slide.title}</span>
                  </>
                )}
              </div>
              <div style={{ marginTop: isMobile ? 20 : 28, maxWidth: 760, opacity: i === index ? 1 : 0, transition: "opacity 0.4s", pointerEvents: i === index ? "auto" : "none" }}>
                <div style={{ fontSize: isMobile ? 16 : 17, fontWeight: 700, color: C.ink, marginBottom: 6, letterSpacing: -0.2 }}>{slide.title}</div>
                <div style={{ fontSize: isMobile ? 13 : 14, color: C.muted, lineHeight: 1.6 }}>{slide.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: isMobile ? 20 : 28 }}>
        <div style={{ display: "flex", gap: 6, fontSize: 13, color: C.muted, fontVariantNumeric: "tabular-nums" }}>
          <span style={{ color: C.ink, fontWeight: 600 }}>{String(index + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={prev} disabled={isFirst} aria-label="Previous" style={{ ...arrowBase, cursor: isFirst ? "not-allowed" : "pointer", opacity: isFirst ? 0.3 : 1 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <button onClick={next} disabled={isLast} aria-label="Next" style={{ ...arrowBase, cursor: isLast ? "not-allowed" : "pointer", opacity: isLast ? 0.3 : 1 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Restitution ───────────────────────────────────────────────────
function SlideUserNeeds() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 20 1100 580" style={{ width: "100%", height: "auto", display: "block" }} fontFamily="Arial, sans-serif">
      <rect width="1100" height="600" fill="#ffffff"/>
      <polygon points="40,38 76,38 58,66" fill="#5a2c87"/>
      <text x="100" y="85" fontSize="26" fontWeight="700" fill="#7a7a7a">User Needs — Ergonomics and Navigation</text>
      <rect x="60" y="125" width="44" height="424" fill="#e6c84b"/>
      <g transform="translate(82, 337) rotate(-90)"><text x="0" y="5" fontSize="13" fontWeight="700" fill="#5a2c87" textAnchor="middle">A. Ergonomics and navigation</text></g>
      <rect x="104" y="125" width="100" height="34" fill="#5a2c87"/>
      <rect x="204" y="125" width="80" height="34" fill="#5a2c87"/>
      <rect x="284" y="125" width="776" height="34" fill="#5a2c87"/>
      <text x="154" y="148" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">CATEGORIES</text>
      <text x="244" y="148" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">#</text>
      <text x="672" y="148" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">SUB-CATEGORIES</text>
      <rect x="104" y="159" width="100" height="120" fill="#e8e8e8"/>
      <text x="154" y="215" fontSize="14" fontWeight="700" fill="#5a2c87" textAnchor="middle">A1</text>
      <text x="154" y="232" fontSize="12" fill="#5a2c87" textAnchor="middle">Home</text>
      {[
        { y: 159, alt: false, num: "A1.1", text: "Be able to view urgent tickets to handle as soon as the tool opens" },
        { y: 189, alt: true, num: "A1.2", text: "View tickets currently being processed by other team members (manager need)" },
        { y: 219, alt: false, num: "A1.3", text: "Set reminder dates on \"in progress\" tickets and view the day's tickets at opening" },
        { y: 249, alt: true, num: "A1.4", text: "Allow opening two or more sessions of the management tool (multi-sessions)" },
      ].map((r, i) => (
        <g key={"r1-"+i}>
          <rect x="204" y={r.y} width="80" height="30" fill={r.alt ? "#f4f4f4" : "#fff"}/>
          <rect x="284" y={r.y} width="776" height="30" fill={r.alt ? "#f4f4f4" : "#fff"}/>
          <text x="244" y={r.y + 19} fontSize="12" fill="#333" textAnchor="middle">{r.num}</text>
          <text x="300" y={r.y + 19} fontSize="12" fill="#333">{r.text}</text>
        </g>
      ))}
      <rect x="104" y="279" width="100" height="120" fill="#e8e8e8"/>
      <text x="154" y="335" fontSize="14" fontWeight="700" fill="#5a2c87" textAnchor="middle">A2</text>
      <text x="154" y="352" fontSize="12" fill="#5a2c87" textAnchor="middle">Inboxes</text>
      {[
        { y: 279, alt: false, num: "A2.1", text: "Display processing inboxes in \"list\" mode with more visual information" },
        { y: 309, alt: true, num: "A2.2", text: "Show indicative deadline and number of overdue days for each row/management action" },
        { y: 339, alt: false, num: "A2.3", text: "Simplified inbox view allowing CDRC to quickly identify assigned inboxes" },
        { y: 369, alt: true, num: "A2.4", text: "Have a ticket preview mode (quick display of key information)" },
      ].map((r, i) => (
        <g key={"r2-"+i}>
          <rect x="204" y={r.y} width="80" height="30" fill={r.alt ? "#f4f4f4" : "#fff"}/>
          <rect x="284" y={r.y} width="776" height="30" fill={r.alt ? "#f4f4f4" : "#fff"}/>
          <text x="244" y={r.y + 19} fontSize="12" fill="#333" textAnchor="middle">{r.num}</text>
          <text x="300" y={r.y + 19} fontSize="12" fill="#333">{r.text}</text>
        </g>
      ))}
      <rect x="104" y="399" width="100" height="90" fill="#e8e8e8"/>
      <text x="154" y="436" fontSize="14" fontWeight="700" fill="#5a2c87" textAnchor="middle">A3</text>
      <text x="154" y="452" fontSize="12" fill="#5a2c87" textAnchor="middle">Tickets</text>
      {[
        { y: 399, alt: false, num: "A3.1", text: "Ability to go back and change actions as long as the contract has not been sent to client" },
        { y: 429, alt: true, num: "A3.2", text: "Easily switch between contract space and person space" },
        { y: 459, alt: false, num: "A3.3", text: "Sort tickets (by date, urgency level)" },
      ].map((r, i) => (
        <g key={"r3-"+i}>
          <rect x="204" y={r.y} width="80" height="30" fill={r.alt ? "#f4f4f4" : "#fff"}/>
          <rect x="284" y={r.y} width="776" height="30" fill={r.alt ? "#f4f4f4" : "#fff"}/>
          <text x="244" y={r.y + 19} fontSize="12" fill="#333" textAnchor="middle">{r.num}</text>
          <text x="300" y={r.y + 19} fontSize="12" fill="#333">{r.text}</text>
        </g>
      ))}
      <rect x="104" y="489" width="100" height="60" fill="#e8e8e8"/>
      <text x="154" y="514" fontSize="14" fontWeight="700" fill="#5a2c87" textAnchor="middle">A4</text>
      <text x="154" y="530" fontSize="12" fill="#5a2c87" textAnchor="middle">Other</text>
      {[
        { y: 489, alt: true, num: "A4.1", text: "Improve overall tool ergonomics" },
        { y: 519, alt: false, num: "A4.2", text: "Better information hierarchy" },
      ].map((r, i) => (
        <g key={"r4-"+i}>
          <rect x="204" y={r.y} width="80" height="30" fill={r.alt ? "#f4f4f4" : "#fff"}/>
          <rect x="284" y={r.y} width="776" height="30" fill={r.alt ? "#f4f4f4" : "#fff"}/>
          <text x="244" y={r.y + 19} fontSize="12" fill="#333" textAnchor="middle">{r.num}</text>
          <text x="300" y={r.y + 19} fontSize="12" fill="#333">{r.text}</text>
        </g>
      ))}
      <line x1="40" y1="572" x2="1060" y2="572" stroke="#e0e0e0" strokeWidth="1"/>
      <text x="40" y="590" fontSize="10" fill="#999">DXC Technology — Confidential</text>
      <text x="1060" y="590" fontSize="10" fill="#999" textAnchor="end">16 / 21</text>
    </svg>
  );
}

function RestitutionComposition() {
  const isMobile = useIsMobile();
  const cardBase = {
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    border: "3px solid #E5E1D2",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  };

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ background: C.bgAlt, borderRadius: 16, padding: isMobile ? "24px 16px" : "40px 0", position: "relative", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", gap: isMobile ? 16 : 0 }}>
        {/* Big image first on mobile (most important visual) */}
        <div style={{ order: isMobile ? 1 : 2, width: isMobile ? "100%" : "52%", marginLeft: isMobile ? 0 : "auto", marginRight: isMobile ? 0 : "4%", ...cardBase, boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}>
          <img
            src="https://res.cloudinary.com/diso2uvpx/image/upload/v1777460282/Capture_d_e%CC%81cran_2026-04-29_a%CC%80_12.51.25_hi97as.png"
            alt="Résultats des explorations"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Two smaller stacked images */}
        <div style={{ order: isMobile ? 2 : 1, width: isMobile ? "100%" : "38%", marginLeft: isMobile ? 0 : "4%", display: "flex", flexDirection: isMobile ? "column" : "column", gap: isMobile ? 12 : 24 }}>
          <div style={{ flex: 1, ...cardBase, boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}>
            <img
              src="https://res.cloudinary.com/diso2uvpx/image/upload/v1777460282/Capture_d_e%CC%81cran_2026-04-29_a%CC%80_12.51.10_p4y2oc.png"
              alt="Démarche exploratoire"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div style={{ flex: 1, ...cardBase, boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}>
            <SlideUserNeeds />
          </div>
        </div>
      </div>
      <div style={{ fontSize: isMobile ? 13 : 14, color: "#555", marginTop: 16, textAlign: "center", fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}>Document Restitution — process, biotopes, and user needs</div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────
export default function CaseStudy() {
  const [active, setActive] = useState("context");
  const isMobile = useIsMobile();

  const scrollTo = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Horizontal-scroll padding for mobile sticky nav so first/last items don't hug edges
  const navInnerPadding = isMobile ? "0 16px" : "0 60px";

  return (
    <div style={{ fontFamily: "sans-serif", background: C.bg, color: C.ink }}>

      {/* Hero */}
      <div style={{ background: "#3d2f7a", display: "flex", alignItems: "center", paddingTop: isMobile ? 96 : 128 }}>
        <div style={{ padding: isMobile ? "32px 24px 24px" : "64px 60px 32px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          <h1 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.05, color: "#ffffff", letterSpacing: -1 }}>PathFinder</h1>
          <p style={{ fontSize: isMobile ? 15 : 20, color: "#f5f0ff", lineHeight: 1.5, margin: isMobile ? "0 0 32px" : "0 0 48px" }}>
            Redesigning a complex, content-heavy B2B insurance software — and building the systems that scale it.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1.2fr 1fr 2fr", gap: isMobile ? 24 : 40 }}>
            <div>
              <div style={{ fontSize: 10, color: "#a594d4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Role</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, color: "#ffffff", fontWeight: 500 }}>
                <div>Senior Product Designer</div>
                <div style={{ color: "#a594d4", fontSize: 13, fontWeight: 400 }}>2020 → Present</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#a594d4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Team</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, color: "#ffffff", fontWeight: 500 }}>
                <div>Remote, distributed</div>
                <div style={{ color: "#a594d4", fontSize: 13, fontWeight: 400 }}>FR · BE · MA · BG · IN</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#a594d4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Context</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, color: "#ffffff", fontWeight: 500 }}>
                <div>B2B Insurance</div>
                <div style={{ color: "#a594d4", fontSize: 13, fontWeight: 400 }}>DXC Technology</div>
              </div>
            </div>
            <div style={{ gridColumn: isMobile ? "span 2" : "auto" }}>
              <div style={{ fontSize: 10, color: "#a594d4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Skills & Methods</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
                {["User Interviews", "Information Architecture", "UX Design", "Content", "Design System", "DesignOps", "Figma"].map(t => <span key={t} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#ffffff", fontWeight: 500 }}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image — sits inside the purple section, ends at its bottom */}
      <div style={{ background: "#3d2f7a", paddingTop: 8 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 16px" : "0 60px" }}>
          <div style={{ background: C.lilacBg, borderRadius: "12px 12px 0 0", padding: 4, paddingBottom: 0, overflow: "hidden" }}>
            <img
              src="https://res.cloudinary.com/diso2uvpx/image/upload/v1777553891/Summary_ContractView_Savings_xulet4.png"
              alt="PathFinder — Contract View Summary"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px 8px 0 0" }}
            />
          </div>
        </div>
      </div>

      {/* Spacer between hero and sticky nav */}
      <div style={{ background: C.bg, height: isMobile ? 24 : 48 }} />

      {/* Sticky Nav — horizontal scroll on mobile, sits below the global app nav (64px) */}
      <div style={{ position: "sticky", top: 64, zIndex: 50, background: C.bg, borderBottom: "1px solid " + C.border }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: navInnerPadding }}>
          <div style={{ display: "flex", gap: 0, overflowX: isMobile ? "auto" : "visible", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style>{`.cs-nav-scroll::-webkit-scrollbar{display:none}`}</style>
            {NAV.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: isMobile ? "14px 14px" : "16px 20px", fontSize: 13, fontWeight: active === n.id ? 700 : 500, whiteSpace: "nowrap", color: active === n.id ? C.ink : C.muted, transition: "all 0.2s", fontFamily: "sans-serif", position: "relative", flexShrink: 0 }}>
                {n.label}
                {active === n.id && <div style={{ position: "absolute", bottom: 0, left: isMobile ? 10 : 16, right: isMobile ? 10 : 16, height: 4, background: C.neon, borderRadius: 2 }} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "32px 24px 56px" : "32px 60px 56px", boxSizing: "border-box" }}>

        {/* 01 Project Context */}
        <div id="context">
          <SectionLabel num="01">Project Context</SectionLabel>
          <SectionTitle>From Legacy to Modern UX</SectionTitle>
          <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 32 }}>
            GrathTalk is a B2B software solution for managing insurance contracts across multiple lines. Originally built in the 1990s, the platform had become outdated — cluttered screens, confusing navigation, poor content scanning, and an old-fashioned interface. Launched in 2020, the redesign aimed to improve the user experience and modernize the UI through a complete overhaul of the application.
          </p>
          <div>
            <div style={{ borderRadius: 8, overflow: "hidden", border: "3px solid #E5E1D2" }}>
              <img src="https://sabrinavaladares.github.io/portfolio-images/Old_ClientView.png" alt="Old design — legacy interface" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ fontSize: isMobile ? 13 : 14, color: "#555", marginTop: 16, textAlign: "center", fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}>The legacy interface — before redesign</div>
          </div>
        </div>

        <CSDivider />

        {/* 02 Discovery */}
        <div id="discovery">
          <SectionLabel num="02">Discovery</SectionLabel>
          <SectionTitle>Listening Before Designing</SectionTitle>
          <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 24 }}>
            The project started with a deep research phase. Covea — one of the clients — operates through 3 distinct insurance brands under the same group. Each brand had its own workflows, terminology, and user expectations. The goal was ambitious: unify the UX experience across all 3 brands within a single platform.
          </p>
          <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 48 }}>
            To achieve this, we conducted user interviews with a range of profiles across the brands — from managers to brokers — to capture different perspectives, needs, and pain points.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr 1fr", gap: isMobile ? 16 : 40, marginBottom: 48, padding: isMobile ? "20px" : "24px 32px", background: C.bgAlt, borderRadius: 12 }}>
            <div style={{ paddingRight: isMobile ? 0 : 32, paddingBottom: isMobile ? 16 : 0, borderRight: isMobile ? "none" : "1px solid " + C.border, borderBottom: isMobile ? "1px solid " + C.border : "none" }}>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Interviews conducted</div>
              <div style={{ fontSize: 15, color: C.ink, fontWeight: 500, lineHeight: 1.5 }}>
                31 sessions — 62 hours
              </div>
            </div>
            <div style={{ paddingRight: isMobile ? 0 : 32, paddingBottom: isMobile ? 16 : 0, borderRight: isMobile ? "none" : "1px solid " + C.border, borderBottom: isMobile ? "1px solid " + C.border : "none" }}>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Business profiles</div>
              <div style={{ fontSize: 15, color: C.ink, fontWeight: 500, lineHeight: 1.5 }}>
                7 — brokers, managers, trainers, inspectors, etc.
              </div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Brands</div>
              <div style={{ fontSize: 15, color: C.ink, fontWeight: 500, lineHeight: 1.5 }}>3 — GMF, MAAF, MMA</div>
            </div>
          </div>

          <h3 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: "0 0 16px", letterSpacing: -0.2 }}>Interviews Restitution</h3>
          <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 24 }}>
            The interviews led to a structured restitution document — combining personas, main pain points per category, and a complete list of needs to be addressed in the redesign.
          </p>

          <RestitutionComposition />

          <h3 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: "0 0 16px", letterSpacing: -0.2 }}>Legacy Audit</h3>
          <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 32 }}>
            A thorough UX audit of the existing platform revealed a wide range of structural issues. Among the most critical were navigation, content hierarchy, heavy screens, and an outdated UI.
          </p>

          <div>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid " + C.border, background: C.bgAlt }}>
              <img src="https://res.cloudinary.com/diso2uvpx/image/upload/v1777457160/Audit_qfvysw.png" alt="Pain points identified across the legacy interface" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ fontSize: isMobile ? 13 : 14, color: "#555", marginTop: 16, textAlign: "center", fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}>Pain points identified across the legacy interface</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "0" : "0 40px", marginTop: 40, borderTop: "1px solid " + C.border }}>
            {[
              { label: "Irrelevant content for context", desc: "Information unrelated to the user's current task displayed alongside critical data, making it hard to focus on what matters" },
              { label: "Overloaded navigation", desc: "Too many tabs, often requiring horizontal scrolling to see them all — the information needed clearer organization and prioritization" },
              { label: "Lack of information hierarchy", desc: "No emphasis on what matters most. Everything displayed at the same level of importance, forcing users to scan and decide what's relevant" },
              { label: "Empty sections shown by default", desc: "Sections rendered with no content or feedback, leaving users uncertain whether information was missing, loading, or simply not applicable" },
              { label: "Excessive nesting", desc: "Components stacked within components — sections inside sections, accordions inside accordions — creating a structure that's hard to follow and visually cluttered" },
              { label: "Misleading pagination", desc: "Next/Previous controls used in contexts with no meaningful sequence, leading users to unexpected places instead of guiding them through a flow" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 14, paddingTop: 18, paddingBottom: 18, borderBottom: "1px solid " + C.border }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.purple, letterSpacing: 1, flexShrink: 0, width: 18 }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.ink, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CSDivider />

        {/* 03 Design Improvements */}
        <div id="improvements">
          <SectionLabel num="03">Design Improvements</SectionLabel>
          <SectionTitle>Changes That Transformed the Experience</SectionTitle>
          <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 40 }}>
            The audit revealed clear patterns. A set of structural improvements had the highest impact on usability, navigation clarity, and information hierarchy across the entire platform.
          </p>

          <Carousel slides={[
            { title: "Navigation in Tabs", description: "Improved the overall navigation by letting users open multiple views and switch between them easily.", videoUrl: "https://res.cloudinary.com/diso2uvpx/video/upload/f_auto,q_auto/v1777469464/Nav_Tabs_umzx67.mp4" },
            { title: "Information Hierarchy", description: "Restructured every screen around what matters most. The header shows the most important information — contract status, client. An expandable details panel keeps extra information one click away, never cluttering the view. Tabs and sub-tabs group content by topic, replacing the overwhelming row of same-level tabs from the legacy interface. And a dedicated \"Situation as of\" section highlights performance and key metrics.", videoUrl: "https://res.cloudinary.com/diso2uvpx/video/upload/f_auto,q_auto/v1777532957/Information_Architecture_lhkiqu.mp4" },
            { title: "Entity Cards", description: "Designed a unified card pattern for every entity — clients, contracts, claims. From a single card, users can search, browse suggestions, create new entries, preview details, or open the full entity view in a new tab.", videoUrl: "https://res.cloudinary.com/diso2uvpx/video/upload/f_auto,q_auto/v1777473508/Entity_Cards_u9umbn.mp4" },
            { title: "Side Panel", description: "Introduced a contextual side panel for secondary actions and details, keeping the main content in focus while reducing screen switching.", videoUrl: "https://res.cloudinary.com/diso2uvpx/video/upload/v1777553073/Side_Panel_f0ylzs.mov" },
          ]} />
        </div>

        <CSDivider />

        {/* 04 System Thinking — wrapped in saturated purple background */}
        <div id="system" style={{ background: "#4E4577", marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", paddingLeft: "calc(50vw - 50%)", paddingRight: "calc(50vw - 50%)", paddingTop: isMobile ? 48 : 72, paddingBottom: isMobile ? 48 : 72, marginTop: isMobile ? -48 : -72, marginBottom: isMobile ? -48 : -72 }}>
          <div style={{ maxWidth: 980, margin: "0 auto", paddingLeft: isMobile ? 24 : 0, paddingRight: isMobile ? 24 : 0 }}>
          <div style={{ fontSize: 11, color: "#EDE5FA", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>04 — System Thinking</div>
          <h2 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, color: "#fff", marginBottom: isMobile ? 20 : 28, marginTop: 0, letterSpacing: -0.4, lineHeight: 1.2 }}>When the Product Grows Faster Than the System</h2>
          <p style={{ color: "#F5F1FC", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 24 }}>
            As the product evolved and the team grew, inconsistencies began to spread. Designers created their own variations, components were modified without shared criteria, and decision ownership was unclear.
          </p>
          <p style={{ color: "#F5F1FC", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 24 }}>
            This lack of structure didn't just slow production — it affected product quality and team trust. The user experience became fragmented, coherence relied on manual oversight, and without a shared system, there was no foundation for scalability.
          </p>
          <p style={{ color: "#F5F1FC", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 32 }}>
            The consequences extended beyond design. QA testing became chaotic — with no single source of truth, testers couldn't tell whether the spec PDF, the design file, or the live application held the correct version. The result was duplicate Jira tickets, hours lost on alignment calls, and recurring client complaints about inconsistencies between specifications and the delivered product.
          </p>

          <h3 style={{ fontSize: isMobile ? 17 : 18, fontWeight: 700, color: "#fff", margin: "40px 0 12px" }}>The Data Library</h3>
          <p style={{ color: "#F5F1FC", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 16 }}>
            Solving these challenges required deep systems thinking — understanding how data relationships surface throughout the product, and defining patterns that other teams could build upon. I led the creation of the Data Library: a system of data-aware patterns built on top of the core design system, enabling consistent representation of complex insurance data across all workflows.
          </p>
          <p style={{ color: "#F5F1FC", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 32 }}>
            The diagram below illustrates how the team worked before — and how the Data Library reshaped that workflow.
          </p>

          <DataLibraryDiagram />

          {/* Challenges — what the new workflow demands */}
          <div style={{ marginTop: 56, marginBottom: 32 }}>
            <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: -0.3 }}>Challenges</h3>
            <p style={{ color: "#F5F1FC", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 32, maxWidth: 820 }}>
              The implementation of the Data Library has been facing some challenges, because it requires a shift in how the team works and how it's organized.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px 0" : "32px 40px" }}>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>DesignOps</h4>
                <p style={{ color: "#F5F1FC", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0 }}>
                  Someone has to create and feed the system continuously — defining patterns, maintaining variants, and making sure the library stays alive. This requires a transversal view of the product, not a single workflow perspective. It also means communicating how the system works, what's new, and why decisions were made.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>Team practices</h4>
                <p style={{ color: "#F5F1FC", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0 }}>
                  The system reshapes how designers work day-to-day — how they pick variants, when to propose new ones, and how they collaborate. It's not just a library; it's a new way of working together that the team has to learn and adopt.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>Governance</h4>
                <p style={{ color: "#F5F1FC", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0 }}>
                  Every change to a master component needs review and approval before reaching production. Without this layer, consistency breaks and the system loses trust. The reviewer becomes the gatekeeper of the cross-product experience.
                  <br /><br />
                  Today, I'm the only person on the team with the transversal view to play this role — and that's a real risk. A single maintainer becomes a bottleneck, and the system depends on one perspective. Distributing this responsibility is the next step.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>AI's role in this</h4>
                <p style={{ color: "#F5F1FC", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0 }}>
                  AI can be a real ally in maintaining a system like this — helping to spot inconsistencies, identify missing Lego pieces in the architecture, and generate documentation to communicate how the system works and what changes between versions. There's still a lot to explore here. Defining how AI fits into the workflow — as a contributor that supports the team without replacing the transversal judgment — is part of what comes next.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>

        <CSDivider />

        {/* 05 Lessons */}
        <div id="lessons">
          <SectionLabel num="05">Lessons</SectionLabel>
          <SectionTitle>Growing With the Product</SectionTitle>
          <div style={{ maxWidth: 820 }}>
            <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 24 }}>
              Working on a project of this magnitude — and being there from the very beginning — is a rare professional experience. I lived through every phase of it.
            </p>
            <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 24 }}>
              It started with deep exploration: user interviews with a large group of insurers like Covea, understanding how they work, where their pain points live, and what shapes their day-to-day. Then came the design phase, where I had to learn the insurance domain itself — the legacy screens, the vocabulary, the workflows — while collaborating with very different profiles across the team. Each iteration meant proposing solutions, gathering feedback, and refining patterns step by step.
            </p>
            <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 24 }}>
              I was also the first person to build a UI system on the project, before we eventually hired someone dedicated to it. Then came the migration from XD to Figma — which became the moment I understood why we had to do things differently. The product was getting more complex, the inconsistencies were growing, and the way we were working couldn't scale.
            </p>
            <p style={{ color: "#555", fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 0 }}>
              That's how the Data Library was born. Building it while still producing designs, explaining its value to the team, taking real risks and responsibilities, and keeping clarity through all of it — these were intense phases, each with their own lessons. Together, they taught me what it really takes to redesign a back-end as complex as GrathTalk: not just good design, but the patience to build the systems that make good design possible.
            </p>
          </div>
        </div>

        <CSDivider />

        {/* 06 Appreciations */}
        <div id="testimonials">
          <SectionLabel num="06">Appreciations</SectionLabel>
          <SectionTitle>What the Team Says</SectionTitle>
          <div style={{ marginTop: 24, background: C.bgAlt, borderRadius: 16, padding: isMobile ? "20px" : "32px", columnCount: isMobile ? 1 : 3, columnGap: 16 }}>
            {[
              { name: "Christele Brunesseaux", role: "Principal Solution Architect", text: "Gaining experience and maturity in the project, Sabrina became central & instrumental to the product. Combining deep & precise analysis with sharp & efficient designs, she is leading the Design of the application very proactively." },
              { name: "Matthieu Lenoble", role: "Project Manager", text: "I appreciated the lead you took on Design System creation. It was a real challenge, a huge amount of work, and you succeeded in creating a tool that allows us to provide consistent design to our main client. With the Design System you became a hub for all design decisions." },
              { name: "Carol De Block", role: "UX Designer", text: "Her design sets the standard for the team. She does the research and analysis very thoroughly. When presenting her designs, you notice that she is very passionate and dedicated. I love to work with Sabrina, because she is always professional about the design work." },
              { name: "Petya Dimitrova", role: "Manager Solution Architecture", text: "Sabrina is the backbone of the Design team. She is always ready to propose a solution even for complex tasks. Her ideas are priceless. Her work ethic is absolutely inspiring, and it's clear that she always puts 200% into everything she does." },
              { name: "Nikolay", role: "UI Designer", text: "Sabrina has profound knowledge in the GraphTalk project's inner concepts, flows and processes. As well, she has great attention to detail, always able to spot and help with resolving an issue to the finest aspect. Her project deliveries are top-notch and perfected." },
              { name: "Jean François Mouffle", role: "Principal Solution Architect", text: "It's a real pleasure to work with Sabrina, as she's always eager to learn about the Insurance business as well as the existing GT UI. She always takes the time to understand what the business needs and to find the best proposition for the new UI." },
            ].map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>
        </div>

      </div>
    </div>
  );
}
