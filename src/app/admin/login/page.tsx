"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <FormularioLogin />
    </Suspense>
  );
}

function FormularioLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "sin_acceso" ? "Esa cuenta no tiene acceso al panel de contenido." : null,
  );

  async function iniciarSesion(e: FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const supabase = createClient();
    const { data, error: errorLogin } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (errorLogin || !data.user) {
      setCargando(false);
      setError("Correo o contraseña incorrectos.");
      return;
    }

    const { data: perfil } = await supabase.from("perfiles").select("rol").eq("id", data.user.id).maybeSingle();

    if (perfil?.rol !== "super_admin") {
      await supabase.auth.signOut();
      setCargando(false);
      setError("Esa cuenta no tiene acceso al panel de contenido.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo tamaño="md" />
        </div>

        <form
          onSubmit={iniciarSesion}
          className="space-y-4 rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6 shadow-sm"
        >
          <div>
            <h1 className="text-lg font-semibold text-[var(--color-texto)]">Panel de contenido</h1>
            <p className="mt-1 text-sm text-[var(--color-texto-mute)]">Entra con tu cuenta de administrador.</p>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Correo</span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]"
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            style={{ boxShadow: "var(--halo-accion)" }}
            className="w-full rounded-lg bg-[var(--color-accion)] px-4 py-2.5 text-sm font-semibold text-[var(--color-accion-fg)] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {cargando ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
