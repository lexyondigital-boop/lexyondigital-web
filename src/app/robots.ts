import type { MetadataRoute } from "next";
import { URL_SITIO } from "@/lib/sitio";

// Todo el sitio público es rastreable; solo /admin (panel interno, con
// login) queda fuera. /admin además manda X-Robots-Tag: noindex (ver
// next.config.ts), porque robots.txt solo evita el rastreo, no que una URL
// enlazada desde otro lado aparezca en Google.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin"] }],
    sitemap: `${URL_SITIO}/sitemap.xml`,
    host: URL_SITIO,
  };
}
