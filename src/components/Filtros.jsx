import { FILTROS_STATUS } from '../utils/constantes'

export default function Filtros({ busca, onBusca, statusFiltro, onStatus, quantidade }) {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="busca" className="block text-sm font-semibold">
          Buscar por posto ou bairro
        </label>
        <input
          id="busca"
          type="search"
          value={busca}
          onChange={(e) => onBusca(e.target.value)}
          placeholder="Digite para filtrar…"
          className="mt-1 w-full rounded-lg border border-slate-400 bg-white px-3 py-2"
        />
      </div>

      <div role="group" aria-label="Filtrar por status" className="flex flex-wrap gap-2">
        {FILTROS_STATUS.map((f) => (
          <button
            key={f.valor}
            type="button"
            onClick={() => onStatus(f.valor)}
            aria-pressed={statusFiltro === f.valor}
            className={`rounded-full border px-4 py-1 text-sm font-semibold ${
              statusFiltro === f.valor
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-400 bg-white hover:bg-slate-100'
            }`}
          >
            {f.rotulo}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-600" aria-live="polite">
        {quantidade} {quantidade === 1 ? 'leitura encontrada' : 'leituras encontradas'}
      </p>
    </div>
  )
}
