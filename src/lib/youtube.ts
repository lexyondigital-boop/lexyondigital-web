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
