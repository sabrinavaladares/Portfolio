import { useState } from "react";

const PASS = import.meta.env.VITE_PORTFOLIO_PASS;

export default function PasswordGate({ children }) {
  const [ok, setOk] = useState(sessionStorage.getItem("pf_ok") === "1");
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  if (ok) return children;

  const submit = () => {
    if (val === PASS) { sessionStorage.setItem("pf_ok", "1"); setOk(true); }
    else setErr(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#FAFAF7" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
        <input type="password" value={val} placeholder="Password"
          onChange={e => { setVal(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={{ padding: 12, border: "1px solid #E4E2DA", borderRadius: 8 }} />
        <button onClick={submit} style={{ padding: 12, borderRadius: 8, border: "none", background: "#1a1a1a", color: "#fff", cursor: "pointer" }}>Enter</button>
        {err && <span style={{ color: "#b00", fontSize: 13 }}>Wrong password</span>}
        <span style={{ color: "#888", fontSize: 12 }}>Password provided in my application or on request.</span>
      </div>
    </div>
  );
}
