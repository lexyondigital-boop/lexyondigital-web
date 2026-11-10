"use client";

import { useEffect, useRef } from "react";

// Fondo de puntos que "respira": una malla de puntos cuya intensidad sigue
// ondas suaves que se desplazan, en los colores de la marca. Se pausa cuando
// no está en pantalla y queda quieto si la persona pidió reducir movimiento.
const ESPACIO = 13;
const RADIO = 1.3;
// Violeta → magenta, de izquierda a derecha.
const COLOR_A = [124, 58, 237];
const COLOR_B = [236, 72, 153];

function intensidad(x: number, y: number, t: number) {
  const v =
    Math.sin(x * 0.0105 + t * 0.35) +
    Math.sin(y * 0.016 - t * 0.27) +
    Math.sin((x + y) * 0.0062 + t * 0.21) +
    Math.sin(Math.hypot(x - 300, y - 200) * 0.009 - t * 0.4);
  const n = Math.max(0, (v + 0.9) / 3.4);
  return n * n;
}

export function FondoPuntos({ className }: { className?: string }) {
  const lienzo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = lienzo.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ancho = 0;
    let alto = 0;
    let visible = true;
    let cuadro = 0;
    let ultimo = 0;
    const inicio = performance.now();

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = canvas.clientWidth;
      alto = canvas.clientHeight;
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pintar = (t: number) => {
      ctx.clearRect(0, 0, ancho, alto);
      const cx = ancho / 2;
      const cy = alto * 0.38;
      const radioCalma = Math.min(ancho, alto) * 0.42;
      for (let y = ESPACIO / 2; y < alto; y += ESPACIO) {
        for (let x = ESPACIO / 2; x < ancho; x += ESPACIO) {
          let a = intensidad(x, y, t);
          // Zona más tranquila detrás del titular para que se lea bien.
          const d = Math.hypot((x - cx) * 0.8, y - cy);
          if (d < radioCalma) a *= 0.25 + 0.75 * (d / radioCalma) ** 2;
          if (a < 0.04) continue;
          const k = x / ancho;
          const r = COLOR_A[0] + (COLOR_B[0] - COLOR_A[0]) * k;
          const g = COLOR_A[1] + (COLOR_B[1] - COLOR_A[1]) * k;
          const b = COLOR_A[2] + (COLOR_B[2] - COLOR_A[2]) * k;
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${Math.min(0.95, a * 1.25).toFixed(3)})`;
          ctx.fillRect(x - RADIO, y - RADIO, RADIO * 2, RADIO * 2);
        }
      }
    };

    const bucle = (ahora: number) => {
      cuadro = requestAnimationFrame(bucle);
      if (!visible || ahora - ultimo < 33) return; // ~30 cuadros por segundo bastan
      ultimo = ahora;
      pintar((ahora - inicio) / 1000);
    };

    medir();
    pintar(0);
    const alCambiarTamaño = () => {
      medir();
      pintar((performance.now() - inicio) / 1000);
    };
    window.addEventListener("resize", alCambiarTamaño);
    const observador = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    observador.observe(canvas);
    if (!reducir) cuadro = requestAnimationFrame(bucle);

    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("resize", alCambiarTamaño);
      observador.disconnect();
    };
  }, []);

  return <canvas ref={lienzo} aria-hidden="true" className={className} />;
}
