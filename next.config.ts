import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Necesario para el build de Docker: genera server.js + solo las
  // dependencias que realmente se usan, en vez de copiar node_modules entero.
  output: "standalone",
  images: {
    remotePatterns: [
      // Portadas de talleres/blog subidas al bucket biblioteca-media.
      { protocol: "https", hostname: "rgradziyywjhvvsfzamm.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Miniatura automática de los módulos con video de YouTube.
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  // Sin Content-Security-Policy a propósito: Turnstile carga su script desde
  // challenges.cloudflare.com y una CSP mal ajustada lo rompe en silencio.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
