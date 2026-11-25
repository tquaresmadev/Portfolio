/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Tiago Quaresma, full-stack developer based in Portugal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dataUrl = (file: Buffer, type: string) => `data:${type};base64,${file.toString("base64")}`;

const ink = "#121212";
const muted = "#5d5d59";

export default async function Image() {
  const [display, regular, semibold, photoFile, cvJuicerFile] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/bricolage-grotesque-800.ttf")),
    readFile(join(process.cwd(), "public/fonts/inter-400.ttf")),
    readFile(join(process.cwd(), "public/fonts/inter-600.ttf")),
    readFile(join(process.cwd(), "public/profile.jpg")),
    readFile(join(process.cwd(), "public/projects/cv-juicer-app.jpg")),
  ]);
  const [photo, cvJuicer] = [dataUrl(photoFile, "image/jpeg"), dataUrl(cvJuicerFile, "image/jpeg")];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 40, background: "#efefec", fontFamily: "Inter" }}>
        <div
          style={{
            width: 700,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "44px 48px",
            background: "#ffffff",
            border: "1px solid #e2e2de",
            borderRadius: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                padding: "9px 18px 9px 14px",
                borderRadius: 999,
                background: "#f2f2ef",
                fontSize: 21,
                fontWeight: 600,
                color: ink,
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  marginRight: 11,
                  borderRadius: 999,
                  background: "#22a05a",
                  boxShadow: "0 0 0 4px rgba(34, 160, 90, 0.18)",
                }}
              />
              Available for new projects
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 30,
                fontFamily: "Bricolage Grotesque",
                fontWeight: 800,
                fontSize: 60,
                lineHeight: 1.03,
                letterSpacing: -1.8,
              }}
            >
              <span style={{ color: ink }}>Hi, I&apos;m Tiago.</span>
              <span style={{ color: muted }}>Full-stack developer based in Portugal.</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                fontFamily: "Bricolage Grotesque",
                fontWeight: 800,
                fontSize: 36,
                letterSpacing: -1.2,
                color: ink,
              }}
            >
              TQ
              <div style={{ width: 11, height: 11, marginLeft: 3, marginBottom: 8, borderRadius: 2, background: "#4f46e5" }} />
            </div>
            <div style={{ display: "flex", fontSize: 22, color: muted }}>Java · Spring · TypeScript · React</div>
          </div>
        </div>

        <div style={{ width: 404, height: "100%", display: "flex", flexDirection: "column", marginLeft: 16 }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              width: 404,
              height: 316,
              overflow: "hidden",
              borderRadius: 32,
              background: "#c9ced6",
            }}
          >
            <img src={photo} width={404} height={404} alt="" style={{ position: "absolute", top: -36, left: 0 }} />
            <div
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                display: "flex",
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.9)",
                fontSize: 20,
                fontWeight: 600,
                color: ink,
              }}
            >
              Tiago Quaresma
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: 218,
              marginTop: 16,
              padding: "22px 24px 0",
              overflow: "hidden",
              borderRadius: 32,
              background: "#ffefe5",
              border: "1px solid #ffd9c2",
            }}
          >
            <div style={{ display: "flex", flexShrink: 0, fontSize: 15, fontWeight: 600, letterSpacing: 0.6, color: "#c23a00" }}>
              CURRENT PROJECT
            </div>
            <div
              style={{
                display: "flex",
                flexShrink: 0,
                marginTop: 4,
                fontFamily: "Bricolage Grotesque",
                fontWeight: 800,
                fontSize: 30,
                letterSpacing: -0.9,
                color: ink,
              }}
            >
              CV Juicer
            </div>
            <img src={cvJuicer} width={356} height={200} alt="" style={{ flexShrink: 0, marginTop: 14, borderRadius: "14px 14px 0 0" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 800, style: "normal" },
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
