import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Todas las páginas de /admin repiten esta comprobación: hay que tener
// sesión Y que el perfil asociado sea super_admin -- mismo criterio que la
// RLS de talleres/taller_modulos/blog_posts (es_super_admin()), así que
// nunca hay un admin que pase este check pero falle al leer/escribir datos.
export async function obtenerSesionAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: perfil } = await supabase.from("perfiles").select("rol").eq("id", user.id).maybeSingle();

  if (perfil?.rol !== "super_admin") {
    redirect("/admin/login?error=sin_acceso");
  }

  return { user };
}
