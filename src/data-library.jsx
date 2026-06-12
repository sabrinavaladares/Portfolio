import { useState } from "react";
import { useIsMobile, CASE_STUDIES } from "./App";
import { DataLibraryDiagram, StateOfPlayBlock } from "./case-study";

// ─── Palette — saturated purple aesthetic (matches PathFinder's System Thinking) ─
const C = {
  bg: "#4E4577",
  bgDark: "#3F3863",
  bgDarker: "#2d1f5e",
  text: "#F5F1FC",
  textBright: "#ffffff",
  textMuted: "rgba(245, 241, 252, 0.7)",
  textFaint: "#a594d4",
  border: "rgba(255, 255, 255, 0.12)",
  neon: "#E1FB62",
};

const NAV = [
  { id: "context",      label: "Context" },
  { id: "problem",      label: "Problem" },
  { id: "solution",     label: "Solution" },
  { id: "state",        label: "State of Play" },
  { id: "tradeoffs",    label: "Trade-offs" },
  { id: "challenges",   label: "Challenges" },
  { id: "reflections",  label: "Reflections" },
];

// ─── Small local helpers (purple-themed) ─────────────────────────────────
function SectionLabel({ num, children }) {
  return <div style={{ fontSize: 11, color: "#EDE5FA", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{num} — {children}</div>;
}

function SectionTitle({ children }) {
  const isMobile = useIsMobile();
  return <h2 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, color: C.textBright, marginBottom: isMobile ? 20 : 28, marginTop: 0, letterSpacing: -0.4, lineHeight: 1.2 }}>{children}</h2>;
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
      <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
        Next case study
      </div>
      <button
        type="button"
        onClick={() => setPage(next.targetPage)}
        style={{
          display: "block",
          width: "100%",
          background: C.bgDark,
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          padding: isMobile ? "24px" : "32px 40px",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "sans-serif",
          transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: isMobile ? 20 : 32, alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, margin: "0 0 10px", color: "#fff", letterSpacing: -0.3 }}>{next.title}</h3>
            <p style={{ margin: "0 0 16px", color: C.text, fontSize: isMobile ? 14 : 15, lineHeight: 1.7 }}>
              {next.description}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {next.tags.map(t => (
                <span key={t} style={{ display: "inline-block", fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.08)", color: C.text, border: "1px solid rgba(255,255,255,0.15)", fontWeight: 500 }}>
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
    <div style={{ fontFamily: "sans-serif", background: C.bg, color: C.text, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: C.bgDarker, paddingTop: isMobile ? 96 : 128 }}>
        <div style={{ padding: isMobile ? "32px 24px 24px" : "64px 60px 32px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          <h1 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.05, color: "#ffffff", letterSpacing: -1 }}>Data Library</h1>
          <p style={{ fontSize: isMobile ? 15 : 20, color: "#f5f0ff", lineHeight: 1.5, margin: isMobile ? "0 0 32px" : "0 0 48px" }}>
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
                    <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500 }}>{row.label}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ fontSize: 14, color: "#ffffff", fontWeight: 400, lineHeight: 1.4 }}>{row.primary}</div>
                      <div style={{ fontSize: 12, color: C.textFaint, fontWeight: 400, lineHeight: 1.4 }}>{row.secondary}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>Skills & Methods</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "flex-start" }}>
                  {["Design Systems", "DesignOps", "Information Architecture", "Systems Thinking", "Documentation", "Figma"].map(t => <span key={t} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#ffffff", fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 2fr", gap: 40 }}>
              <div>
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Role</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, color: "#ffffff", fontWeight: 500 }}>
                  <div>Senior Product Designer</div>
                  <div style={{ color: C.textFaint, fontSize: 13, fontWeight: 400 }}>Initiative lead</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Team</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, color: "#ffffff", fontWeight: 500 }}>
                  <div>Remote, distributed</div>
                  <div style={{ color: C.textFaint, fontSize: 13, fontWeight: 400 }}>FR · BE · MA · BG · IN</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Context</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, color: "#ffffff", fontWeight: 500 }}>
                  <div>B2B Insurance</div>
                  <div style={{ color: C.textFaint, fontSize: 13, fontWeight: 400 }}>DXC Technology</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Skills & Methods</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
                  {["Design Systems", "DesignOps", "Information Architecture", "Systems Thinking", "Documentation", "Figma"].map(t => <span key={t} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#ffffff", fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero placeholder — to replace with real image later */}
      <div style={{ background: C.bgDarker, paddingTop: 8 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 16px" : "0 60px" }}>
          <div style={{ background: C.bgDark, borderRadius: "12px 12px 0 0", padding: isMobile ? "60px 24px" : "80px 60px", border: "2px dashed rgba(255,255,255,0.18)", borderBottom: "none", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Hero image — to replace</div>
          </div>
        </div>
      </div>

      {/* Spacer between hero and sticky nav */}
      <div style={{ background: C.bg, height: isMobile ? 24 : 48 }} />

      {/* Sticky Nav */}
      <div style={{ position: "sticky", top: 64, zIndex: 50, background: C.bg, borderBottom: "1px solid " + C.border }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 16px" : "0 60px" }}>
          <div style={{ display: "flex", gap: 0, overflowX: isMobile ? "auto" : "visible", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style>{`.dl-nav-scroll::-webkit-scrollbar{display:none}`}</style>
            {NAV.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: isMobile ? "14px 14px" : "16px 20px", fontSize: 13, fontWeight: active === n.id ? 700 : 500, whiteSpace: "nowrap", color: active === n.id ? C.textBright : C.textMuted, transition: "all 0.2s", fontFamily: "sans-serif", position: "relative", flexShrink: 0 }}>
                {n.label}
                {active === n.id && <div style={{ position: "absolute", bottom: 0, left: isMobile ? 10 : 16, right: isMobile ? 10 : 16, height: 4, background: C.neon, borderRadius: 2 }} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "32px 24px 56px" : "32px 60px 56px", boxSizing: "border-box" }}>

        {/* 01 Context */}
        <div id="context">
          <SectionLabel num="01">Context</SectionLabel>
          <SectionTitle>How the Data Library Started</SectionTitle>
          <div style={{ maxWidth: 820 }}>
            <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 20 }}>
              The Data Library was born from a tension I lived inside the team for years. PathFinder is DXC Technology's B2B insurance platform — a product that has grown to serve multiple insurance lines for clients across several countries. The design team has grown alongside it. But the way we worked together hadn't.
            </p>
            <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 20 }}>
              Designs lived in separate Figma files. The same component existed in dozens of places, drifting slightly each time. QA testers couldn't tell which version was the source of truth — the spec, the design file, or the live app. Inconsistencies multiplied faster than we could absorb.
            </p>
            <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 0 }}>
              This case study is about what I built to fix that, the trade-offs along the way, and what I'm still learning about building systems inside a product team.
            </p>
          </div>
        </div>

        <CSDivider />

        {/* 02 Problem */}
        <div id="problem">
          <SectionLabel num="02">Problem</SectionLabel>
          <SectionTitle>When the Product Grows Faster Than the System</SectionTitle>
          <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 0, maxWidth: 820 }}>
            As the product evolved and the team grew, inconsistencies began to spread. With no single source of truth, QA testers couldn't tell whether the spec, the design file, or the live app held the correct version — leading to duplicate tickets, alignment calls, and client complaints. In one retrospective, my manager named inconsistency and duplicate tickets as a recurring pain point.
          </p>
        </div>

        <CSDivider />

        {/* 03 Solution */}
        <div id="solution">
          <SectionLabel num="03">Solution</SectionLabel>
          <SectionTitle>The Data Library</SectionTitle>
          <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 16, maxWidth: 820 }}>
            I led the creation of the Data Library: a system of data-aware patterns built on top of the core design system, enabling consistent representation of complex insurance data across all workflows.
          </p>
          <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 32, maxWidth: 820 }}>
            The diagram below illustrates how the team worked before — and how the Data Library reshaped that workflow.
          </p>
          <DataLibraryDiagram />
        </div>

        <CSDivider />

        {/* 04 State of Play */}
        <div id="state">
          <SectionLabel num="04">State of Play</SectionLabel>
          <SectionTitle>Where It Stands Today</SectionTitle>
          <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, margin: 0, maxWidth: 820 }}>
            Below, what's built and how it's being adopted.
          </p>
          <StateOfPlayBlock />
        </div>

        <CSDivider />

        {/* 05 Trade-offs */}
        <div id="tradeoffs">
          <SectionLabel num="05">Trade-offs</SectionLabel>
          <SectionTitle>What I Chose Not to Do</SectionTitle>
          <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 20, maxWidth: 820 }}>
            For the moment, the library stays under single ownership — even though this might not be the optimal solution and could become a bottleneck. Figma branches were also considered, and discarded. These are the reasons:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24, maxWidth: 820 }}>
            {[
              { label: "The library is still maturing.", text: "I'm refining the construction logic as patterns emerge. Distributing edit rights now would lock in decisions that aren't stable yet." },
              { label: "Single-author ownership keeps debugging tight.", text: "When something breaks, the root cause is one decision away, not four." },
              { label: "Figma branches review the surface, not the structure.", text: "The library's value is in how components are constructed — variants, data shapes, nesting. Branches validate visuals; they don't validate architecture." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", opacity: 0.5, letterSpacing: 1, flexShrink: 0, width: 24, paddingTop: 3 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, margin: 0 }}>
                  <span style={{ color: "#fff", fontWeight: 500 }}>{item.label}</span> {item.text}
                </p>
              </div>
            ))}
          </div>

          <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, margin: 0, maxWidth: 820 }}>
            Designers can work in parallel in their files, without being blocked by the library. But integration into the source of truth still passes through me. Scaling this right now would be premature — it would multiply debt on an immature library. Keeping it small and slow is deliberate. Distributing ownership is the next phase — when the construction logic is stable enough to teach, and when the mandate makes governance reviewable rather than personal.
          </p>
        </div>

        <CSDivider />

        {/* 06 Challenges */}
        <div id="challenges">
          <SectionLabel num="06">Challenges</SectionLabel>
          <SectionTitle>What It Demands From the Team</SectionTitle>
          <p style={{ color: C.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 32, maxWidth: 820 }}>
            Implementing the Data Library requires a shift in how the team works and organizes itself.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 28 : 32, maxWidth: 820 }}>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>DesignOps</h4>
              <p style={{ color: C.text, fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0 }}>
                Someone has to feed the system continuously — defining patterns, maintaining variants, and keeping the library alive. This requires a transversal view of the product, not a single workflow perspective, and constant communication about what changes and why.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>Team practices</h4>
              <p style={{ color: C.text, fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0 }}>
                The system reshapes how designers work day-to-day — how they pick variants, when to propose new ones, and how they collaborate.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>Governance</h4>
              <p style={{ color: C.text, fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0 }}>
                Every change to a master component needs review and approval before reaching production — the reviewer becomes the gatekeeper of the cross-product experience.
                <br /><br />
                Today, I'm the only person on the team with the transversal view to play this role — a real risk. Distributing this responsibility is the next step.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>AI's role in this</h4>
              <p style={{ color: C.text, fontSize: isMobile ? 14 : 15, lineHeight: 1.7, margin: 0 }}>
                AI can be a real ally here — spotting inconsistencies, identifying missing Lego pieces in the architecture, and generating documentation about what changes between versions. Defining how it fits into the workflow — as a contributor that supports the team without replacing the transversal judgment — is part of what comes next.
              </p>
            </div>
          </div>
        </div>

        <CSDivider />

        {/* 07 Reflections — placeholder */}
        <div id="reflections">
          <SectionLabel num="07">Reflections</SectionLabel>
          <SectionTitle>What I'm Still Learning</SectionTitle>
          <div style={{ maxWidth: 820, padding: isMobile ? "32px 24px" : "40px 32px", borderRadius: 12, border: "2px dashed rgba(255,255,255,0.18)", textAlign: "center", color: "rgba(255,255,255,0.55)" }}>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
              Placeholder — to write
            </p>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
              What I've learned about building systems inside a product team: when to push, when to wait, when single ownership is right, and when distributing responsibility becomes the bottleneck-removing move.
            </p>
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
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 50,
              padding: "12px 22px",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "sans-serif",
              letterSpacing: 0.2,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
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
