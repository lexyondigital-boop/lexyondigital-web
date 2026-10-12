"use server";

import { redirect } from "next/navigation";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { obtenerTendencia, etiquetaFuente } from "@/lib/tendencias";
import { MODELOS_TEXTO, type ModeloTexto } from "@/lib/ia-opciones";

type Resultado = { error: string } | undefined;

function slugificar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type TextoBlog = { titulo: string; resumen: string | null; contenido: string; imagenPrompt: string | null };

// Redacta el post con Claude a partir de la tendencia y propone, además, un
// prompt para la portada -- no genera la imagen: eso lo pide la persona
// después desde /admin/blog/[id], una vez que revisa/edita ese prompt.
// JSON vía prompt + extracción manual -- mismo patrón que ya usa la
// plataforma hermana en src/lib/tendencias.ts (recopilarTendenciasIA) para
// no depender de output_config.format sin probar ese camino primero.
async function escribirBlogConClaude(
  tendencia: {
    termino: string;
    fuente: string;
    descripcion: string | null;
    metrica: string | null;
  },
  modelo: ModeloTexto,
): Promise<TextoBlog | { error: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { error: "ANTHROPIC_API_KEY no configurada en el servidor." };

  const client = new Anthropic({ apiKey });

  const datosTendencia = [
    `Término: ${tendencia.termino}`,
    `Fuente: ${etiquetaFuente(tendencia.fuente)}`,
    tendencia.descripcion ? `Por qué importa: ${tendencia.descripcion}` : null,
    tendencia.metrica ? `Dato: ${tendencia.metrica}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const mensaje = await client.beta.messages.create({
      model: modelo,
      max_tokens: 4000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system:
        'Eres redactor del blog de LexyonDigital, una agencia mexicana de marketing digital e IA. Escribes posts cortos (400-600 palabras), directos y sin relleno, con un ángulo práctico para dueños de negocio -- nunca cátedra teórica. Respondes ÚNICAMENTE con JSON válido, sin markdown ni explicación adicional, con esta forma exacta: {"titulo": string, "resumen": string (máximo 200 caracteres, para la vista de lista), "contenido": string (texto plano, párrafos separados por doble salto de línea), "imagen_prompt": string (en inglés, describe una imagen de portada para este artículo -- estilo profesional y moderno, sin texto ni letras superpuestas en la imagen)}.',
      messages: [
        {
          role: "user",
          content: `Escribe un post de blog corto basado en esta tendencia del sector:\n\n${datosTendencia}\n\nEscribe para dueños de negocio en México, tono cercano y práctico. Cierra con una idea accionable, no con una venta directa.`,
        },
      ],
    });

    const bloqueTexto = mensaje.content.find((b) => b.type === "text");
    if (!bloqueTexto || bloqueTexto.type !== "text") return { error: "Claude no devolvió texto." };

    const desde = bloqueTexto.text.indexOf("{");
    const hasta = bloqueTexto.text.lastIndexOf("}");
    if (desde < 0 || hasta <= desde) return { error: "No se pudo extraer el JSON de la respuesta de Claude." };

    const parsed = JSON.parse(bloqueTexto.text.slice(desde, hasta + 1));
    const titulo = typeof parsed.titulo === "string" ? parsed.titulo.trim() : "";
    const contenido = typeof parsed.contenido === "string" ? parsed.contenido.trim() : "";
    if (!titulo || !contenido) return { error: "La respuesta de Claude no trae título o contenido." };

    return {
      titulo: titulo.slice(0, 200),
      resumen: typeof parsed.resumen === "string" && parsed.resumen.trim() ? parsed.resumen.trim().slice(0, 280) : null,
      contenido,
      imagenPrompt: typeof parsed.imagen_prompt === "string" && parsed.imagen_prompt.trim() ? parsed.imagen_prompt.trim() : null,
    };
  } catch (err) {
    if (err instanceof Anthropic.APIError) return { error: `Claude respondió: ${err.message}` };
    return { error: err instanceof Error ? err.message : "Error desconocido al llamar a Claude." };
  }
}

// Genera un blog_posts (sin publicar, sin portada) a partir de una
// tendencia: solo el texto, con Claude, más un prompt de imagen sugerido
// para revisar. La vista pública es la que ya existe en /blog -- este
// flujo llena un borrador para revisar/editar/generar portada/publicar
// desde /admin/blog/[id], igual que un post creado a mano.
export async function generarBlogDesdeTendencia(
  tendenciaId: string,
  modeloEntrada: string,
  _prevState: Resultado,
): Promise<Resultado> {
  const tendencia = await obtenerTendencia(tendenciaId);
  if (!tendencia) return { error: "Esa tendencia ya no existe." };

  const modelo: ModeloTexto = (MODELOS_TEXTO as readonly string[]).includes(modeloEntrada)
    ? (modeloEntrada as ModeloTexto)
    : "claude-sonnet-5-5";

  const texto = await escribirBlogConClaude(tendencia, modelo);
  if ("error" in texto) return texto;

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .insert({
      titulo: texto.titulo,
      resumen: texto.resumen,
      contenido: texto.contenido,
      imagen_prompt_sugerido: texto.imagenPrompt,
      publicado: false,
      slug: slugificar(texto.titulo),
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  redirect(`/admin/blog/${post.id}`);
}
