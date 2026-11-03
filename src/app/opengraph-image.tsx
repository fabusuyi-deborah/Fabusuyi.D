import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card, generated at build time. */
export default function OpengraphImage() {
  const grid = "linear-gradient(#c9ccc3 1px, transparent 1px), linear-gradient(90deg, #c9ccc3 1px, transparent 1px)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#ecede8",
          backgroundImage: grid,
          backgroundSize: "64px 64px",
          color: "#121412",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
          <span style={{ fontWeight: 800, letterSpacing: 1 }}>
            FABUSUYI<span style={{ color: "#2233f0" }}>.</span>D
          </span>
          <span style={{ color: "#5e625c" }}>{site.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>
            Frontend
          </span>
          <span style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>
            Engineer
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5e625c" }}>
          <span>{site.name}</span>
          <span style={{ color: "#2233f0" }}>React · Next.js · TypeScript</span>
        </div>
      </div>
    ),
    size,
  );
}

export const dynamic = "force-static";
