"use client";

import { useEffect, useState } from "react";

// Teléfono con una conversación de WhatsApp que se escribe sola: el cliente
// pregunta, el agente de IA responde y agenda. Se repite en bucle.
type Mensaje = { de: "cliente" | "agente"; texto: string };

const CONVERSACION: Mensaje[] = [
  { de: "cliente", texto: "Hola, ¿tienen citas para mañana?" },
  { de: "agente", texto: "¡Hola! 👋 Sí, mañana tengo libre a las 10:00, 12:30 y 17:00. ¿Cuál te acomoda?" },
  { de: "cliente", texto: "A las 12:30 porfa" },
  { de: "agente", texto: "Listo ✅ Te agendé mañana a las 12:30. Te mando un recordatorio una hora antes." },
];

const PASO_MS = 1700;

export function ChatAnimado() {
  // paso = cuántos mensajes se ven; los impares muestran "escribiendo…" antes
  // de la respuesta del agente.
  const [paso, setPaso] = useState(CONVERSACION.length * 2);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Arranca mostrando la conversación completa y en el siguiente paso reinicia.
    let n = CONVERSACION.length * 2 + 2;
    const id = setInterval(() => {
      n = n >= CONVERSACION.length * 2 + 2 ? 0 : n + 1;
      setPaso(n);
    }, PASO_MS);
    return () => clearInterval(id);
  }, []);

  const visibles = CONVERSACION.filter((_, i) => paso >= i * 2 + 1);
  const siguiente = CONVERSACION[visibles.length];
  const escribiendo = siguiente?.de === "agente" && paso === visibles.length * 2;

  return (
    <div className="relative mx-auto w-[300px] text-left sm:w-[330px]">
      <div className="rounded-[2.6rem] border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.03] p-2.5 shadow-[0_30px_80px_-20px_rgba(168,85,247,0.55)] backdrop-blur">
        <div className="overflow-hidden rounded-[2.1rem] bg-[#0f0b14]">
          <div className="flex items-center gap-2.5 border-b border-white/10 px-4 pb-3 pt-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] text-xs font-bold text-white">
              IA
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">Tu negocio</p>
              <p className="text-[11px] text-[#c6ff3d]">en línea · responde al instante</p>
            </div>
          </div>
          <div className="flex h-[300px] flex-col justify-end gap-2 px-3 pb-4 pt-3">
            {visibles.map((m) => (
              <p
                key={m.texto}
                className={`burbuja-chat max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                  m.de === "cliente"
                    ? "self-end rounded-br-md bg-[#c6ff3d] text-[#10130a]"
                    : "self-start rounded-bl-md bg-white/10 text-white"
                }`}
              >
                {m.texto}
              </p>
            ))}
            {escribiendo && (
              <span className="burbuja-chat flex gap-1 self-start rounded-2xl rounded-bl-md bg-white/10 px-3 py-3" aria-hidden="true">
                <i className="punto-escribiendo" />
                <i className="punto-escribiendo [animation-delay:150ms]" />
                <i className="punto-escribiendo [animation-delay:300ms]" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
