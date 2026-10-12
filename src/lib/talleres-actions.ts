"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { extraerIdYoutube } from "@/lib/youtube";

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
  const ruta = `talleres/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("biblioteca-media").upload(ruta, archivo, {
    contentType: archivo.type || "image/jpeg",
  });
  if (error) return { error: `No se pudo subir la imagen: ${error.message}` };
  const { data } = supabase.storage.from("biblioteca-media").getPublicUrl(ruta);
  return { url: data.publicUrl };
}

export async function crearTaller(formData: FormData): Promise<Resultado> {
  const supabase = await createClient();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const publicado = formData.get("publicado") === "on";
  const orden = Number(formData.get("orden") ?? 0) || 0;
  const archivo = formData.get("imagen") as File | null;

  if (!titulo || !descripcion) return { error: "Falta título o descripción." };

  let imagen_url: string | null = null;
  if (archivo && archivo.size > 0) {
    const subida = await subirImagen(supabase, archivo);
    if ("error" in subida) return subida;
    imagen_url = subida.url;
  }

  const { data, error } = await supabase
    .from("talleres")
    .insert({ titulo, descripcion, publicado, orden, imagen_url, slug: slugificar(titulo) })
    .select("id")
    .single();

  if (error) return { error: error.message };

  redirect(`/admin/talleres/${data.id}`);
}

export async function actualizarTaller(id: string, formData: FormData): Promise<Resultado> {
  const supabase = await createClient();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const publicado = formData.get("publicado") === "on";
  const orden = Number(formData.get("orden") ?? 0) || 0;
  const archivo = formData.get("imagen") as File | null;

  if (!titulo || !descripcion) return { error: "Falta título o descripción." };

  const patch: Record<string, unknown> = { titulo, descripcion, publicado, orden };

  if (archivo && archivo.size > 0) {
    const subida = await subirImagen(supabase, archivo);
    if ("error" in subida) return subida;
    patch.imagen_url = subida.url;
  }

  const { error } = await supabase.from("talleres").update(patch).eq("id", id);
  if (error) return { error: error.message };

  redirect(`/admin/talleres/${id}`);
}

export async function eliminarTaller(id: string): Promise<Resultado> {
  const supabase = await createClient();
  const { error } = await supabase.from("talleres").delete().eq("id", id);
  if (error) return { error: error.message };
  redirect("/admin/talleres");
}

export async function crearModulo(tallerId: string, formData: FormData): Promise<Resultado> {
  const supabase = await createClient();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim() || null;
  const youtube_url = String(formData.get("youtube_url") ?? "").trim();
  const orden = Number(formData.get("orden") ?? 0) || 0;

  if (!titulo || !youtube_url) return { error: "Falta título o URL de YouTube." };
  if (!extraerIdYoutube(youtube_url)) return { error: "Esa URL de YouTube no se reconoce." };

  const { error } = await supabase
    .from("taller_modulos")
    .insert({ taller_id: tallerId, titulo, descripcion, youtube_url, orden });

  if (error) return { error: error.message };

  redirect(`/admin/talleres/${tallerId}`);
}

export async function actualizarModulo(tallerId: string, moduloId: string, formData: FormData): Promise<Resultado> {
  const supabase = await createClient();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim() || null;
  const youtube_url = String(formData.get("youtube_url") ?? "").trim();
  const orden = Number(formData.get("orden") ?? 0) || 0;

  if (!titulo || !youtube_url) return { error: "Falta título o URL de YouTube." };
  if (!extraerIdYoutube(youtube_url)) return { error: "Esa URL de YouTube no se reconoce." };

  const { error } = await supabase
    .from("taller_modulos")
    .update({ titulo, descripcion, youtube_url, orden })
    .eq("id", moduloId);

  if (error) return { error: error.message };

  redirect(`/admin/talleres/${tallerId}`);
}

export async function eliminarModulo(tallerId: string, moduloId: string): Promise<Resultado> {
  const supabase = await createClient();
  const { error } = await supabase.from("taller_modulos").delete().eq("id", moduloId);
  if (error) return { error: error.message };
  redirect(`/admin/talleres/${tallerId}`);
}
