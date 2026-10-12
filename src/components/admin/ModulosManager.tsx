"use client";

import { useState } from "react";
import { ModuloGrupoForm } from "@/components/admin/ModuloGrupoForm";
import { CapituloForm } from "@/components/admin/CapituloForm";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import {
  crearModulo,
  actualizarModulo,
  eliminarModulo,
  crearCapitulo,
  actualizarCapitulo,
  eliminarCapitulo,
} from "@/lib/talleres-actions";

type Capitulo = {
  id: string;
  titulo: string;
  descripcion: string | null;
  youtube_url: string;
  orden: number;
};

type Modulo = {
  id: string;
  titulo: string;
  orden: number;
  capitulos: Capitulo[];
};

export function ModulosManager({ tallerId, modulos }: { tallerId: string; modulos: Modulo[] }) {
  const [agregandoModulo, setAgregandoModulo] = useState(false);
  const [editandoModulo, setEditandoModulo] = useState<string | null>(null);
  const [agregandoCapituloEn, setAgregandoCapituloEn] = useState<string | null>(null);
  const [editandoCapitulo, setEditandoCapitulo] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {modulos.map((m) => (
        <div key={m.id} className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-4">
          {editandoModulo === m.id ? (
            <div className="mb-3">
              <ModuloGrupoForm modulo={m} accion={actualizarModulo.bind(null, tallerId, m.id)} />
              <button
                type="button"
                onClick={() => setEditandoModulo(null)}
                className="mt-2 text-xs text-[var(--color-texto-mute)] hover:underline"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="mb-3 flex items-center justify-between gap-4">
              <h3 className="font-semibold text-[var(--color-texto)]">
                <span className="text-[var(--color-texto-mute)]">#{m.orden}</span> {m.titulo}
              </h3>
              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditandoModulo(m.id)}
                  className="text-sm font-medium text-[var(--color-texto)] hover:underline"
                >
                  Editar
                </button>
                <ConfirmDeleteButton
                  accion={eliminarModulo.bind(null, tallerId, m.id)}
                  confirmar={`¿Eliminar el módulo "${m.titulo}" y todos sus capítulos?`}
                  etiqueta="Eliminar módulo"
                />
              </div>
            </div>
          )}

          <div className="space-y-2 border-l-2 border-[var(--color-borde)] pl-3">
            {m.capitulos.map((c) =>
              editandoCapitulo === c.id ? (
                <div key={c.id} className="rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg)] p-3">
                  <CapituloForm
                    capitulo={c}
                    accion={actualizarCapitulo.bind(null, tallerId, c.id)}
                    alGuardar={() => setEditandoCapitulo(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setEditandoCapitulo(null)}
                    className="mt-2 text-xs text-[var(--color-texto-mute)] hover:underline"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div
                  key={c.id}
                  className="flex items-start justify-between gap-4 rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg)] p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--color-texto)]">
                      <span className="text-[var(--color-texto-mute)]">#{c.orden}</span> {c.titulo}
                    </p>
                    {c.descripcion && <p className="mt-0.5 text-xs text-[var(--color-texto-mute)]">{c.descripcion}</p>}
                    <a
                      href={c.youtube_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 block text-xs text-[var(--color-marca)] hover:underline"
                    >
                      {c.youtube_url}
                    </a>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditandoCapitulo(c.id)}
                      className="text-xs font-medium text-[var(--color-texto)] hover:underline"
                    >
                      Editar
                    </button>
                    <ConfirmDeleteButton
                      accion={eliminarCapitulo.bind(null, tallerId, c.id)}
                      confirmar={`¿Eliminar el capítulo "${c.titulo}"?`}
                    />
                  </div>
                </div>
              ),
            )}

            {m.capitulos.length === 0 && (
              <p className="text-xs text-[var(--color-texto-mute)]">Este módulo no tiene capítulos todavía.</p>
            )}

            {agregandoCapituloEn === m.id ? (
              <div className="rounded-lg border border-dashed border-[var(--color-borde)] p-3">
                <CapituloForm accion={crearCapitulo.bind(null, tallerId, m.id)} alGuardar={() => setAgregandoCapituloEn(null)} />
                <button
                  type="button"
                  onClick={() => setAgregandoCapituloEn(null)}
                  className="mt-2 text-xs text-[var(--color-texto-mute)] hover:underline"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAgregandoCapituloEn(m.id)}
                className="rounded-lg border border-dashed border-[var(--color-borde)] px-3 py-1.5 text-xs font-medium text-[var(--color-texto)] hover:border-[var(--color-borde-alto)]"
              >
                + Agregar capítulo
              </button>
            )}
          </div>
        </div>
      ))}

      {modulos.length === 0 && <p className="text-sm text-[var(--color-texto-mute)]">Este taller no tiene módulos todavía.</p>}

      {agregandoModulo ? (
        <div className="rounded-xl border border-dashed border-[var(--color-borde)] p-4">
          <ModuloGrupoForm accion={crearModulo.bind(null, tallerId)} />
          <button
            type="button"
            onClick={() => setAgregandoModulo(false)}
            className="mt-2 text-xs text-[var(--color-texto-mute)] hover:underline"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAgregandoModulo(true)}
          className="rounded-lg border border-dashed border-[var(--color-borde)] px-4 py-2 text-sm font-medium text-[var(--color-texto)] hover:border-[var(--color-borde-alto)]"
        >
          + Agregar módulo
        </button>
      )}
    </div>
  );
}
