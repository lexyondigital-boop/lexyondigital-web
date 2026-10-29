import type { Metadata } from "next";
import { RegistroForm } from "@/components/RegistroForm";
import { metadataPagina } from "@/lib/metadata-pagina";
import { PAQUETES } from "@/lib/planes";
import { BannerPrueba } from "@/components/BannerPrueba";

export const metadata: Metadata = metadataPagina({
  titulo: "Prueba gratis 14 días — LexyonDigital",
  descripcion: "Registra tu negocio y empieza a usar LexyonDigital gratis durante 14 días, sin tarjeta de crédito.",
  ruta: "/registro",
});

export default async function RegistroPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  const planInicial = PAQUETES.find((p) => p.clave === plan)?.clave ?? null;

  return (
    <section className="mx-auto max-w-md px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-8 text-center">
        <div className="mb-6">
          <BannerPrueba />
        </div>
        <h1 className="text-balance text-3xl font-bold leading-tight text-[var(--color-texto)]">Crea tu cuenta</h1>
        <p className="mt-3 text-sm text-[var(--color-texto-mute)]">
          Marketing, legal, contable y un agente de IA que atiende tu WhatsApp -- todo en un solo lugar.
        </p>
      </div>
      <RegistroForm planInicial={planInicial} />
    </section>
  );
}
