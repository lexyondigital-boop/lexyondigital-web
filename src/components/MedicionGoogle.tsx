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
          aria-labelledby="aviso-privacidad-titulo"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-5xl rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)]/95 p-5 shadow-2xl backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-7"
        >
          <p id="aviso-privacidad-titulo" className="text-base font-semibold text-[var(--color-texto)]">
            Información sobre privacidad
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-texto-mute)] sm:text-[15px]">
            Utilizamos tecnologías como cookies y procesamos datos personales para brindarte nuestros servicios, entender cómo usas el sitio y
            mejorar tu experiencia.
          </p>
          <div className="mt-5 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-texto)]">
              <Link href="/privacidad" className="hover:underline">
                Aviso de Privacidad
              </Link>
              <Link href="/cookies" className="hover:underline">
                Más información
              </Link>
              <button type="button" onClick={() => elegir("rechazado")} className="text-[var(--color-texto-mute)] hover:underline">
                Rechazar
              </button>
            </div>
            <button
              type="button"
              onClick={() => elegir("aceptado")}
              className="w-full rounded-full bg-[var(--color-texto)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-bg)] transition hover:opacity-90 sm:w-1/2"
            >
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
