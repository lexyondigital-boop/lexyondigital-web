import type { Metadata } from "next";
import { Proximamente } from "@/components/Proximamente";

// "Próximamente": fuera del índice (y del sitemap) hasta que tenga contenido
// real -- una página vacía indexada resta calidad al sitio completo.
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function AcercaDePage() {
  return <Proximamente titulo="Acerca de nosotros" />;
}
