"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CALIDADES_IMAGEN, type CalidadImagen } from "@/lib/ia-opciones";

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

async function subirImagen(
  supabase: Awaited<ReturnType<typeof createClient>>,
  archivo: File,
): Promise<{ url: string } | { error: string }> {
  const ext = archivo.name.split(".").pop() || "jpg";
  const ruta = `blog/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("biblioteca-media").upload(ruta, archivo, {
    contentType: archivo.type || "image/jpeg",
  });
  if (error) return { error: `No se pudo subir la imagen: ${error.message}` };
  const { data } = supabase.storage.from("biblioteca-media").getPublicUrl(ruta);
  return { url: data.publicUrl };
}

// Portada con OpenAI (gpt-image-1) -- mismo endpoint/forma que usa la
// plataforma hermana en src/lib/imagenes.ts (generarConOpenAI), sin el
// sistema de créditos/proveedores que no aplica aquí. "quality" es el
// dial de costo real de este flujo -- gpt-image-1 cobra por tokens de
// imagen de salida, no por imagen plana, y la diferencia entre low y high
// es de un orden de magnitud.
async function generarImagenConOpenAI(
  prompt: string,
  calidad: CalidadImagen,
): Promise<{ bytes: Buffer; mime: string } | { error: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { error: "OPENAI_API_KEY no configurada en el servidor." };

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-image-1", prompt, size: "1536x1024", quality: calidad, n: 1 }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: data?.error?.message ?? `OpenAI respondió ${res.status}` };

  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) return { error: "OpenAI no devolvió la imagen." };

  return { bytes: Buffer.from(b64, "base64"), mime: "image/png" };
}

// Genera la portada con OpenAI a partir del prompt que la persona revisó/
// editó (propuesto antes por Claude o escrito a mano) y la deja puesta en
// el post. Acción separada del guardado del post: se puede disparar sola
// desde /admin/blog/[id] sin perder cambios del formulario principal.
export async function generarImagenPost(id: string, _prevState: Resultado, formData: FormData): Promise<Resultado> {
  const prompt = String(formData.get("prompt") ?? "").trim();
  if (!prompt) return { error: "Falta describir la imagen que quieres generar." };

  const calidadEntrada = String(formData.get("calidad") ?? "");
  const calidad: CalidadImagen = (CALIDADES_IMAGEN as readonly string[]).includes(calidadEntrada)
    ? (calidadEntrada as CalidadImagen)
    : "medium";

  const imagen = await generarImagenConOpenAI(prompt, calidad);
  if ("error" in imagen) return imagen;

  const supabase = await createClient();

  const ruta = `blog/${crypto.randomUUID()}.png`;
  const { error: errorSubida } = await supabase.storage
    .from("biblioteca-media")
    .upload(ruta, imagen.bytes, { contentType: imagen.mime });
  if (errorSubida) return { error: `No se pudo subir la imagen: ${errorSubida.message}` };
  const { data } = supabase.storage.from("biblioteca-media").getPublicUrl(ruta);

  const { error } = await supabase
    .from("blog_posts")
    .update({ imagen_url: data.publicUrl, imagen_prompt_sugerido: prompt })
    .eq("id", id);
  if (error) return { error: error.message };

  redirect(`/admin/blog/${id}`);
}

// Firma (prevState, formData) a propósito -- sirve directo como action de
// useActionState. Ver la nota en talleres-actions.ts sobre por qué.

export async function crearPost(_prevState: Resultado, formData: FormData): Promise<Resultado> {
  const supabase = await createClient();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const resumen = String(formData.get("resumen") ?? "").trim() || null;
  const contenido = String(formData.get("contenido") ?? "").trim();
  const publicado = formData.get("publicado") === "on";
  const archivo = formData.get("imagen") as File | null;

  if (!titulo || !contenido) return { error: "Falta título o contenido." };

  let imagen_url: string | null = null;
  if (archivo && archivo.size > 0) {
    const subida = await subirImagen(supabase, archivo);
    if ("error" in subida) return subida;
    imagen_url = subida.url;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      titulo,
      resumen,
      contenido,
      publicado,
      imagen_url,
      slug: slugificar(titulo),
      publicado_en: publicado ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  redirect(`/admin/blog/${data.id}`);
}

export async function actualizarPost(id: string, _prevState: Resultado, formData: FormData): Promise<Resultado> {
  const supabase = await createClient();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const resumen = String(formData.get("resumen") ?? "").trim() || null;
  const contenido = String(formData.get("contenido") ?? "").trim();
  const publicado = formData.get("publicado") === "on";
  const archivo = formData.get("imagen") as File | null;

  if (!titulo || !contenido) return { error: "Falta título o contenido." };

  const { data: actual } = await supabase.from("blog_posts").select("publicado, publicado_en").eq("id", id).maybeSingle();

  const patch: Record<string, unknown> = { titulo, resumen, contenido, publicado };

  // Fija publicado_en la primera vez que se publica; no se vuelve a mover si
  // ya tenía fecha (editar un post publicado no debe brincarlo al tope del
  // blog como si fuera nuevo).
  if (publicado && !actual?.publicado_en) {
    patch.publicado_en = new Date().toISOString();
  }

  if (archivo && archivo.size > 0) {
    const subida = await subirImagen(supabase, archivo);
    if ("error" in subida) return subida;
    patch.imagen_url = subida.url;
  }

  const { error } = await supabase.from("blog_posts").update(patch).eq("id", id);
  if (error) return { error: error.message };

  redirect(`/admin/blog/${id}`);
}

export async function eliminarPost(id: string, _prevState: Resultado): Promise<Resultado> {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };
  redirect("/admin/blog");
}
