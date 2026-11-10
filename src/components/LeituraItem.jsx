import { formatarData, formatarNumero } from '../utils/formatadores'
import StatusBadge from './StatusBadge'

export default function LeituraItem({ leitura, onEditar, onExcluir }) {
  return (
    <li className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-bold">{leitura.posto}</h3>
          <p className="text-sm text-slate-600">
            {leitura.bairro} · {leitura.combustivel} · {formatarData(leitura.criadoEm)}
          </p>
        </div>
        <StatusBadge status={leitura.status} />
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">Densidade</dt>
          <dd className="text-lg font-semibold">{formatarNumero(leitura.densidade, 3)} g/cm³</dd>
        </div>
        <div>
          <dt className="text-slate-500">Condutividade</dt>
          <dd className="text-lg font-semibold">
            {formatarNumero(leitura.condutividade, 1)} µS/cm
          </dd>
        </div>
      </dl>

      {leitura.motivos.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {leitura.motivos.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      {leitura.observacao && (
        <p className="mt-2 text-sm italic text-slate-600">“{leitura.observacao}”</p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEditar(leitura)}
          className="rounded-lg border border-slate-500 px-3 py-1 text-sm font-semibold hover:bg-slate-100"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onExcluir(leitura)}
          className="rounded-lg border border-red-600 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50"
        >
          Excluir
        </button>
      </div>
    </li>
  )
}
