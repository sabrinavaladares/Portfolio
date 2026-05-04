import { useState, useEffect } from "react";
import CaseStudy from "./case-study";

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
  purple: "rgb(61, 47, 122)",
  purpleDark: "rgb(42, 32, 88)",
};

// ─── Mobile detection hook (shared with case-study.jsx) ──────────────────
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

const CARDS = [
  { icon: "🎨", title: "Product Design", desc: "Improving screens through better navigation, clearer content organisation, and smarter visual hierarchy — surfacing what matters, hiding what doesn't, and building consistency across every interaction." },
  { icon: "🏗️", title: "Systems & Foundations", desc: "From scalable design systems to a Data Library with 600+ components — I build the infrastructure that empowers teams to design faster, more consistently, and with full confidence." },
  { icon: "🧭", title: "Design Hub & Mentorship", desc: "I naturally become the anchor for design decisions — the person teams turn to when clarity is needed. As Matthieu put it: 'She became the hub for all design decisions.' I guide, align, and mentor to make the whole team stronger." },
];

const INTERESTS = [
  ["\uD83C\uDFC4", "Kitesurfer when the wind is right"],
  ["\uD83C\uDFB8", "Learning guitar (slowly but surely)"],
  ["\uD83D\uDEB4", "Cyclist who takes the route less traveled by (and that makes all the difference)"],
  ["\uD83C\uDDE7\uD83C\uDDF7", "Brazilian living the French life"],
  ["\u2615", "Coffee first, design second"],
  ["\uD83C\uDDEE\uD83C\uDDF9", "Learning Italian - perch\u00E9 no?"],
  ["\uD83C\uDFC5", "4 sports, mediocre at all of them (and proud of it)"],
];

const HERO_MIN_HEIGHT = "calc(100vh - 64px)";

// CS = content shell — responsive max-width container
function useShell() {
  const isMobile = useIsMobile();
  return {
    maxWidth: 1100,
    margin: "0 auto",
    padding: isMobile ? "48px 24px" : "80px 60px",
    boxSizing: "border-box",
    width: "100%",
  };
}

function Tag({ children, dark }) {
  if (dark) {
    return (
      <span style={{ display: "inline-block", fontSize: 12, padding: "5px 14px", borderRadius: 20, background: C.purpleDark, color: "#e8e0ff", fontWeight: 500, marginRight: 6, marginBottom: 6 }}>
        {children}
      </span>
    );
  }
  return (
    <span style={{ display: "inline-block", fontSize: 12, padding: "5px 14px", borderRadius: 20, background: C.lilacBg, color: "#4a3a8a", border: "1px solid " + C.lilacBorder, fontWeight: 500, marginRight: 6, marginBottom: 6 }}>
      {children}
    </span>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>{children}</div>;
}

function Divider() {
  return <div style={{ height: 1, background: C.border }} />;
}

// ─── Contact icons — used inline in the nav now ──────────────────────────
function ContactIcons({ color, hoverColor, gap = 4 }) {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 6,
    color: color,
    transition: "color 0.2s",
    textDecoration: "none",
  };
  return (
    <div style={{ display: "flex", gap, alignItems: "center" }}>
      <a
        href="mailto:sabrina.valadares@gmail.com"
        aria-label="Email"
        style={baseStyle}
        onMouseEnter={(e) => { e.currentTarget.style.color = hoverColor; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = color; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
      </a>
      <a
        href="https://www.linkedin.com/in/sabrina-valadares-924a7074/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        style={{ ...baseStyle, fontFamily: "sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: -0.5 }}
        onMouseEnter={(e) => { e.currentTarget.style.color = hoverColor; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = color; }}
      >
        in
      </a>
    </div>
  );
}

// Desktop-only floating contact bar (kept for desktop, removed on mobile)
function ContactBar() {
  const isMobile = useIsMobile();
  const [onPurple, setOnPurple] = useState(false);

  useEffect(() => {
    if (isMobile) return; // disabled on mobile
    const targetRgb = "rgb(61, 47, 122)";

    const isPurpleAt = (el) => {
      let node = el;
      while (node && node !== document.body) {
        const bg = getComputedStyle(node).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          return bg === targetRgb;
        }
        node = node.parentElement;
      }
      return false;
    };

    const check = () => {
      const x = window.innerWidth - 48;
      const y = window.innerHeight - 40;
      const bar = document.getElementById("contact-bar");
      const prev = bar ? bar.style.pointerEvents : "";
      if (bar) bar.style.pointerEvents = "none";
      const el = document.elementFromPoint(x, y);
      if (bar) bar.style.pointerEvents = prev;
      setOnPurple(el ? isPurpleAt(el) : false);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const baseColor = onPurple ? "rgba(255,255,255,0.7)" : C.muted;
  const hoverColor = onPurple ? "#ffffff" : C.ink;

  return (
    <div id="contact-bar" style={{ position: "fixed", bottom: 24, right: 32, zIndex: 100 }}>
      <ContactIcons color={baseColor} hoverColor={hoverColor} />
    </div>
  );
}

function Nav({ page, setPage }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const isWork = page === "casestudy";
  const navBg = isWork ? "rgba(61, 47, 122, 0.92)" : C.bg + "f0";
  const navBorder = isWork ? "1px solid rgba(255,255,255,0.12)" : "1px solid " + C.border;
  const nameColor = isWork ? "#ffffff" : C.ink;
  const subtitleColor = isWork ? "rgba(255,255,255,0.72)" : "#555";
  const activeLinkColor = isWork ? "#ffffff" : C.ink;
  const inactiveLinkColor = isWork ? "rgba(255,255,255,0.6)" : C.faint;

  // Close menu when route changes
  useEffect(() => { setMenuOpen(false); }, [page]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  const links = [
    ["home", "Home"],
    ["casestudy", "Work"],
    ["about", "About"],
  ];

  // Icon colors for hamburger / contact icons inside nav
  const iconColor = isWork ? "rgba(255,255,255,0.7)" : C.muted;
  const iconHover = isWork ? "#ffffff" : C.ink;

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: navBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: navBorder, transition: "background 0.25s ease, border-color 0.25s ease" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : "0 60px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64, boxSizing: "border-box", width: "100%", gap: 12 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, padding: 0, minWidth: 0, flex: isMobile ? "1 1 auto" : "0 0 auto", textAlign: "left" }}>
          <span style={{ color: nameColor, fontWeight: 700, fontSize: isMobile ? 14 : 15, lineHeight: 1.2, transition: "color 0.25s ease", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>Sabrina Valadares</span>
          <span style={{ fontSize: isMobile ? 11 : 13, color: subtitleColor, fontWeight: 400, lineHeight: 1.3, transition: "color 0.25s ease", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>Brazilian designer based in France</span>
        </button>

        {/* Desktop: links + (floating ContactBar handles icons) */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 36 }}>
            {links.map(([id, label]) => {
              const isActive = page === id;
              return (
                <button key={id} onClick={() => setPage(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif", color: isActive ? activeLinkColor : inactiveLinkColor, fontWeight: isActive ? 600 : 400, borderBottom: isActive ? "2px solid " + C.neon : "2px solid transparent", paddingBottom: 4, transition: "color 0.25s ease, border-color 0.25s ease" }}>
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile: contact icons + hamburger */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <ContactIcons color={iconColor} hoverColor={iconHover} gap={2} />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, marginLeft: 2, color: iconColor, display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36 }}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, background: navBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: navBorder, padding: "8px 0 12px", animation: "navSlideDown 0.2s ease-out" }}>
          <style>{`@keyframes navSlideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          {links.map(([id, label]) => {
            const isActive = page === id;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  fontFamily: "sans-serif",
                  color: isActive ? activeLinkColor : inactiveLinkColor,
                  fontWeight: isActive ? 600 : 400,
                  padding: "14px 24px",
                  textAlign: "left",
                  position: "relative",
                  borderLeft: isActive ? "3px solid " + C.neon : "3px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}

function CaseStudyCard({ setPage }) {
  const isMobile = useIsMobile();
  return (
    <div
      onClick={() => setPage("casestudy")}
      style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer", border: "1px solid " + C.border, transition: "all 0.25s" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.lilacBorder; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ height: isMobile ? 240 : 500, overflow: "hidden", position: "relative" }}>
        <img
          src="https://res.cloudinary.com/diso2uvpx/image/upload/hero-image_omdqpa.png"
          alt="PathFinder hero"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </div>
      <div style={{ padding: isMobile ? "20px 20px" : "24px 32px", background: C.purple, display: "grid", gridTemplateColumns: isMobile ? "1fr auto" : "1fr auto", alignItems: "center", gap: isMobile ? 16 : 24 }}>
        <div>
          <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, margin: "0 0 10px", color: "#fff" }}>PathFinder</h3>
          <p style={{ margin: "0 0 16px", color: "#ffffff", fontSize: isMobile ? 14 : 15, lineHeight: 1.7 }}>
            Redesigning a complex B2B insurance software and building the design systems that scale it.
          </p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Tag dark>UX Design</Tag>
            <Tag dark>DesignOps</Tag>
            <Tag dark>Design System</Tag>
          </div>
        </div>
        <div style={{ width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: "50%", background: C.purpleDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 18 : 22, flexShrink: 0, color: C.neon, fontWeight: 700 }}>&#8594;</div>
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  const isMobile = useIsMobile();
  const shell = useShell();

  return (
    <div style={{ paddingTop: 64 }}>
      <div style={{ background: C.bg, minHeight: isMobile ? "auto" : HERO_MIN_HEIGHT, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "32px 24px 8px" : "60px 60px", boxSizing: "border-box", width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 340px", gap: isMobile ? 40 : 80, alignItems: "center" }}>
              {/* Text first on both — on mobile, photo follows underneath */}
              <div>
                <h1 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 800, margin: "0 0 20px", color: C.ink, lineHeight: 1.1, letterSpacing: isMobile ? -0.5 : 0 }}>
                  Designer.<br />System Thinker.<br />Foundation Builder.
                </h1>
                <p style={{ margin: "0 0 16px", color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.75, maxWidth: 480 }}>
                  Hello, I'm Sabrina. Over the past 8 years, I've been designing a complex B2B insurance product — creating user experiences that simplify complexity, and building the DesignOps infrastructure that makes the whole team more effective.
                </p>
                <p style={{ margin: 0, color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.75, maxWidth: 480 }}>
                  From interviewing users to building the design infrastructure that scales teams — I cover the full end-to-end design spectrum.
                </p>
              </div>

              <div style={{ position: "relative", maxWidth: isMobile ? 280 : "none", width: "100%", margin: isMobile ? "8px auto 24px" : 0 }}>
                <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: 20, overflow: "hidden", background: C.lilacBg }}>
                  <img src="https://sabrinavaladares.github.io/portfolio-images/1516535750515.jpeg" alt="Sabrina Valadares" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div style={{ position: "absolute", bottom: -12, right: -12, width: isMobile ? 60 : 80, height: isMobile ? 60 : 80, borderRadius: 12, background: "#FFD230", zIndex: -1 }} />
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div style={{ width: "100%" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "20px 24px" : "24px 60px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 16 : 40, boxSizing: "border-box", width: "100%" }}>
            {[
              { label: "Role", value: "Senior Product Designer" },
              { label: "Experience", value: "8 years" },
              { label: "Company", value: "DXC Technology" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  paddingRight: isMobile ? 0 : 40,
                  paddingBottom: isMobile && i < 2 ? 16 : 0,
                  borderRight: !isMobile && i < 2 ? "1px solid " + C.border : "none",
                  borderBottom: isMobile && i < 2 ? "1px solid " + C.border : "none",
                }}
              >
                <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: C.ink, fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      <div style={{ background: C.bg }}>
        <div style={shell}>
          <div style={{ marginBottom: isMobile ? 32 : 48 }}>
            <Label>Selected Work</Label>
            <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, margin: 0, color: C.ink, letterSpacing: -0.3 }}>Case Studies</h2>
          </div>
          <CaseStudyCard setPage={setPage} />
          <div style={{ marginTop: 16, background: C.bgAlt, borderRadius: 16, padding: isMobile ? "20px 24px" : "28px 40px", border: "1px dashed " + C.border, textAlign: "center", color: C.faint, fontSize: 13 }}>
            More case studies coming soon
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  const isMobile = useIsMobile();
  const shell = useShell();

  return (
    <div style={{ paddingTop: 64, background: C.bg, minHeight: "100vh" }}>
      <div style={shell}>
        <Label>About</Label>
        <h1 style={{ fontSize: isMobile ? 32 : 42, fontWeight: 800, margin: isMobile ? "0 0 40px" : "0 0 64px", color: C.ink, letterSpacing: isMobile ? -0.5 : 0, lineHeight: 1.1 }}>Hi, I'm Sabrina</h1>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: isMobile ? 32 : 80, marginBottom: isMobile ? 56 : 80, alignItems: "start" }}>
          {/* Photo placeholder appears AFTER text on mobile (text-first), before on desktop layout but visually it's right column */}
          <div style={{ order: isMobile ? 1 : 1 }}>
            <p style={{ marginBottom: 20, color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.75 }}>
              I'm a curious, creative Brazilian with a love for adventure!
            </p>
            <p style={{ marginBottom: 20, color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.75 }}>
              I studied Industrial Design in Rio de Janeiro before moving to France to pursue a Master's in Design &amp; Management, where I wrote my thesis on Design Thinking. That move across the Atlantic was the first of many bold decisions.
            </p>
            <p style={{ marginBottom: 20, color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.75 }}>
              My career shifted from physical to digital products when I joined DXC Technology — where I've spent the past 8 years redesigning a complex B2B insurance platform. What started as a UX redesign became something much bigger: building the systems, frameworks, and foundations that help a whole team design better.
            </p>
            <p style={{ color: "#555", fontSize: isMobile ? 14 : 15, lineHeight: 1.75 }}>
              What drives me most is spotting tensions — the moments where something feels harder than it should — and finding the clearest, simplest path through. My mission is the same whether I'm designing for users or guiding my team: make it so obvious that nobody needs to ask. I am driven by the title of a book: <em>Don't Make Me Think.</em>
            </p>
          </div>
          <div style={{ order: isMobile ? 2 : 2, borderRadius: 20, overflow: "hidden", background: C.lilacBg, display: "flex", alignItems: "center", justifyContent: "center", color: C.faint, fontSize: 13, border: "1px solid " + C.lilacBorder, height: isMobile ? 280 : "100%", aspectRatio: isMobile ? "4/3" : "auto" }}>
            Profile photo
          </div>
        </div>

        <Divider />

        <div style={{ paddingTop: isMobile ? 40 : 64, marginBottom: isMobile ? 56 : 80 }}>
          <Label>What I do</Label>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 16, marginTop: 8 }}>
            {CARDS.map((item, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: isMobile ? "24px" : "28px", borderTop: "3px solid " + C.neon }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.8 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div style={{ paddingTop: isMobile ? 40 : 64, marginBottom: isMobile ? 40 : 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: isMobile ? 40 : 80 }}>
            <div>
              <Label>Interests</Label>
              <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
                {INTERESTS.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 14, paddingTop: 14, borderBottom: "1px solid " + C.border, borderTop: i === 0 ? "1px solid " + C.border : "none" }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{item[0]}</span>
                    <span style={{ fontSize: isMobile ? 14 : 15, color: C.muted, lineHeight: 1.5 }}>{item[1]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Languages</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
                {[
                  { lang: "Portuguese", level: "Native" },
                  { lang: "French", level: "Fluent" },
                  { lang: "English", level: "Fluent" },
                  { lang: "Spanish", level: "Fluent" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, paddingTop: 14, borderBottom: "1px solid " + C.border, borderTop: i === 0 ? "1px solid " + C.border : "none" }}>
                    <span style={{ fontSize: isMobile ? 14 : 15, color: C.muted, fontWeight: 400 }}>{item.lang}</span>
                    <span style={{ fontSize: 12, color: C.muted, letterSpacing: 1, textTransform: "uppercase" }}>{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  return (
    <div style={{ fontFamily: "sans-serif", background: C.bg, minHeight: "100vh", color: C.ink }}>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "about" && <AboutPage />}
      {page === "casestudy" && <CaseStudy />}
      <ContactBar />
    </div>
  );
}
