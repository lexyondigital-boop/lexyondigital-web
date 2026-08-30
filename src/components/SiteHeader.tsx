"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const ENLACES = [
  { href: "/", label: "Inicio" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/tienda", label: "Tienda" },
  { href: "/calculadora-ads", label: "Calculadora Ads" },
  { href: "/acerca-de", label: "Acerca de" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-borde)] bg-[var(--color-bg)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" onClick={() => setMenuAbierto(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="text-sm font-medium transition-colors"
              style={{ color: pathname === e.href ? "var(--color-marca)" : "var(--color-texto-mute)" }}
            >
              {e.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/tienda"
            aria-label="Carrito"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--color-borde)] text-[var(--color-texto)] transition-colors hover:border-[var(--color-borde-alto)] sm:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 4h2l1.6 10.6a2 2 0 0 0 2 1.7h8a2 2 0 0 0 2-1.6L20 8H6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
              <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
            </svg>
          </Link>

          <ThemeSwitcher />

          <a
            href="https://app.lexyondigital.com.mx"
            className="hidden shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 md:inline-block"
            style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)", boxShadow: "var(--halo-accion)" }}
          >
            Ir a la plataforma
          </a>

          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-label="Abrir menú"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-borde)] text-[var(--color-texto)] md:hidden"
          >
            <span className="text-lg leading-none">{menuAbierto ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-borde)] px-5 py-3 md:hidden">
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              onClick={() => setMenuAbierto(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{
                color: pathname === e.href ? "var(--color-marca)" : "var(--color-texto)",
                background: pathname === e.href ? "var(--color-bg-elevada)" : "transparent",
              }}
            >
              {e.label}
            </Link>
          ))}
          <a
            href="https://app.lexyondigital.com.mx"
            className="mt-2 rounded-lg px-4 py-2.5 text-center text-sm font-semibold"
            style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
          >
            Ir a la plataforma
          </a>
        </nav>
      )}
    </header>
  );
}
