"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
    };
  }
}

// Pública a propósito (va embebida en el HTML de todas formas) -- la Secret
// Key no vive en este repo, solo en el backend de lexyondigital-saas que
// verifica /api/registro-publico.
export const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const SCRIPT_ID = "turnstile-script";

// Mientras CAPTCHA_SITE_KEY no esté configurada, no renderiza nada -- así
// el formulario sigue funcionando (sin captcha) en vez de bloquear el envío
// esperando un token que nunca va a llegar.
export function Turnstile({ onVerify }: { onVerify: (token: string) => void }) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const onVerifyRef = useRef(onVerify);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  });

  useEffect(() => {
    if (!CAPTCHA_SITE_KEY) return;

    function render() {
      if (contenedorRef.current && window.turnstile) {
        window.turnstile.render(contenedorRef.current, {
          sitekey: CAPTCHA_SITE_KEY,
          callback: (token: string) => onVerifyRef.current(token),
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
}
