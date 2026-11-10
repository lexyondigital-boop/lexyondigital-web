"use client";

import { useEffect, useState } from "react";

// Cambia de palabra cada pocos segundos con un desvanecido desenfocado.
// La primera palabra es la que lee Google (va en el HTML del servidor).
export function PalabraRotativa({ palabras, cadaMs = 2600 }: { palabras: string[]; cadaMs?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % palabras.length), cadaMs);
    return () => clearInterval(id);
  }, [palabras.length, cadaMs]);

  return (
    <span className="relative inline-grid">
      {palabras.map((p, n) => (
        <span
          key={p}
          aria-hidden={n !== i}
          className={`palabra-rotativa col-start-1 row-start-1 ${n === i ? "palabra-activa" : ""}`}
          style={{
            backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899 55%, #ffb020)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {p}
        </span>
      ))}
    </span>
  );
}
