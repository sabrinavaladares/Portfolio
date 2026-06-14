import { useState } from "react";
import { useIsMobile, CASE_STUDIES } from "./App";
import { DataLibraryDiagram, StateOfPlayBlock } from "./case-study";

// ─── Palette — cream theme matching PathFinder case study ────────────────
const C = {
  bg: "#FAFAF7",
  bgAlt: "#F2F0E8",
  bgDarker: "#2d1f5e",
  ink: "#1a1a1a",
  muted: "#6B6B6B",
  faint: "#ADADAD",
  border: "#E4E2DA",
  lilacBg: "#EDE8FF",
  lilacBorder: "#C4B8F0",
  purple: "#2d1f5e",
  purpleDark: "#1e1545",
  neon: "#E1FB62",
};

// ─── Data Library Hero Illustration ──────────────────────────────────────
export function DataLibraryHero() {
  return (
    <svg width="100%" viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <title>Data Library</title>
      <desc>A master section component from the Pathfinder design library, with its variant properties shown in the Figma inspector panel.</desc>

      <defs>
        <filter id="masterShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#5B4BC4" floodOpacity="0.22"/>
        </filter>
        <filter id="liftedShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000" floodOpacity="0.25"/>
        </filter>
        <pattern id="dotGrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="1" fill="#5B4BC4" fillOpacity="0.07"/>
        </pattern>
      </defs>

      <rect width="800" height="480" fill="#EDE8FF"/>
      <rect width="800" height="480" fill="url(#dotGrid)"/>

      <text x="40" y="48" fill="#5B4BC4" fontFamily="sans-serif" fontSize="10" fontWeight="700" letterSpacing="3" opacity="0.7">❖  DATA LIBRARY</text>
      <text x="40" y="62" fill="#9388B3" fontFamily="sans-serif" fontSize="10" letterSpacing="0.5">6 sections · 18 variants · 4 flows</text>
      <text x="760" y="58" fill="#9388B3" fontFamily="sans-serif" fontSize="9" letterSpacing="0.5" textAnchor="end">Pathfinder · DXC Technology</text>

      <g opacity="0.35">
        <g transform="translate(40, 90)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#7F77DD" rx="2"/><rect x="10" y="18" width="50" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="80" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="60" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="44" width="74" height="3" fill="#E4E2DA" rx="1"/></g>
        <g transform="translate(162, 90)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#AFA9EC" rx="2"/><rect x="10" y="18" width="60" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="74" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="50" height="3" fill="#E4E2DA" rx="1"/></g>
        <g transform="translate(284, 90)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#3D9C7A" rx="2"/><rect x="10" y="18" width="46" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="80" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="64" height="3" fill="#E4E2DA" rx="1"/></g>
        <g transform="translate(528, 90)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#C97A3D" rx="2"/><rect x="10" y="18" width="54" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="76" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="62" height="3" fill="#E4E2DA" rx="1"/></g>
        <g transform="translate(650, 90)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#AFA9EC" rx="2"/><rect x="10" y="18" width="44" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="80" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="58" height="3" fill="#E4E2DA" rx="1"/></g>

        <g transform="translate(40, 380)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#5B4BC4" rx="2"/><rect x="10" y="18" width="50" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="78" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="62" height="3" fill="#E4E2DA" rx="1"/></g>
        <g transform="translate(162, 380)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#C97A3D" rx="2"/><rect x="10" y="18" width="64" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="50" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="76" height="3" fill="#E4E2DA" rx="1"/></g>
        <g transform="translate(528, 380)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#C4B8F0" rx="2"/><rect x="10" y="18" width="60" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="50" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="78" height="3" fill="#E4E2DA" rx="1"/></g>
        <g transform="translate(650, 380)"><rect width="110" height="65" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/><rect width="110" height="6" fill="#3D9C7A" rx="2"/><rect x="10" y="18" width="62" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="26" width="76" height="3" fill="#E4E2DA" rx="1"/><rect x="10" y="36" width="50" height="3" fill="#E4E2DA" rx="1"/></g>
      </g>

      <rect x="68" y="92" width="384" height="276" fill="none" stroke="#9747FF" strokeWidth="1.5" strokeDasharray="5 4" rx="2" opacity="0.9"/>
      <rect x="74" y="78" width="124" height="16" fill="#9747FF" rx="3"/>
      <text x="136" y="89" fill="#fff" fontFamily="sans-serif" fontSize="9" fontWeight="700" letterSpacing="1.2" textAnchor="middle">❖ MAIN COMPONENT</text>

      <g transform="translate(80, 104)" filter="url(#masterShadow)">
        <rect width="360" height="252" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="6"/>

        <text x="20" y="30" fill="#1a1a1a" fontFamily="sans-serif" fontSize="14" fontWeight="700"><tspan fill="#5B4BC4">❖ </tspan>Dates and Duration</text>
        <line x1="0" y1="48" x2="360" y2="48" stroke="#F0EEEA"/>

        <text x="20" y="68" fill="#888" fontFamily="sans-serif" fontSize="9">Effective Date</text>
        <text x="20" y="86" fill="#1a1a1a" fontFamily="sans-serif" fontSize="11" fontWeight="500">05/07/2024</text>

        <text x="192" y="68" fill="#888" fontFamily="sans-serif" fontSize="9">Term Type</text>
        <text x="192" y="86" fill="#1a1a1a" fontFamily="sans-serif" fontSize="11" fontWeight="500">Fixed with Automatic Renewal</text>

        <text x="20" y="114" fill="#888" fontFamily="sans-serif" fontSize="9">Renewal</text>
        <rect x="20" y="120" width="148" height="26" fill="#fff" stroke="#E4E2DA" rx="4"/>
        <text x="28" y="137" fill="#1a1a1a" fontFamily="sans-serif" fontSize="10">Anniversary Date</text>
        <path d="M 152 132 L 156 136 L 160 132" stroke="#888" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

        <text x="192" y="114" fill="#888" fontFamily="sans-serif" fontSize="9">Renewal Date</text>
        <rect x="192" y="120" width="60" height="26" fill="#fff" stroke="#E4E2DA" rx="4"/>
        <text x="200" y="137" fill="#C4C4C4" fontFamily="sans-serif" fontSize="10">00</text>
        <rect x="256" y="120" width="84" height="26" fill="#fff" stroke="#E4E2DA" rx="4"/>
        <text x="264" y="137" fill="#1a1a1a" fontFamily="sans-serif" fontSize="10">March</text>
        <path d="M 324 132 L 328 136 L 332 132" stroke="#888" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

        <text x="20" y="168" fill="#888" fontFamily="sans-serif" fontSize="9">Expiry Duration</text>
        <rect x="20" y="174" width="60" height="26" fill="#fff" stroke="#E4E2DA" rx="4"/>
        <text x="28" y="191" fill="#C4C4C4" fontFamily="sans-serif" fontSize="10">00</text>
        <rect x="84" y="174" width="84" height="26" fill="#fff" stroke="#E4E2DA" rx="4"/>
        <text x="92" y="191" fill="#1a1a1a" fontFamily="sans-serif" fontSize="10">Years</text>
        <path d="M 152 186 L 156 190 L 160 186" stroke="#888" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

        <text x="192" y="168" fill="#888" fontFamily="sans-serif" fontSize="9">Expire Date</text>
        <rect x="192" y="174" width="148" height="26" fill="#fff" stroke="#E4E2DA" rx="4"/>
        <text x="200" y="191" fill="#1a1a1a" fontFamily="sans-serif" fontSize="10" fontWeight="500">05/07/2034</text>
        <rect x="316" y="180" width="14" height="14" fill="none" stroke="#888" strokeWidth="1" rx="2"/>

        <text x="20" y="220" fill="#888" fontFamily="sans-serif" fontSize="9">Signature Date <tspan fill="#E74C3C">*</tspan></text>
        <rect x="20" y="226" width="148" height="22" fill="#fff" stroke="#E4E2DA" rx="4"/>
        <text x="28" y="241" fill="#1a1a1a" fontFamily="sans-serif" fontSize="10" fontWeight="500">05/07/2024</text>

        <text x="192" y="220" fill="#888" fontFamily="sans-serif" fontSize="9">Postmark Date</text>
        <rect x="192" y="226" width="148" height="22" fill="#fff" stroke="#E4E2DA" rx="4"/>
        <text x="200" y="241" fill="#C4C4C4" fontFamily="sans-serif" fontSize="10">dd/mm/yyyy</text>
      </g>

      <rect x="64" y="88" width="8" height="8" fill="#fff" stroke="#9747FF" strokeWidth="1.2"/>
      <rect x="448" y="88" width="8" height="8" fill="#fff" stroke="#9747FF" strokeWidth="1.2"/>
      <rect x="64" y="364" width="8" height="8" fill="#fff" stroke="#9747FF" strokeWidth="1.2"/>
      <rect x="448" y="364" width="8" height="8" fill="#fff" stroke="#9747FF" strokeWidth="1.2"/>

      <g transform="translate(478, 104)" filter="url(#liftedShadow)">
        <rect width="220" height="252" fill="#1F1F1F" rx="6"/>

        <text x="14" y="22" fill="#fff" fontFamily="sans-serif" fontSize="10" fontWeight="600">Dates and Duration</text>
        <path d="M 130 17 L 134 21 L 138 17" stroke="#aaa" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <rect x="156" y="14" width="9" height="9" fill="none" stroke="#888" strokeWidth="0.8"/>
        <text x="180" y="22" fill="#9747FF" fontFamily="sans-serif" fontSize="11">◊</text>
        <circle cx="198" cy="18" r="1" fill="#888"/>
        <circle cx="202" cy="18" r="1" fill="#888"/>
        <circle cx="206" cy="18" r="1" fill="#888"/>

        <text x="14" y="44" fill="#888" fontFamily="sans-serif" fontSize="9">From this file</text>
        <text x="76" y="44" fill="#9747FF" fontFamily="sans-serif" fontSize="11">◊</text>

        <text x="14" y="60" fill="#888" fontFamily="sans-serif" fontSize="9">Used on: Activity Request Step</text>

        <line x1="14" y1="74" x2="206" y2="74" stroke="#3D3D3D" strokeWidth="0.5"/>

        <text x="14" y="100" fill="#888" fontFamily="sans-serif" fontSize="10">Product</text>
        <rect x="90" y="88" width="116" height="20" fill="#2C2C2C" stroke="#3D3D3D" rx="3"/>
        <text x="96" y="102" fill="#fff" fontFamily="sans-serif" fontSize="9">Savings Fourgous</text>
        <path d="M 192 97 L 196 101 L 200 97" stroke="#888" strokeWidth="1" fill="none" strokeLinecap="round"/>

        <text x="14" y="130" fill="#888" fontFamily="sans-serif" fontSize="10">Context</text>
        <rect x="90" y="118" width="116" height="20" fill="#2196F3" rx="3"/>
        <text x="96" y="132" fill="#fff" fontFamily="sans-serif" fontSize="9" fontWeight="600">✓ Create Proposal</text>

        <text x="14" y="160" fill="#888" fontFamily="sans-serif" fontSize="10">Term</text>
        <rect x="90" y="148" width="116" height="20" fill="#2C2C2C" stroke="#3D3D3D" rx="3"/>
        <text x="96" y="162" fill="#fff" fontFamily="sans-serif" fontSize="9">Fixed with Autom...</text>
        <path d="M 192 157 L 196 161 L 200 157" stroke="#888" strokeWidth="1" fill="none" strokeLinecap="round"/>

        <text x="14" y="190" fill="#888" fontFamily="sans-serif" fontSize="10">Read Only</text>
        <rect x="178" y="182" width="28" height="14" fill="#3D3D3D" rx="7"/>
        <circle cx="185" cy="189" r="5" fill="#888"/>

        <line x1="14" y1="212" x2="206" y2="212" stroke="#3D3D3D" strokeWidth="0.5"/>

        <text x="14" y="228" fill="#888" fontFamily="sans-serif" fontSize="8" letterSpacing="0.8">VARIANT INSTANCES</text>
        <text x="14" y="244" fill="#fff" fontFamily="sans-serif" fontSize="11" fontWeight="700">18</text>
        <text x="36" y="244" fill="#888" fontFamily="sans-serif" fontSize="9">across 4 flows</text>
      </g>

      <g transform="translate(80, 395)" opacity="0.95">
        <rect width="360" height="22" fill="#fff" stroke="#E4E2DA" strokeWidth="0.5" rx="4"/>
        <circle cx="14" cy="11" r="4" fill="#3D9C7A"/>
        <text x="26" y="15" fill="#1a1a1a" fontFamily="sans-serif" fontSize="9" fontWeight="600">Published to Pathfinder library</text>
        <text x="300" y="15" fill="#6B6B6B" fontFamily="sans-serif" fontSize="9">18 instances</text>
      </g>

    </svg>
  );
}

const NAV = [
  { id: "problem",      label: "Problem" },
  { id: "solution",     label: "Solution" },
  { id: "tradeoffs",    label: "Trade-offs" },
  { id: "challenges",   label: "Challenges" },
];

// ─── Small local helpers ─────────────────────────────────────────────────
function SectionLabel({ num, children }) {
  return <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{num} — {children}</div>;
}

function SectionTitle({ children }) {
  const isMobile = useIsMobile();
  return <h2 style={{ fontSize: isMobile ? 32 : 50, fontWeight: 700, color: C.ink, marginBottom: isMobile ? 20 : 28, marginTop: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>{children}</h2>;
}

function CSDivider() {
  const isMobile = useIsMobile();
  return <div style={{ height: 1, background: C.border, margin: isMobile ? "48px 0" : "72px 0" }} />;
}

// ─── Next case study card — adapted for dark/purple background ──────────
function NextCaseStudyCard({ setPage, currentPage }) {
  const isMobile = useIsMobile();
  const next = CASE_STUDIES.find(cs => cs.targetPage !== currentPage);
  if (!next) return null;

  return (
    <div style={{ marginTop: isMobile ? 56 : 80 }}>
      <div style={{ fontSize: 10, color: C.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
        Next case study
      </div>
      <button
        type="button"
        onClick={() => setPage(next.targetPage)}
        style={{
          display: "block",
          width: "100%",
          background: C.purple,
          border: "none",
          borderRadius: 16,
          padding: isMobile ? "24px" : "32px 40px",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "sans-serif",
          transition: "transform 0.25s, box-shadow 0.25s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(45, 31, 94, 0.25)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: isMobile ? 20 : 32, alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, margin: "0 0 10px", color: "#fff", letterSpacing: -0.3 }}>{next.title}</h3>
            <p style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.85)", fontSize: isMobile ? 14 : 15, lineHeight: 1.7 }}>
              {next.description}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {next.tags.map(t => (
                <span key={t} style={{ display: "inline-block", fontSize: 11, padding: "4px 12px", borderRadius: 20, background: C.purpleDark, color: "#e8e0ff", fontWeight: 500 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.neon, fontWeight: 600, fontSize: 14, flexShrink: 0, justifySelf: isMobile ? "flex-start" : "end" }}>
            Read case study
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      </button>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────
export default function DataLibrary({ setPage }) {
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

  return (
    <div style={{ fontFamily: "sans-serif", background: C.bg, color: C.ink, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: C.bgDarker, paddingTop: isMobile ? 96 : 128 }}>
        <div style={{ padding: isMobile ? "32px 24px 24px" : "64px 60px 32px", maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          <h1 style={{ fontSize: isMobile ? 40 : 72, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.05, color: "#ffffff", letterSpacing: -1 }}>Data Library</h1>
          <p style={{ fontSize: isMobile ? 16 : 20, color: "#f5f0ff", lineHeight: 1.5, margin: isMobile ? "0 0 32px" : "0 0 48px" }}>
            Building cross-cutting design infrastructure for a complex B2B platform.
          </p>

          {isMobile ? (
            <div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                {[
                  { label: "Role", primary: "Senior Product Designer", secondary: "Initiative lead" },
                  { label: "Team", primary: "Remote, distributed", secondary: "FR · BE · MA · BG · IN" },
                  { label: "Context", primary: "B2B Insurance", secondary: "DXC Technology" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "grid", gridTemplateColumns: "82px 1fr", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.12)", alignItems: "baseline" }}>
                    <div style={{ fontSize: 10, color: "#a594d4", letterSpacing: 2, textTransform: "uppercase", fontWeight: 500 }}>{row.label}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ fontSize: 14, color: "#ffffff", fontWeight: 400, lineHeight: 1.4 }}>{row.primary}</div>
                      <div style={{ fontSize: 12, color: "#a594d4", fontWeight: 400, lineHeight: 1.4 }}>{row.secondary}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 10, color: "#a594d4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>Skills & Methods</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "flex-start" }}>
                  {["Design Systems", "DesignOps", "Information Architecture", "Systems Thinking", "Documentation", "Figma"].map(t => <span key={t} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#ffffff", fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 2fr", gap: 40 }}>
              <div>
                <div style={{ fontSize: 10, color: "#a594d4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Role</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, color: "#ffffff", fontWeight: 500 }}>
                  <div>Senior Product Designer</div>
                  <div style={{ color: "#a594d4", fontSize: 13, fontWeight: 400 }}>Initiative lead</div>
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
              <div>
                <div style={{ fontSize: 10, color: "#a594d4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Skills & Methods</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
                  {["Design Systems", "DesignOps", "Information Architecture", "Systems Thinking", "Documentation", "Figma"].map(t => <span key={t} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#ffffff", fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero illustration */}
      <div style={{ background: C.bgDarker, paddingTop: 8 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 60px" }}>
          <div style={{ borderRadius: "12px 12px 0 0", overflow: "hidden" }}>
            <DataLibraryHero />
          </div>
        </div>
      </div>

      {/* Spacer between hero and sticky nav */}
      <div style={{ background: C.bg, height: isMobile ? 24 : 48 }} />

      {/* Sticky Nav */}
      <div style={{ position: "sticky", top: 64, zIndex: 50, background: C.bg, borderBottom: "1px solid " + C.border }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 60px" }}>
          <div style={{ display: "flex", gap: 0, overflowX: isMobile ? "auto" : "visible", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style>{`.dl-nav-scroll::-webkit-scrollbar{display:none}`}</style>
            {NAV.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: isMobile ? "14px 14px" : "16px 20px", fontSize: 13, fontWeight: active === n.id ? 700 : 500, whiteSpace: "nowrap", color: active === n.id ? C.ink : C.muted, transition: "all 0.2s", fontFamily: "sans-serif", position: "relative", flexShrink: 0 }}>
                {n.label}
                {active === n.id && <div style={{ position: "absolute", bottom: 0, left: isMobile ? 10 : 16, right: isMobile ? 10 : 16, height: 4, background: C.neon, borderRadius: 2 }} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "32px 24px 56px" : "32px 60px 56px", boxSizing: "border-box" }}>

        {/* Main section — mirrors PathFinder's System Thinking */}
        <div>
          <SectionTitle>When the product grows faster than the system</SectionTitle>
        </div>

        <CSDivider />

        {/* Problem */}
        <div id="problem">
          <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: "0 0 16px", letterSpacing: -0.3 }}>Problem</h3>
          <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, marginBottom: 0, maxWidth: 820 }}>
            As the product evolved and the team grew, inconsistencies began to spread. With no single source of truth, QA testers couldn't tell whether the spec, the design file, or the live app held the correct version — leading to duplicate tickets, alignment calls, and client complaints. In one retrospective, my manager named inconsistency and duplicate tickets as a recurring pain point.
          </p>
        </div>

        <CSDivider />

        {/* Solution */}
        <div id="solution">
          <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: "0 0 16px", letterSpacing: -0.3 }}>Solution</h3>
          <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, marginBottom: 16, maxWidth: 820 }}>
            I led the creation of the Data Library: a system of data-aware patterns built on top of the core design system, enabling consistent representation of complex insurance data across all workflows.
          </p>
          <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 820 }}>
            The diagram below illustrates how the team worked before — and how the Data Library reshaped that workflow.
          </p>

          <DataLibraryDiagram />

          <p style={{ color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: "8px 0 0", maxWidth: 820 }}>
            <span style={{ color: C.ink, fontWeight: 600 }}>Where it stands today:</span> below, what's built and how it's being adopted.
          </p>
          <StateOfPlayBlock />
        </div>

        <CSDivider />

        {/* Trade-offs */}
        <div id="tradeoffs">
          <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: C.ink, marginBottom: 16, letterSpacing: -0.3 }}>Trade-offs</h3>
          <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, marginBottom: 20, maxWidth: 820 }}>
            For the moment, the library stays under single ownership — even though this might not be the optimal solution and could become a bottleneck. Figma branches were also considered, and discarded. These are the reasons:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24, maxWidth: 820 }}>
            {[
              { label: "The library is still maturing.", text: "I'm refining the construction logic as patterns emerge. Distributing edit rights now would lock in decisions that aren't stable yet." },
              { label: "Single-author ownership keeps debugging tight.", text: "When something breaks, the root cause is one decision away, not four." },
              { label: "Figma branches review the surface, not the structure.", text: "The library's value is in how components are constructed — variants, data shapes, nesting. Branches validate visuals; they don't validate architecture." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.muted, opacity: 0.7, letterSpacing: 1, flexShrink: 0, width: 24, paddingTop: 3 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, margin: 0 }}>
                  <span style={{ color: C.ink, fontWeight: 600 }}>{item.label}</span> {item.text}
                </p>
              </div>
            ))}
          </div>

          <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, margin: 0, maxWidth: 820 }}>
            Designers can work in parallel in their files, without being blocked by the library. But integration into the source of truth still passes through me. Scaling this right now would be premature — it would multiply debt on an immature library. Keeping it small and slow is deliberate. Distributing ownership is the next phase — when the construction logic is stable enough to teach, and when the mandate makes governance reviewable rather than personal.
          </p>
        </div>

        <CSDivider />

        {/* Challenges */}
        <div id="challenges">
          <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: C.ink, marginBottom: 12, letterSpacing: -0.3 }}>Challenges</h3>
          <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 820 }}>
            Implementing the Data Library requires a shift in how the team works and organizes itself.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 28 : 32 }}>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>DesignOps</h4>
              <p style={{ color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0, maxWidth: 820 }}>
                Someone has to feed the system continuously — defining patterns, maintaining variants, and keeping the library alive. This requires a transversal view of the product, not a single workflow perspective, and constant communication about what changes and why.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>Team practices</h4>
              <p style={{ color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0, maxWidth: 820 }}>
                The system reshapes how designers work day-to-day — how they pick variants, when to propose new ones, and how they collaborate.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>Governance</h4>
              <p style={{ color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0, maxWidth: 820 }}>
                Every change to a master component needs review and approval before reaching production — the reviewer becomes the gatekeeper of the cross-product experience.
                <br /><br />
                Today, I'm the only person on the team with the transversal view to play this role — a real risk. Distributing this responsibility is the next step.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>AI's role in this</h4>
              <p style={{ color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0, maxWidth: 820 }}>
                AI is reshaping how we feed and maintain the system — helping spot pattern drift, suggesting variant consolidation, and reducing the cost of governance. The challenge is integrating it without losing the design judgment that makes the system coherent.
              </p>
            </div>
          </div>
        </div>

        {/* Next case study */}
        <NextCaseStudyCard setPage={setPage} currentPage="datalibrary" />

        {/* Back to top */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 56 : 80 }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1px solid " + C.border,
              borderRadius: 50,
              padding: "12px 22px",
              fontSize: 13,
              fontWeight: 500,
              color: C.muted,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "sans-serif",
              letterSpacing: 0.2,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.lilacBorder; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            Back to top
          </button>
        </div>

      </div>
    </div>
  );
}
