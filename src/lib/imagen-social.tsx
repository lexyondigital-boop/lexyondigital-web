import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { TAMANO_IMAGEN_SOCIAL } from "@/lib/imagen-social-datos";

// Imagen para compartir (Open Graph y Twitter/X), 1200x630. Se genera en el
// build a partir del logo oficial, así no hay que mantener un PNG aparte y
// cambia sola si se actualiza el logo.
export { ALT_IMAGEN_SOCIAL, TAMANO_IMAGEN_SOCIAL } from "@/lib/imagen-social-datos";

export async function imagenSocial() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          background: "linear-gradient(135deg, #0f0a1f 0%, #1e1240 55%, #2a0f2e 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={120} height={120} alt="" style={{ borderRadius: 26 }} />
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>
            <span>Lexyon</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899, #ffb020, #35d6c4)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Digital
            </span>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 46, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
          Agente de IA que atiende WhatsApp 24/7, CRM y agenda de citas
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#c9c2e0" }}>
          Marketing digital · Asesoría legal · Contabilidad
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 26, color: "#35d6c4" }}>www.lexyondigital.com.mx</div>
      </div>
    ),
    TAMANO_IMAGEN_SOCIAL,
  );
}
