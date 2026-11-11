import { LIMITES_PADRAO } from '../utils/constantes'

const CAMPOS = [
  { nome: 'densidadeMin', rotulo: 'Densidade mínima (g/cm³)', passo: 0.001 },
  { nome: 'densidadeMax', rotulo: 'Densidade máxima (g/cm³)', passo: 0.001 },
  { nome: 'margemDensidade', rotulo: 'Margem antes de "crítico" (g/cm³)', passo: 0.001 },
  { nome: 'condutividadeMax', rotulo: 'Condutividade máxima (µS/cm)', passo: 0.1 },
]

export default function ConfigLimites({ limites, onChange }) {
  // O valor só é aplicado quando o campo perde o foco, para não atrapalhar a digitação.
  function aplicar(nome, texto) {
    const numero = Number(String(texto).replace(',', '.'))
    if (!Number.isNaN(numero) && numero >= 0) onChange({ ...limites, [nome]: numero })
  }

  return (
    <details className="rounded-xl bg-white p-5 shadow-sm">
      <summary className="cursor-pointer text-lg font-bold">Limites de classificação</summary>
      <p className="mt-2 text-sm text-slate-600">
        Valores de referência didáticos. Ajuste conforme a pesquisa do grupo; eles ficam salvos
        neste navegador.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {CAMPOS.map((c) => (
          <div key={c.nome}>
            <label htmlFor={c.nome} className="block text-sm font-semibold">
              {c.rotulo}
            </label>
            <input
              id={c.nome}
              key={limites[c.nome]}
              type="number"
              step={c.passo}
              min="0"
              defaultValue={limites[c.nome]}
              onBlur={(e) => aplicar(c.nome, e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-400 px-3 py-2"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange(LIMITES_PADRAO)}
        className="mt-4 rounded-lg border border-slate-500 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
      >
        Restaurar padrão
      </button>
    </details>
  )
}
