import type { Metadata } from "next";
import Link from "next/link";
import { metadataPagina } from "@/lib/metadata-pagina";
import { SERVICIOS } from "@/lib/servicios";
import {
  CORREO_CONTACTO,
  REDES_SOCIALES,
  TELEFONO_E164,
  TELEFONO_VISIBLE,
  URL_RESENA_GOOGLE,
  URL_WHATSAPP,
} from "@/lib/sitio";

export const metadata: Metadata = metadataPagina({
  titulo: "Contacto | LexyonDigital",
  descripcion:
    "Escríbenos por WhatsApp, llámanos o mándanos un correo. LexyonDigital atiende desde Mérida, Yucatán, y en línea a negocios de todo México.",
  ruta: "/contacto",
});

const TARJETA =
  "block rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-5 transition-colors hover:border-[var(--color-marca)]";

const NOMBRE_RED = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube" };

export default function ContactoPage() {
  const whatsapp = `${URL_WHATSAPP}?text=${encodeURIComponent("Hola, quiero información de LexyonDigital.")}`;
  return (
    <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-3xl font-bold text-[var(--color-texto)] sm:text-5xl">Contacto</h1>
      <p className="mt-4 max-w-2xl text-base text-[var(--color-texto-mute)] sm:text-lg">
        Cuéntanos qué necesita tu negocio y te respondemos lo antes posible. Atendemos desde Mérida, Yucatán, y en línea a
        negocios de todo México.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <a href={whatsapp} target="_blank" rel="noreferrer" className={TARJETA}>
          <p className="text-sm text-[var(--color-texto-mute)]">WhatsApp</p>
          <p className="mt-1 font-semibold text-[var(--color-texto)]">Escríbenos ahora</p>
          <p className="mt-1 text-sm text-[var(--color-texto-mute)]">{TELEFONO_VISIBLE}</p>
        </a>
        <a href={`tel:${TELEFONO_E164}`} className={TARJETA}>
          <p className="text-sm text-[var(--color-texto-mute)]">Teléfono</p>
          <p className="mt-1 font-semibold text-[var(--color-texto)]">{TELEFONO_VISIBLE}</p>
        </a>
        <a href={`mailto:${CORREO_CONTACTO}`} className={TARJETA}>
          <p className="text-sm text-[var(--color-texto-mute)]">Correo</p>
          <p className="mt-1 break-all font-semibold text-[var(--color-texto)]">{CORREO_CONTACTO}</p>
        </a>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-texto)]">¿En qué te podemos ayudar?</h2>
          <ul className="mt-4 space-y-2">
            {SERVICIOS.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="text-[var(--color-marca)] hover:underline">
                  {s.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--color-texto)]">Síguenos</h2>
          <ul className="mt-4 space-y-2">
            {REDES_SOCIALES.filter((r) => r.url).map((r) => (
              <li key={r.red}>
                <a href={r.url as string} target="_blank" rel="noreferrer me" className="text-[var(--color-marca)] hover:underline">
                  {NOMBRE_RED[r.red]}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={URL_RESENA_GOOGLE}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-borde)] px-4 py-2 text-sm font-medium text-[var(--color-texto)] hover:border-[var(--color-marca)]"
          >
            <span aria-hidden="true">⭐</span> Déjanos tu reseña en Google
          </a>
        </div>
      </div>
    </section>
  );
}
