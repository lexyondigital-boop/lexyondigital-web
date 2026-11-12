import Link from "next/link";
import type { ReactNode } from "react";

// Formato ligero para el contenido de los artículos del blog. Se escribe
// como texto en /admin y aquí se convierte en elementos de React (nunca en
// HTML crudo, así que no hay forma de inyectar etiquetas):
//   ## Subtítulo        ### Subtítulo menor
//   - elemento          1. elemento numerado
//   > cita              **negritas**  *cursivas*  [texto](/ruta o https://...)
// Un artículo escrito en texto plano se sigue viendo igual: cada bloque
// separado por una línea en blanco es un párrafo.

type Bloque =
  | { tipo: "h2" | "h3" | "p" | "cita"; texto: string }
  | { tipo: "ul" | "ol"; items: string[] };

export function separarBloques(contenido: string): Bloque[] {
  const lineas = contenido.replace(/\r\n?/g, "\n").split("\n");
  const bloques: Bloque[] = [];
  let parrafo: string[] = [];
  const cerrarParrafo = () => {
    if (parrafo.length) bloques.push({ tipo: "p", texto: parrafo.join("\n") });
    parrafo = [];
  };

  for (const cruda of lineas) {
    const linea = cruda.trimEnd();
    const h = /^(#{2,3})\s+(.+)$/.exec(linea);
    const ul = /^\s*[-*•]\s+(.+)$/.exec(linea);
    const ol = /^\s*\d+[.)]\s+(.+)$/.exec(linea);
    const cita = /^>\s?(.*)$/.exec(linea);
    if (!linea.trim()) {
      cerrarParrafo();
    } else if (h) {
      cerrarParrafo();
      bloques.push({ tipo: h[1].length === 2 ? "h2" : "h3", texto: h[2] });
    } else if (cita) {
      cerrarParrafo();
      const ultimo = bloques[bloques.length - 1];
      if (ultimo && ultimo.tipo === "cita") ultimo.texto += `\n${cita[1]}`;
      else bloques.push({ tipo: "cita", texto: cita[1] });
    } else if (ul || ol) {
      cerrarParrafo();
      const tipo = ul ? "ul" : "ol";
      const texto = (ul ?? ol)![1];
      const ultimo = bloques[bloques.length - 1];
      if (ultimo && ultimo.tipo === tipo) ultimo.items.push(texto);
      else bloques.push({ tipo, items: [texto] });
    } else {
      parrafo.push(linea);
    }
  }
  cerrarParrafo();
  return bloques;
}

// Enlaces: solo rutas internas (/...) o https://. Cualquier otra cosa
// (javascript:, data:...) se muestra como texto.
function hrefSeguro(href: string): string | null {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (/^https:\/\//i.test(href)) return href;
  return null;
}

const PATRON_EN_LINEA = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export function enLinea(texto: string): ReactNode[] {
  const partes: ReactNode[] = [];
  let ultimo = 0;
  let n = 0;
  for (const m of texto.matchAll(PATRON_EN_LINEA)) {
    const i = m.index ?? 0;
    if (i > ultimo) partes.push(texto.slice(ultimo, i));
    const k = `f${n++}`;
    if (m[1] !== undefined) {
      const href = hrefSeguro(m[2]);
      if (!href) partes.push(m[1]);
      else if (href.startsWith("/"))
        partes.push(
          <Link key={k} href={href} className="text-[var(--color-marca)] underline">
            {m[1]}
          </Link>,
        );
      else
        partes.push(
          <a key={k} href={href} target="_blank" rel="noreferrer" className="text-[var(--color-marca)] underline">
            {m[1]}
          </a>,
        );
    } else if (m[3] !== undefined) {
      partes.push(
        <strong key={k} className="font-semibold">
          {m[3]}
        </strong>,
      );
    } else if (m[4] !== undefined) {
      partes.push(<em key={k}>{m[4]}</em>);
    }
    ultimo = i + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

export function ContenidoArticulo({ contenido }: { contenido: string }) {
  return (
    <div className="space-y-5 text-[17px] leading-relaxed text-[var(--color-texto)]">
      {separarBloques(contenido).map((b, i) => {
        if (b.tipo === "h2")
          return (
            <h2 key={i} className="pt-4 text-2xl font-bold">
              {enLinea(b.texto)}
            </h2>
          );
        if (b.tipo === "h3")
          return (
            <h3 key={i} className="pt-2 text-xl font-semibold">
              {enLinea(b.texto)}
            </h3>
          );
        if ("items" in b) {
          const Lista = b.tipo;
          return (
            <Lista key={i} className={`space-y-2 pl-6 ${b.tipo === "ul" ? "list-disc" : "list-decimal"}`}>
              {b.items.map((it, j) => (
                <li key={j}>{enLinea(it)}</li>
              ))}
            </Lista>
          );
        }
        if (b.tipo === "cita")
          return (
            <blockquote
              key={i}
              className="whitespace-pre-line rounded-r-xl border-l-4 border-[var(--color-marca)] bg-[var(--color-tarjeta)] px-4 py-3 text-[var(--color-texto-mute)]"
            >
              {enLinea(b.texto)}
            </blockquote>
          );
        return (
          <p key={i} className="whitespace-pre-line">
            {enLinea(b.texto)}
          </p>
        );
      })}
    </div>
  );
}
