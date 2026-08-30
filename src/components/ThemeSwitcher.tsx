"use client";

import { useEffect, useRef, useState } from "react";
import { useTema, type Tema } from "@/context/ThemeContext";

const OPCIONES: { value: Tema; label: string; swatch: string }[] = [
  { value: "negro", label: "Negro", swatch: "#000000" },
  { value: "tornasol-oscuro", label: "Ciruela tornasol", swatch: "#1c1123" },
  { value: "tornasol-claro", label: "Blanco tornasol", swatch: "#f7f3f9" },
];

export function ThemeSwitcher() {
  const { tema, setTema } = useTema();
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickFuera(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false);
    }
    document.addEventListener("mousedown", onClickFuera);
    return () => document.removeEventListener("mousedown", onClickFuera);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label="Cambiar tema"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-borde)] bg-[var(--color-tarjeta)] text-[var(--color-texto)] transition-colors hover:border-[var(--color-borde-alto)]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2.5v2.4M12 19.1v2.4M21.5 12h-2.4M4.9 12H2.5M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7M18.4 18.4l-1.7-1.7M7.3 7.3 5.6 5.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {abierto && (
        <div className="absolute right-0 z-30 mt-2 w-56 rounded-xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-1.5 shadow-lg">
          {OPCIONES.map((op) => (
            <button
              key={op.value}
              type="button"
              onClick={() => {
                setTema(op.value);
                setAbierto(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-[var(--color-texto)] hover:bg-[var(--color-bg-elevada)]"
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-[var(--color-borde)]"
                style={{ background: op.swatch }}
              />
              {op.label}
              {tema === op.value && <span className="ml-auto text-[var(--color-marca)]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
