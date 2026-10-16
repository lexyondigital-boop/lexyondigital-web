"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

// Pública a propósito (va embebida en el HTML de todas formas) -- la Secret
// Key no vive en este repo, solo en el backend de lexyondigital-saas que
// verifica /api/registro-publico.
export const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const SCRIPT_ID = "turnstile-script";
const TIMEOUT_TOKEN_FRESCO_MS = 15000;

export type TurnstileHandle = {
  // Un token de Turnstile se consume en la primera llamada que lo use --
  // /api/registro-publico necesita dos: una para su propio check anti-bot
  // y otra para el captchaToken de resetPasswordForEmail (Supabase también
  // exige uno, y no puede ser el mismo ya gastado). Esto reinicia el
  // widget y espera el siguiente resultado en vez de reusar el que ya se
  // gastó -- mismo patrón que ya usa el login de la app hermana.
  obtenerTokenFresco: () => Promise<string | undefined>;
};

// Mientras CAPTCHA_SITE_KEY no esté configurada, no renderiza nada -- así
// el formulario sigue funcionando (sin captcha) en vez de bloquear el envío
// esperando un token que nunca va a llegar.
export const Turnstile = forwardRef<TurnstileHandle, { onVerify: (token: string) => void }>(function Turnstile(
  { onVerify },
  ref,
) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const pendientesRef = useRef<Array<(token: string) => void>>([]);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  });

  useImperativeHandle(ref, () => ({
    obtenerTokenFresco: () => {
      if (!CAPTCHA_SITE_KEY) return Promise.resolve(undefined);
      return new Promise<string | undefined>((resolve) => {
        const timeout = setTimeout(() => resolve(undefined), TIMEOUT_TOKEN_FRESCO_MS);
        pendientesRef.current.push((token) => {
          clearTimeout(timeout);
          resolve(token);
        });
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      });
    },
  }));

  useEffect(() => {
    if (!CAPTCHA_SITE_KEY) return;

    function manejarToken(token: string) {
      onVerifyRef.current(token);
      const pendientes = pendientesRef.current;
      pendientesRef.current = [];
      pendientes.forEach((resolver) => resolver(token));
    }

    function render() {
      if (contenedorRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(contenedorRef.current, {
          sitekey: CAPTCHA_SITE_KEY,
          callback: manejarToken,
        });
      }
    }

    if (window.turnstile) {
      render();
      return;
    }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    return () => script?.removeEventListener("load", render);
  }, []);

  if (!CAPTCHA_SITE_KEY) return null;
  return <div ref={contenedorRef} className="flex justify-center" />;
});
