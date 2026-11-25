// Acepta watch?v=, youtu.be/ y /embed/ -- las tres formas que YouTube da al
// copiar un link, incluyendo cuando trae &list=... de un playlist (se ignora,
// solo nos importa el video individual).
export function extraerIdYoutube(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1).split("/")[0] || null;
    }
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

// Miniatura que YouTube publica para todo video (hqdefault siempre existe;
// maxresdefault no en videos viejos o de baja resolución).
export function miniaturaYoutube(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

// Reproductor sin cookies de seguimiento hasta que la persona le da play.
export function embedYoutube(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}

// Video de portada de un post: lo que se escribió en el formulario →
// enlace normalizado, null si se dejó vacío, o error si no es de YouTube.
export function leerVideoPortada(valor: FormDataEntryValue | null): { video_url: string | null } | { error: string } {
  const texto = String(valor ?? "").trim();
  if (!texto) return { video_url: null };
  const id = extraerIdYoutube(texto);
  if (!id || !/^[\w-]{6,20}$/.test(id)) return { error: "El enlace del video no es de YouTube. Copia el enlace desde el botón Compartir del video." };
  return { video_url: `https://www.youtube.com/watch?v=${id}` };
}
