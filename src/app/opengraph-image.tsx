import { ImageResponse } from "next/og";
import { business } from "@/lib/site";

export const alt = "BrightWay Technical Solutions - Electrical and plumbing services in Mannarkkad, Kerala.";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Use fetch with import.meta.url so Vercel can trace and bundle the local font file
  const fontData = await fetch(
    new URL("./Ronzino-Bold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #000000, #111111)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "white",
          fontFamily: "Ronzino",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#047857", // The project's brand color (green)
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span style={{ fontSize: "48px", color: "#047857" }}>{business.shortName}</span>
          </div>
          
          <h1
            style={{
              fontSize: "84px",
              lineHeight: 1.1,
              marginTop: "40px",
              maxWidth: "900px",
              letterSpacing: "-0.02em",
            }}
          >
            Premium Electrical &<br />Plumbing Solutions
          </h1>
          
          <p
            style={{
              fontSize: "36px",
              color: "#a0aabf",
              marginTop: "20px",
              maxWidth: "800px",
              fontFamily: "sans-serif", // Geist fallback since we only loaded Ronzino
            }}
          >
            {business.tagline}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "16px", fontSize: "32px" }}>
            <span style={{ color: "#047857" }}>Call Us:</span>
            <span>{business.phone.display}</span>
          </div>
          <div style={{ fontSize: "32px", color: "#a0aabf" }}>
            brightwaytech.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Ronzino",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
