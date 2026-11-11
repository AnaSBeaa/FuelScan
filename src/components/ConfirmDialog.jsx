import { useEffect } from 'react'

export default function ConfirmDialog({ aberto, titulo, mensagem, onConfirmar, onCancelar }) {
  // Fecha com a tecla Esc.
  useEffect(() => {
    if (!aberto) return undefined
    const aoTeclar = (e) => e.key === 'Escape' && onCancelar()
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberto, onCancelar])

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialogo-titulo"
        aria-describedby="dialogo-mensagem"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 id="dialogo-titulo" className="text-lg font-bold">
          {titulo}
        </h2>
        <p id="dialogo-mensagem" className="mt-2 text-slate-700">
          {mensagem}
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={onCancelar}
            className="rounded-lg border border-slate-500 px-4 py-2 font-semibold hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
