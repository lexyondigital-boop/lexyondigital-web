"use client";

import { useEffect, useRef, useState } from "react";

type Capitulo = {
  id: string;
  titulo: string;
  descripcion: string | null;
  youtube_url: string;
};

type Modulo = {
  id: string;
  titulo: string;
  capitulos: Capitulo[];
};

type ItemLista = {
  capitulo: Capitulo;
  moduloTitulo: string;
  numeroEnModulo: number;
  videoId: string;
};

type YTPlayer = {
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, options: Record<string, unknown>) => YTPlayer;
      PlayerState: { ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Acepta watch?v=, youtu.be/ y /embed/, igual que en el admin -- duplicado
// a propósito para no crear una dependencia circular con lib/youtube.ts
// (ese archivo es "use server"-adjacent, se usa dentro de Server Actions).
function extraerIdYoutube(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const match = u.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/);
      if (match) return match[1];
    }
    return null;
  } catch {
    return null;
  }
}

export function ReproductorTaller({ modulos }: { modulos: Modulo[] }) {
  const lista: ItemLista[] = modulos.flatMap((m) =>
    m.capitulos
      .map((c, i) => ({ capitulo: c, moduloTitulo: m.titulo, numeroEnModulo: i + 1, videoId: extraerIdYoutube(c.youtube_url) }))
      .filter((it): it is ItemLista => it.videoId !== null),
  );

  const [indice, setIndice] = useState(0);
  const [apiListo, setApiListo] = useState(() => typeof window !== "undefined" && !!window.YT?.Player);
  const playerRef = useRef<YTPlayer | null>(null);

  const actual = lista[indice] as ItemLista | undefined;

  // Carga el script de la IFrame API de YouTube una sola vez.
  useEffect(() => {
    if (apiListo) return;
    const scriptId = "youtube-iframe-api";
    if (!document.getElementById(scriptId)) {
      const tag = document.createElement("script");
      tag.id = scriptId;
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => setApiListo(true);
  }, [apiListo]);

  // Crea el player una vez listo; en índices siguientes solo cambia el
  // video del mismo player (loadVideoById reproduce automáticamente).
  useEffect(() => {
    if (!apiListo || !actual || !window.YT) return;
    if (!playerRef.current) {
      playerRef.current = new window.YT.Player("reproductor-taller-yt", {
        videoId: actual.videoId,
        playerVars: { rel: 0 },
        events: {
          onStateChange: (e: { data: number }) => {
            if (window.YT && e.data === window.YT.PlayerState.ENDED) {
              setIndice((i) => (i + 1 < lista.length ? i + 1 : i));
            }
          },
        },
      });
    } else {
      playerRef.current.loadVideoById(actual.videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiListo, indice]);

  useEffect(
    () => () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    },
    [],
  );

  if (lista.length === 0) {
    return <p className="mt-10 text-[var(--color-texto-mute)]">Este taller aún no tiene capítulos publicados.</p>;
  }

  function ir(i: number) {
    setIndice(Math.max(0, Math.min(lista.length - 1, i)));
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--color-borde)] bg-black">
          <div id="reproductor-taller-yt" className="h-full w-full" />

          {indice > 0 && (
            <button
              type="button"
              onClick={() => ir(indice - 1)}
              aria-label="Capítulo anterior"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white hover:bg-black/80"
            >
              ‹
            </button>
          )}
          {indice < lista.length - 1 && (
            <button
              type="button"
              onClick={() => ir(indice + 1)}
              aria-label="Siguiente capítulo"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white hover:bg-black/80"
            >
              ›
            </button>
          )}
        </div>

        {actual && (
          <>
            <h2 className="mt-4 text-lg font-semibold text-[var(--color-texto)]">
              {actual.moduloTitulo} — {actual.numeroEnModulo}. {actual.capitulo.titulo}
            </h2>
            {actual.capitulo.descripcion && (
              <p className="mt-1 text-sm text-[var(--color-texto-mute)]">{actual.capitulo.descripcion}</p>
            )}
          </>
        )}
      </div>

      <nav className="space-y-4 lg:max-h-[32rem] lg:overflow-y-auto">
        {modulos.map((m) => (
          <div key={m.id}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-texto-mute)]">{m.titulo}</p>
            <div className="space-y-1">
              {m.capitulos.map((c, i) => {
                const idxGlobal = lista.findIndex((it) => it.capitulo.id === c.id);
                if (idxGlobal === -1) return null;
                const activo = idxGlobal === indice;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => ir(idxGlobal)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activo
                        ? "bg-[var(--color-marca)]/15 font-medium text-[var(--color-marca)]"
                        : "text-[var(--color-texto)] hover:bg-[var(--color-tarjeta)]"
                    }`}
                  >
                    {i + 1}. {c.titulo}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
