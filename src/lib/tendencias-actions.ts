"use server";

import { redirect } from "next/navigation";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { obtenerTendencia, etiquetaFuente } from "@/lib/tendencias";

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

type TextoBlog = { titulo: string; resumen: string | null; contenido: string };

// Redacta el post con Claude a partir de la tendencia. JSON vía prompt +
// extracción manual -- mismo patrón que ya usa la plataforma hermana en
// src/lib/tendencias.ts (recopilarTendenciasIA) para no depender de
// output_config.format sin probar ese camino primero.
async function escribirBlogConClaude(tendencia: {
  termino: string;
  fuente: string;
  descripcion: string | null;
  metrica: string | null;
}): Promise<TextoBlog | { error: string }> {
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
      model: "claude-opus-5-5",
      max_tokens: 4000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system:
        'Eres redactor del blog de LexyonDigital, una agencia mexicana de marketing digital e IA. Escribes posts cortos (400-600 palabras), directos y sin relleno, con un ángulo práctico para dueños de negocio -- nunca cátedra teórica. Respondes ÚNICAMENTE con JSON válido, sin markdown ni explicación adicional, con esta forma exacta: {"titulo": string, "resumen": string (máximo 200 caracteres, para la vista de lista), "contenido": string (texto plano, párrafos separados por doble salto de línea)}.',
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
    };
  } catch (err) {
    if (err instanceof Anthropic.APIError) return { error: `Claude respondió: ${err.message}` };
    return { error: err instanceof Error ? err.message : "Error desconocido al llamar a Claude." };
  }
}

// Portada con OpenAI (gpt-image-1) -- mismo endpoint/forma que usa la
// plataforma hermana en src/lib/imagenes.ts (generarConOpenAI), sin el
// sistema de créditos/proveedores que no aplica aquí.
async function generarImagenConOpenAI(prompt: string): Promise<{ bytes: Buffer; mime: string } | { error: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { error: "OPENAI_API_KEY no configurada en el servidor." };

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-image-1", prompt, size: "1536x1024", n: 1 }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: data?.error?.message ?? `OpenAI respondió ${res.status}` };

  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) return { error: "OpenAI no devolvió la imagen." };

  return { bytes: Buffer.from(b64, "base64"), mime: "image/png" };
}

// Genera un blog_posts (sin publicar) a partir de una tendencia: texto con
// Claude, portada con OpenAI. La vista pública es la que ya existe en
// /blog -- este flujo solo llena un borrador para revisar/editar/publicar
// desde /admin/blog/[id], igual que un post creado a mano.
export async function generarBlogDesdeTendencia(tendenciaId: string, _prevState: Resultado): Promise<Resultado> {
  const tendencia = await obtenerTendencia(tendenciaId);
  if (!tendencia) return { error: "Esa tendencia ya no existe." };

  const texto = await escribirBlogConClaude(tendencia);
  if ("error" in texto) return texto;

  // La imagen es "mejor esfuerzo": si OpenAI falla, el post se crea igual
  // sin portada -- se puede agregar una a mano después desde /admin/blog/[id].
  // No vale la pena perder un texto ya redactado por un problema de imagen.
  const imagen = await generarImagenConOpenAI(
    `Imagen de portada para un artículo de blog de marketing digital e inteligencia artificial, estilo profesional y moderno, sin texto ni letras superpuestas, sobre: ${texto.titulo}`,
  );

  const supabase = await createClient();

  let imagen_url: string | null = null;
  if (!("error" in imagen)) {
    const ruta = `blog/${crypto.randomUUID()}.png`;
    const { error: errorSubida } = await supabase.storage
      .from("biblioteca-media")
      .upload(ruta, imagen.bytes, { contentType: imagen.mime });
    if (!errorSubida) {
      const { data } = supabase.storage.from("biblioteca-media").getPublicUrl(ruta);
      imagen_url = data.publicUrl;
    }
  }

  const { data: post, error } = await supabase
    .from("blog_posts")
    .insert({
      titulo: texto.titulo,
      resumen: texto.resumen,
      contenido: texto.contenido,
      imagen_url,
      publicado: false,
      slug: slugificar(texto.titulo),
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  redirect(`/admin/blog/${post.id}`);
}
