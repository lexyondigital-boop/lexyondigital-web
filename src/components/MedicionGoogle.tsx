"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  EVENTO_ABRIR_PREFERENCIAS,
  ID_GA4,
  ID_GOOGLE_ADS,
  MEDICION_ACTIVA,
  evento,
  eventoDeEnlace,
  guardarConsentimiento,
  leerConsentimiento,
  scriptInicialGoogle,
} from "@/lib/medicion";

// Etiqueta de Google (GA4 + Ads) con Consent Mode v2, banner de cookies y
// eventos de clic (WhatsApp, Probar gratis, Ver precios, teléfono, correo).
// Si no hay IDs configurados no renderiza nada.
export function MedicionGoogle() {
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    if (!MEDICION_ACTIVA) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la elección vive en el navegador
    setBanner(leerConsentimiento() === null);
    const abrir = () => setBanner(true);
    window.addEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir);
    // Un solo escuchador para todos los enlaces del sitio: no hay que
    // marcar cada botón a mano.
    const alClic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const ev = eventoDeEnlace(a.getAttribute("href") ?? "");
      if (ev) evento(ev.nombre, { destino: ev.destino, pagina: window.location.pathname, texto: (a.textContent ?? "").trim().slice(0, 80) });
    };
    document.addEventListener("click", alClic, { capture: true });
    return () => {
      window.removeEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir);
      document.removeEventListener("click", alClic, { capture: true });
    };
  }, []);

  if (!MEDICION_ACTIVA) return null;

  const elegir = (estado: "aceptado" | "rechazado") => {
    guardarConsentimiento(estado);
    setBanner(false);
  };

  return (
    <>
      <Script id="google-consent-config" strategy="afterInteractive">
        {scriptInicialGoogle()}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID_GA4 || ID_GOOGLE_ADS}`} strategy="afterInteractive" />
      {banner && (
        <div
          role="dialog"
          aria-label="Preferencias de cookies"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-4 shadow-xl sm:p-5"
        >
          <p className="text-sm text-[var(--color-texto)]">
            Usamos cookies de Google Analytics y Google Ads para saber cómo llegas a nuestro sitio y mejorar nuestros anuncios. Solo se activan si las
            aceptas. <Link href="/cookies" className="underline">Más información</Link>
          </p>
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => elegir("rechazado")}
              className="rounded-lg border border-[var(--color-borde)] px-4 py-2 text-sm font-medium text-[var(--color-texto)] hover:bg-[var(--color-bg-elevada)]"
            >
              Rechazar
            </button>
            <button type="button" onClick={() => elegir("aceptado")} className="rounded-lg bg-[var(--color-accion)] px-4 py-2 text-sm font-semibold text-[var(--color-accion-fg)]">
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Enlace para volver a abrir el banner (pie de página y Política de Cookies).
export function BotonPreferenciasCookies({ className }: { className?: string }) {
  if (!MEDICION_ACTIVA) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_PREFERENCIAS))} className={className}>
      Preferencias de cookies
    </button>
  );
}
