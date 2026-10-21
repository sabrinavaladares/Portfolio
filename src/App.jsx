import { useState, useEffect } from "react";
import CaseStudy from "./case-study";
import DataLibrary, { DataLibraryHero } from "./data-library";
import SelectedWork from "./selected-work";
import CategoryPage, { CATEGORY_PAGES } from "./category-page";

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
    maxWidth: 1280,
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

function Label({ children
