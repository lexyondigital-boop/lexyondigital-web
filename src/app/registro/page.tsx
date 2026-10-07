import type { Metadata } from "next";
import { RegistroForm } from "@/components/RegistroForm";

export const metadata: Metadata = {
  title: "Prueba gratis 14 días — LexyonDigital",
  description: "Registra tu negocio y empieza a usar LexyonDigital gratis durante 14 días, sin tarjeta de crédito.",
};

export default function RegistroPage() {
  return (
    <section className="mx-auto max-w-md px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-8 text-center">
        <span className="mb-3 inline-block rounded-full border border-[var(--color-borde)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-texto-mute)]">
          Prueba gratis · 14 días
        </span>
        <h1 className="text-balance text-3xl font-bold leading-tight text-[var(--color-texto)]">Crea tu cuenta</h1>
        <p className="mt-3 text-sm text-[var(--color-texto-mute)]">
          Marketing, legal, contable y un agente de IA que atiende tu WhatsApp -- todo en un solo lugar.
        </p>
      </div>
      <RegistroForm />
    </section>
  );
}
