"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
