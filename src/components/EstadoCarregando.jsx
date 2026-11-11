export default function EstadoCarregando() {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 rounded-xl bg-white p-8 text-slate-700"
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-4 border-slate-300 border-t-brand-600"
      />
      Carregando leituras…
    </div>
  )
}
