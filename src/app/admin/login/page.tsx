"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { CAPTCHA_SITE_KEY, Turnstile } from "@/components/Turnstile";
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
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
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
      options: { captchaToken: captchaToken ?? undefined },
    });

    if (errorLogin || !data.user) {
      setCargando(false);
      setError(errorLogin?.message === "Invalid login credentials" ? "Correo o contraseña incorrectos." : errorLogin?.message ?? "No se pudo iniciar sesión.");
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
            <div className="relative">
              <input
                type={mostrarPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2 pr-10 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]"
              />
              <button
                type="button"
                onClick={() => setMostrarPassword((v) => !v)}
                aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[var(--color-texto-mute)] hover:text-[var(--color-texto)]"
              >
                {mostrarPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M3 3l18 18M10.6 10.7a2.5 2.5 0 0 0 3.5 3.5M9.4 5.5A10.4 10.4 0 0 1 12 5c5 0 9 4 10 7-.4 1.1-1.1 2.3-2.1 3.4M6.3 6.9C4.5 8.1 3.1 9.9 2 12c1 3 5 7 10 7 1.3 0 2.5-.3 3.6-.7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          <Turnstile onVerify={setCaptchaToken} />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={cargando || (Boolean(CAPTCHA_SITE_KEY) && !captchaToken)}
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
