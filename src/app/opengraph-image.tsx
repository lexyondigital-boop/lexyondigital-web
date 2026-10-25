import { ALT_IMAGEN_SOCIAL, TAMANO_IMAGEN_SOCIAL, imagenSocial } from "@/lib/imagen-social";

// Aplica a todo el sitio (y a cada página que no defina su propia imagen,
// como un post del blog con portada).
export const alt = ALT_IMAGEN_SOCIAL;
export const size = TAMANO_IMAGEN_SOCIAL;
export const contentType = "image/png";

export default function Imagen() {
  return imagenSocial();
}
