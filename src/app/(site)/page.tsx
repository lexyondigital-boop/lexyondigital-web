import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ServiciosGrid } from "@/components/ServiciosGrid";
import { InformacionInicio } from "@/components/InformacionInicio";
import { metadataPagina } from "@/lib/metadata-pagina";
import { DESCRIPCION_INICIO, TITULO_INICIO } from "@/lib/sitio";
import { datosEstructuradosInicio } from "@/lib/datos-estructurados";

export const metadata: Metadata = metadataPagina({ titulo: TITULO_INICIO, descripcion: DESCRIPCION_INICIO, ruta: "/" });

export default function Inicio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructuradosInicio()).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ServiciosGrid />
      <InformacionInicio />
    </>
  );
}
