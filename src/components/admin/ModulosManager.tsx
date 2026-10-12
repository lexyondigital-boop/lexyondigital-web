"use client";

import { useState } from "react";
import { ModuloForm } from "@/components/admin/ModuloForm";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { crearModulo, actualizarModulo, eliminarModulo } from "@/lib/talleres-actions";

type Modulo = {
  id: string;
  titulo: string;
  descripcion: string | null;
  youtube_url: string;
  orden: number;
};

export function ModulosManager({ tallerId, modulos }: { tallerId: string; modulos: Modulo[] }) {
  const [agregando, setAgregando] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {modulos.map((m) =>
        editando === m.id ? (
          <div key={m.id} className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-bg)] p-4">
            <ModuloForm
              modulo={m}
              accion={actualizarModulo.bind(null, tallerId, m.id)}
              alGuardar={() => setEditando(null)}
            />
            <button
              type="button"
              onClick={() => setEditando(null)}
              className="mt-2 text-xs text-[var(--color-texto-mute)] hover:underline"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div
            key={m.id}
            className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-4"
          >
            <div>
              <p className="font-medium text-[var(--color-texto)]">
                <span className="text-[var(--color-texto-mute)]">#{m.orden}</span> {m.titulo}
              </p>
              {m.descripcion && <p className="mt-1 text-sm text-[var(--color-texto-mute)]">{m.descripcion}</p>}
              <a
                href={m.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-xs text-[var(--color-marca)] hover:underline"
              >
                {m.youtube_url}
              </a>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <button
                type="button"
                onClick={() => setEditando(m.id)}
                className="text-sm font-medium text-[var(--color-texto)] hover:underline"
              >
                Editar
              </button>
              <ConfirmDeleteButton
                accion={eliminarModulo.bind(null, tallerId, m.id)}
                confirmar={`¿Eliminar el módulo "${m.titulo}"?`}
              />
            </div>
          </div>
        ),
      )}

      {modulos.length === 0 && <p className="text-sm text-[var(--color-texto-mute)]">Este taller no tiene módulos todavía.</p>}

      {agregando ? (
        <div className="rounded-xl border border-dashed border-[var(--color-borde)] p-4">
          <ModuloForm accion={crearModulo.bind(null, tallerId)} alGuardar={() => setAgregando(false)} />
          <button
            type="button"
            onClick={() => setAgregando(false)}
            className="mt-2 text-xs text-[var(--color-texto-mute)] hover:underline"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAgregando(true)}
          className="rounded-lg border border-dashed border-[var(--color-borde)] px-4 py-2 text-sm font-medium text-[var(--color-texto)] hover:border-[var(--color-borde-alto)]"
        >
          + Agregar módulo
        </button>
      )}
    </div>
  );
}
