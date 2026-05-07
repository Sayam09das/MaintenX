import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at top left, rgba(224,177,93,0.35), transparent 28%), linear-gradient(135deg, #131B28 0%, #0A1018 100%)",
          color: "#F5F7FA",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "32px",
            padding: "42px",
            background: "rgba(17, 25, 38, 0.72)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "26px",
                color: "#E0B15D",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(224,177,93,0.35), rgba(77,208,225,0.28))",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
              <span>MaintenX AI</span>
            </div>
            <div style={{ fontSize: "70px", lineHeight: 1.05, fontWeight: 700, maxWidth: "820px" }}>
              Predict equipment risk before downtime becomes expensive.
            </div>
            <div style={{ fontSize: "28px", lineHeight: 1.45, color: "#A7B1C2", maxWidth: "900px" }}>
              Failure prediction, explainability, and AI maintenance guidance in one operator-ready dashboard.
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", fontSize: "22px", color: "#A7B1C2" }}>
            <span>Realtime risk signal</span>
            <span>•</span>
            <span>AI assistant</span>
            <span>•</span>
            <span>Explainability</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
