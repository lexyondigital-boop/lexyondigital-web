import Link from "next/link";
import { Logo } from "@/components/Logo";
import { TELEFONO_E164, TELEFONO_VISIBLE, URL_WHATSAPP } from "@/lib/sitio";

const REDES = [
  { label: "Facebook", href: "https://facebook.com", color: "#1877f2", icon: "f" },
  { label: "Instagram", href: "https://instagram.com", color: "#e1306c", icon: "ig" },
  { label: "WhatsApp", href: URL_WHATSAPP, color: "#25d366", icon: "wa" },
  { label: "TikTok", href: "https://tiktok.com", color: "#000000", icon: "tt" },
  { label: "YouTube", href: "https://youtube.com", color: "#ff0000", icon: "yt" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-borde)] bg-[var(--color-bg-elevada)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <Logo tamaño="sm" />
          <p className="mt-3 max-w-xs text-sm text-[var(--color-texto-mute)]">
            Marketing digital, respaldo legal y contable, y automatización con inteligencia artificial —
            todo lo que un negocio necesita para crecer, en un solo lugar.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-texto)]">Contacto</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-texto-mute)]">
            <li>info@lexyondigital.com</li>
            <li>
              <a href={`tel:${TELEFONO_E164}`} className="hover:text-[var(--color-texto)]">
                {TELEFONO_VISIBLE}
              </a>
            </li>
            <li>www.lexyondigital.com.mx</li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold text-[var(--color-texto)]">Síguenos</h3>
          <div className="mt-3 flex gap-2.5">
            {REDES.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                aria-label={r.label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: r.color }}
              >
                {r.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-texto)]">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-texto-mute)]">
            <li>
              <Link href="/privacidad" className="underline hover:text-[var(--color-texto)]">
                Aviso de Privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="underline hover:text-[var(--color-texto)]">
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="underline hover:text-[var(--color-texto)]">
                Política de Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-borde)] px-5 py-4 text-center text-xs text-[var(--color-texto-mute)] sm:px-8">
        © {new Date().getFullYear()} LexyonDigital. Todos los derechos reservados.
      </div>
    </footer>
  );
}
