import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, SCRIPT_TEMA_INICIAL } from "@/context/ThemeContext";
import { DESCRIPCION_INICIO, NOMBRE_SITIO, TITULO_INICIO, URL_SITIO } from "@/lib/sitio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Valores base que heredan todas las páginas. Cada página pública define
// además su propio canonical (alternates) -- a propósito NO va aquí: un
// canonical en el layout raíz se heredaría y apuntaría todo el sitio a "/".
// La imagen de Open Graph/Twitter sale de opengraph-image.tsx y
// twitter-image.tsx (Next agrega las etiquetas solo, sin duplicarlas).
export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: TITULO_INICIO,
  description: DESCRIPCION_INICIO,
  applicationName: NOMBRE_SITIO,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: NOMBRE_SITIO,
    title: TITULO_INICIO,
    description: DESCRIPCION_INICIO,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO_INICIO,
    description: DESCRIPCION_INICIO,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA_INICIAL }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
