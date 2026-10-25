import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Necesario para el build de Docker: genera server.js + solo las
  // dependencias que realmente se usan, en vez de copiar node_modules entero.
  output: "standalone",
  // Las Server Actions tienen un límite de 1MB por defecto -- muy poco para
  // subir la portada de un taller/post (ver crearTaller/actualizarTaller en
  // talleres-actions.ts). Con el límite de 1MB el formulario se quedaba
  // "Guardando..." indefinidamente: la petición fallaba a nivel de
  // transporte, antes de que el código de la Server Action corriera, así
  // que el error nunca llegaba al {error} que maneja el formulario.
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
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
  // Dominio canónico: www. Traefik sirve ambos hosts (ver docker-compose.yml)
  // y sin esto Google veía cada página dos veces. 308 conserva el método y
  // la ruta, así los enlaces viejos (p. ej. las URLs de privacidad/términos
  // registradas en Meta con el dominio sin www) siguen funcionando.
  async redirects() {
    return [
      {
        source: "/:ruta*",
        has: [{ type: "host", value: "lexyondigital.com.mx" }],
        destination: "https://www.lexyondigital.com.mx/:ruta*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Panel interno: fuera de los buscadores aunque alguien lo enlace
        // (robots.txt solo frena el rastreo, no la indexación).
        source: "/admin/:ruta*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
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
