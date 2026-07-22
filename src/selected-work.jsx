import { useIsMobile } from "./App";

// ─── Palette (matches App.jsx) ─────────────────────────────────────────────
const C = {
  bg: "#FAFAF7",
  ink: "#1a1a1a",
  muted: "#6B6B6B",
  border: "#E4E2DA",
};

// Soft tints used behind the image placeholders
const TINT = {
  lilac: { bg: "#E4DFF4", icon: "#a99ed6" },
  lilac2: { bg: "#EDE8FF", icon: "#b3a9d9" },
  gold: { bg: "#F0EBD6", icon: "#c9b878" },
};

// ─── Categories ─────────────────────────────────────────────────────────────
// Chronological order of the redesign. `area` maps to the desktop grid below.
// Drop a Cloudinary (or any) URL into `image` to replace the placeholder.
const CATEGORIES = [
  { title: "Information Architecture", area: "ia",     tint: "lilac",  image: null },
  { title: "Key Features",            area: "kf",     tint: "lilac2", image: null },
  { title: "User Journeys & Flows",   area: "flows",  tint: "gold",   image: null, horizontal: true },
  { title: "User Research",           area: "ur",     tint: "lilac2", image: null },
  { title: "Audits",                  area: "audits", tint: "gold",   image: null },
  { title: "Design System",           area: "ds",     tint: "lilac",  image: null },
  { title: "Leadership",              area: "lead",   tint: "lilac2", image: null },
];

// Desktop mosaic — 4 columns × 5 rows, fully filled (no gaps)
const DESKTOP_AREAS = [
  '"ia ia kf kf"',
  '"ia ia kf kf"',
  '"ia ia flows flows"',
  '"ur audits ds lead"',
  '"ur audits ds lead"',
].join(" ");

// Mobile — single column, chronological
const MOBILE_AREAS = [
  '"ia"', '"kf"', '"flows"', '"ur"', '"audits"', '"ds"', '"lead"',
].join(" ");

function PhotoIcon({ color, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function Card({ cat, isMobile }) {
  const tint = TINT[cat.tint] || TINT.lilac;

  // Short/wide horizontal card (Flows) on desktop only
  if (cat.horizontal && !isMobile) {
    return (
      <div style={{ gridArea: cat.area, background: "#fff", border: "1px solid " + C.border, borderRadius: 8, overflow: "hidden", display: "flex", alignItems: "center", gap: 14, padding: "0 16px" }}>
        <div style={{ width: 52, height: 52, borderRadius: 6, background: tint.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
          {cat.image
            ? <img src={cat.image} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <PhotoIcon color={tint.icon} size={20} />}
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3, color: C.ink, lineHeight: 1.1 }}>{cat.title}</div>
      </div>
    );
  }

  return (
    <div style={{ gridArea: cat.area, background: "#fff", border: "1px solid " + C.border, borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: isMobile ? 150 : 0 }}>
      <div style={{ flex: 1, minHeight: 0, background: tint.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {cat.image
          ? <img src={cat.image} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <PhotoIcon color={tint.icon} size={26} />}
      </div>
      <div style={{ padding: "14px 16px", fontSize: cat.area === "ia" ? 22 : 15, fontWeight: 800, letterSpacing: -0.3, color: C.ink, lineHeight: 1.15 }}>
        {cat.title}
      </div>
    </div>
  );
}

// Home section — full-width band with its own shell + background.
export default function SelectedWork() {
  const isMobile = useIsMobile();

  const shell = {
    maxWidth: 1280,
    margin: "0 auto",
    padding: isMobile ? "48px 24px" : "80px 60px",
    boxSizing: "border-box",
    width: "100%",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
    gridTemplateAreas: isMobile ? MOBILE_AREAS : DESKTOP_AREAS,
    gridAutoRows: isMobile ? "150px" : "110px",
    gap: 14,
  };

  return (
    <div style={{ background: C.bg }} id="selected-work">
      <div style={shell}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.muted, marginBottom: isMobile ? 24 : 32, fontWeight: 500 }}>
          Selected Work
        </div>
        <div style={grid}>
          {CATEGORIES.map((cat) => (
            <Card key={cat.area} cat={cat} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
}
