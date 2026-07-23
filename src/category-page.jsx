import { useIsMobile } from "./App";

// ─── Palette (matches the rest of the site) ────────────────────────────────
const C = {
  bg: "#FAFAF7",
  ink: "#1a1a1a",
  muted: "#6B6B6B",
  faint: "#ADADAD",
  border: "#E4E2DA",
  purple: "#3d2f7a",
  lilacBg: "#EDE8FF",
  lilacBorder: "#C4B8F0",
};

const TINT = ["#E4DFF4", "#EDE8FF", "#F0EBD6"];
const TINT_ICON = ["#a99ed6", "#b3a9d9", "#c9b878"];

function PhotoIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

// Renders a single image slot — real image if `src`, placeholder otherwise
function Slot({ src, alt, height, tintIndex = 0 }) {
  return (
    <div style={{ height, borderRadius: 8, background: TINT[tintIndex % 3], display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {src
        ? <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        : <PhotoIcon color={TINT_ICON[tintIndex % 3]} />}
    </div>
  );
}

// Media block — three modes: single | beforeAfter | gallery
function Media({ media, isMobile }) {
  if (!media) return null;
  const { mode, images = [], caption } = media;

  let content = null;

  if (mode === "beforeAfter") {
    content = (
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
        <div>
          <div style={{ fontSize: 11, color: C.faint, marginBottom: 6 }}>Before</div>
          <Slot src={images[0]} alt="Before" height={isMobile ? 200 : 240} tintIndex={2} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: C.purple, fontWeight: 600, marginBottom: 6 }}>After</div>
          <Slot src={images[1]} alt="After" height={isMobile ? 200 : 240} tintIndex={0} />
        </div>
      </div>
    );
  } else if (mode === "gallery") {
    content = (
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12 }}>
        {images.map((src, i) => <Slot key={i} src={src} alt={"Image " + (i + 1)} height={isMobile ? 130 : 170} tintIndex={i} />)}
      </div>
    );
  } else {
    // single (also used for flow diagrams — full width, tall)
    content = <Slot src={images[0]} alt={caption || "Image"} height={isMobile ? 240 : 380} tintIndex={1} />;
  }

  return (
    <div style={{ margin: "18px 0 14px" }}>
      {content}
      {caption && <div style={{ fontSize: isMobile ? 13 : 14, color: "#555", marginTop: 12, textAlign: "center", fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}>{caption}</div>}
    </div>
  );
}

function MiniCase({ mc, index, isMobile }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
        <span style={{ width: 26, height: 26, borderRadius: "50%", background: C.lilacBg, color: "#4a3a8a", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{index + 1}</span>
        <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, letterSpacing: -0.4, color: C.ink, margin: 0, lineHeight: 1.15 }}>{mc.title}</h3>
      </div>

      <p style={{ fontSize: isMobile ? 15 : 17, color: "#555", lineHeight: 1.7, margin: 0, maxWidth: 720 }}>
        {mc.problem && <><span style={{ color: C.ink, fontWeight: 700 }}>Problem. </span>{mc.problem} </>}
        {mc.approach && <><span style={{ color: C.ink, fontWeight: 700 }}>What I did. </span>{mc.approach}</>}
      </p>

      <Media media={mc.media} isMobile={isMobile} />

      {mc.impact && <div style={{ fontSize: isMobile ? 14 : 15, color: C.purple, fontWeight: 600 }}>{mc.impact}</div>}
    </div>
  );
}

export default function CategoryPage({ data, setPage }) {
  const isMobile = useIsMobile();
  if (!data) return null;

  const shell = {
    maxWidth: 980,
    margin: "0 auto",
    padding: isMobile ? "32px 24px 56px" : "48px 60px 80px",
    boxSizing: "border-box",
    width: "100%",
  };

  return (
    <div style={{ fontFamily: "sans-serif", background: C.bg, color: C.ink, minHeight: "100vh", paddingTop: 64 }}>
      <div style={shell}>

        {/* Back link */}
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "sans-serif", fontSize: 13, color: C.muted, display: "inline-flex", alignItems: "center", gap: 8, padding: 0, marginBottom: 28 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to work
        </button>

        {/* Intro */}
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.muted, marginBottom: 12, fontWeight: 500 }}>{data.eyebrow}</div>
        <h1 style={{ fontSize: isMobile ? 34 : 50, fontWeight: 800, letterSpacing: -0.8, color: C.ink, margin: "0 0 16px", lineHeight: 1.1 }}>{data.title}</h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "#555", lineHeight: 1.7, margin: 0, maxWidth: 640 }}>
          {data.intro} {data.count && <span style={{ color: C.purple, fontWeight: 600 }}>{data.count}</span>}
        </p>

        {/* Mini-cases */}
        {data.miniCases.map((mc, i) => (
          <div key={i}>
            <div style={{ height: 1, background: C.border, margin: isMobile ? "36px 0" : "56px 0" }} />
            <MiniCase mc={mc} index={i} isMobile={isMobile} />
          </div>
        ))}

        {/* Back to top */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 48 : 72 }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "transparent", border: "1px solid " + C.border, borderRadius: 50, padding: "12px 22px", fontSize: 13, fontWeight: 500, color: C.muted, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "sans-serif" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.lilacBorder; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            Back to top
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Category content ────────────────────────────────────────────────────
// One entry per category page, keyed by the page id used in setPage(...).
// Fill `image` slots with URLs (same Cloudinary scheme you already use).
// media.mode: "single" | "beforeAfter" | "gallery"
export const CATEGORY_PAGES = {
  flows: {
    eyebrow: "User Journeys & Flows",
    title: "Mapping the paths users take",
    intro: "How I mapped and reshaped the journeys behind the product.",
    count: "1 flow",
    miniCases: [
      {
        title: "Order & Payment",
        problem: "Describe the problem in 1–2 lines — what was fragmented or confusing in the flow.",
        approach: "Describe what you did — mapped the journey end to end and designed a continuous path.",
        media: {
          mode: "single",
          images: [null], // ← drop the flow-diagram URL here
          caption: "User journey — Order & Payment",
        },
        impact: "Impact in one line (metric if you have one).",
      },
    ],
  },
};
